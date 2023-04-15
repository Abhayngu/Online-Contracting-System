const Party = require('../models/Party');
const passport = require('passport');
const System = require('../models/System');

exports.createParty = async (req, res) => {
	console.log(req.body);
	let { name, email, password, description, walletAddress } = req.body;

	let userData = {
		name,
		email,
		description,
		walletAddress,
	};
	console.log(userData);

	Party.register(userData, password, (err, user) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		passport.authenticate('local')(req, res, () => {
			return res.json({ message: 'Party registered sucessfully' });
		});
	});
};

exports.login = async (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res
				.status(401)
				.json({ message: 'Invalid email or password' });
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			req.session.email = user.email;
			return res.json({
				message: 'Successfully logged in with user' + req.session.email,
				user: user,
			});
			// res.render('update');
		});
	})(req, res, next);
};

// route : /party/getWalletAddress/:id

exports.getWalletAddress = async (req, res, next) => {
	const id = req.params.id;
	const party = await Party.findById(id);
	if (!party) {
		return res.json(400).json({ success: false, msg: 'Party not found' });
	}

	return res
		.status(200)
		.json({ success: true, walletAddress: party.walletAddress });
};

exports.updateParty = async (req, res, next) => {
	const { name, description } = req.body;
	const email = req.session.email;

	console.log(email);
	console.log(req.isAuthenticated());

	try {
		const user = await Party.findOne({ email: email });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		if (name) user.name = name;
		if (description) user.email = email;

		await user.save();

		res.json({ message: 'User updated successfully', user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

// route : /party/delete/:id
exports.deleteParty = async (req, res, next) => {
	const id = req.params.id;
	console.log(id);
	try {
		const deletedUser = await Party.findOneAndDelete({ _id: id });
		let system = await System.findOne();
		// system.deletedParties.push(id);
		// await system.save();
		if (!deletedUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.json({
			success: true,
			system,
			deletedUser,
			message: 'User deleted successfully',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

exports.changePassword = async (req, res, next) => {
	const email = req.body.email;

	const token = crypto.randomBytes(20).toString('hex');

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS,
		},
	});

	Party.findOneAndUpdate(
		{ email: email },
		{ resetPasswordToken: token, resetPasswordExpires: Date.now() + 3000 },
		{ new: true, upsert: false }
	)
		.then((user) => {
			console.log(
				`Reset token ${token} added for user with email ${user.email}`
			);
		})
		.catch((err) => {
			console.error(err.message);
		});

	const mailOptions = {
		from: 'Shubham Rathore',
		to: email,
		subject: 'Password Reset',
		text:
			`You are receiving this email because you has requested a password reset for your account.\n\n` +
			`Please click on the following link, or paste this into your browser to complete the process:\n\n` +
			`http://${req.headers.host}/reset-password/${token}\n\n` +
			`If you did not request this, please ignore this email and your password will remain unchanged.\n`,
	};
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			return next(err);
		}
		console.log(`Message sent: ${info.messageId}`);
		res.json({
			message:
				'An email has been sent to the provided email with further instructions.',
		});
	});
};

exports.getPartytById = async (req, res, next) => {
	try {
		const party = await Party.findById(req.params.id);
		res.status(200).json({ data: party });
	} catch {
		res.status(400).json({
			msg: `Party not found with id of ${req.params.id}`,
		});
	}
};

exports.anonymityOfParty = async (req, res, next) => {
	let { isAnonymous } = req.body;
	console.log(isAnonymous, typeof isAnonymous);
	const party = await Party.findByIdAndUpdate(
		req.params.id,
		{ isAnonymous: isAnonymous },
		{ new: true }
	);
	res.status(200).json({ success: true, party, msg: 'Sucessfully set.' });
};

// Assigning validators

exports.changeValidators = async (req, res, next) => {
	let system = await System.find();
	const systemId = system[0]._id;
	const parties = await Party.find();
	const alreadyValidators = system[0].validators;
	console.log(alreadyValidators);
	if (alreadyValidators.length > 0) {
		alreadyValidators.map(async (party) => {
			await Party.findByIdAndUpdate(
				party,
				{ isValidator: false },
				{ new: true }
			);
		});
	}

	const idToken = [];
	parties.map((party) => {
		if (!party.isAdmin) {
			idToken.push({
				id: party._id,
				token: party.tokens,
				name: party.name,
				walletAddress: party.walletAddress,
			});
		}
	});
	idToken.sort((a, b) => {
		if (a.token < b.token) return 1;
		else return -1;
	});
	const numOfparties = Math.min(6, idToken.length);
	const topSixParties = idToken.slice(0, numOfparties);
	const ids = [];
	topSixParties.map(async (party) => {
		ids.push(party.id.toString());
		await Party.findByIdAndUpdate(
			party.id.toString(),
			{ isValidator: true },
			{ new: true }
		);
	});
	await System.findByIdAndUpdate(systemId, { validators: ids });
	res.status(200).json({
		success: true,
		data: topSixParties,
		length: topSixParties.length,
	});
};

exports.createSystem = async (req, res, next) => {
	const system = await System.create({});
	res.json({ success: true, msg: 'System created successfully' });
};

exports.isPermissioned = async (req, res, next) => {
	let { party_Id, isPermissioned } = req.body;
	const party = await Party.findById(party_Id);
	if (!party) {
		return res.status(400).json({ Success: false, msg: 'party not found' });
	}
	try {
		await party.findOneAndUpdate(
			{ _id: party_Id },
			{ isPermissioned: isPermissioned },
			{ new: true }
		);
		return res
			.status(400)
			.json({ Success: true, msg: 'Updated successfully' });
	} catch {
		return res.status(400).json({ Success: false, msg: 'server error' });
	}
};
