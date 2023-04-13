const Project = require('../models/Project');
const Party = require('../models/Party');
const schedule = require('node-schedule');

// project registration

exports.registerProject = async (req, res, next) => {
	let {
		name,
		description,
		proposedBy, // id of user which is login
		expectedFinishTime,
		expectedTokens,
		biddingDuration,
	} = req.body;
	const party = await Party.findById(proposedBy.id);
	if (!party) {
		return res.status(400).json({ msg: 'No party exist with the id.' });
	}
	try {
		const project = await Project.create({
			name,
			description,
			proposedBy,
			expectedFinishTime,
			expectedTokens,
			biddingDuration,
		});
		const party = await Party.findByIdAndUpdate(
			proposedBy.id,
			{
				$push: {
					projectProposed: {
						projectId: project._id,
						projectName: name,
						proposed: true,
					},
				},
			},
			{ new: true }
		);
		res.status(200).json({ msg: 'Project registered sucessfully.' });
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
};

// get list of top three projects
exports.getTop3Projects = async (req, res, next) => {
	const projects = await Project.find({ implementationDone: true })
		.sort({ finalBidPrice: -1 })
		.limit(3);
	res.status(200).json({ success: true, data: projects });
};

// list of all the projects in the system
exports.getAllProjects = async (req, res, next) => {
	const projects = await Project.find();
	res.status(200).json({ data: projects });
};

// getting list of projects by party email

exports.getProjectsByEmail = async (req, res, next) => {
	try {
		const projects = await Project.find({ email: req.params.email });
		if (!projects) {
			return res
				.status(404)
				.json({ msg: 'No projects found for this email' });
		}
		res.status(200).json({ data: projects });
	} catch (err) {
		res.status(400).json({ msg: 'Server error' });
	}
};

// getting the list of
exports.getProjectById = async (req, res, next) => {
	try {
		const project = await Project.findById(req.params.id);
		console.log(project);
		res.status(200).json({ data: project });
	} catch {
		res.status(400).json({
			msg: `Project not found with id of ${req.params.id}`,
		});
	}
};

// issue a project
exports.issueProject = async (req, res, next) => {
	try {
		const project = await Project.findByIdAndUpdate(
			req.params.id,
			{ isIssued: true },
			{ new: true }
		);
		res.status(200).json({ msg: 'Project issued successfully.' });
	} catch {
		res.status(400).json({ msg: 'Failed to issue Project' });
	}
};

// getting the list of all the projects bid by
// a particular party using id. (Updated API)

exports.listOfProjectsBidByUser = async (req, res, next) => {
	let id = req.params.id;

	const party = await Party.findById(id);
	if (!party) {
		return res.status(400).json({ msg: 'Party not found.' });
	}
	console.log(party);
	const project = await Project.find({ 'bidders.bidderId': id });

	return res.status(200).json(project);
};

// getting the list of all the projects proposed by
// a particular party using id. (Updated API)

exports.getProjectProposedByUser = async (req, res, next) => {
	let partyId = req.params.id;
	const party = await Party.findById(partyId);
	if (!party) {
		return res
			.status(400)
			.json({ msg: `Party not found with id ${req.params.id}.` });
	}
	const projects = await Project.find({ 'proposedBy.id': partyId });
	console.log(projects);
	res.status(200).json(projects);
};

// Private Route
// Returns all the project which a validator can validate
// with the condition that he/she has not proposed the project
// and never validated in past

exports.notValidatedProject = async (req, res, next) => {
	const partyId = req.params.id;
	// console.log(req);
	try {
		const project = await Project.find({
			$and: [
				{ isValidated: false },
				{ isIssued: false },
				{ proposedBy: { $ne: partyId } },
				{
					validationDecision: {
						$not: { $elemMatch: { partyId } },
					},
				},
			],
		});
		return res.status(200).json({ success: true, data: project });
	} catch {
		return res
			.status(400)
			.json({ sucess: false, msg: 'Project not found' });
	}
};

// Private route
// Validate decision of a validator for some project

exports.validateProject = async (req, res, next) => {
	let { partyId, projectId, decision, isValidator } = req.body;
	// console.log(partyId, projectId, decision, isValidator);
	const party = await Party.findById(partyId);
	if (!party) {
		return res.status(400).json({ sucess: false, msg: 'Party Not Found' });
	}
	if (!isValidator) {
		return res
			.status(400)
			.json({ sucess: false, msg: 'Party is not a validator.' });
	}
	let project = await Project.findById(projectId);
	if (!project) {
		return res.status(400).json({ msg: 'Project not found.' });
	}
	let alreadyValidated = await Project.findOne({
		_id: projectId,
		validationDecision: {
			$elemMatch: { partyId: partyId },
		},
	});
	console.log('checking validating Condition', alreadyValidated);
	if (alreadyValidated) {
		return res.status(200).json({
			success: false,
			msg: 'This project is already validated by you',
		});
	}

	// Getting the number of validation count of the project
	const count = project.validationCount;
	if (decision == true) {
		await project.updateOne({
			validationCount: count + 1,
			$push: {
				validationDecision: {
					partyId: partyId,
					projectId: projectId,
					decision: true,
				},
			},
		});
		await party.updateOne({
			$push: {
				validationDecision: {
					partyId: partyId,
					projectId: projectId,
					decision: true,
				},
			},
		});
	} else {
		await project.updateOne({
			$push: {
				validationDecision: {
					partyId: partyId,
					projectId: projectId,
					decision: false,
				},
			},
		});
		await party.updateOne({
			$push: {
				validationDecision: {
					partyId: partyId,
					projectId: projectId,
					decision: false,
				},
			},
		});
		return res
			.status(200)
			.json({ sucess: true, msg: 'Discarded project successfully' });
	}
	if (count == 3 && decision == true) {
		try {
			await Project.findOneAndUpdate(
				{ _id: projectId },
				{
					isValidated: true,
					reasonIfNotValid: 'User does not have enough token',
				},
				{ new: true }
			);
			const date = new Date(Date.now() + 2 * 60 * 1000);
			schedule.scheduleJob(date, function () {
				getBiddingResult(projectId);
			});

			return res
				.status(200)
				.json({ sucess: true, msg: 'Project validated successfully.' });
		} catch {
			return res
				.status(400)
				.json({ sucess: false, msg: 'Failed to validate Project' });
		}
	} else {
		return res.status(200).json({
			sucess: true,
			msg: 'Waiting for other validators to validate.',
		});
	}
};

const getBiddingResult = async (projectId) => {
	const project = await Project.findById(projectId);
	if (!project) {
		return;
	}
	const bidders = project.bidders;
	const numOfBidders = bidders.length;
	if (numOfBidders == 0) {
		await Project.findByIdAndUpdate(projectId, {
			isIssued: true,
		});
		res.status(200).json({
			success: true,
			msg: 'No bidders',
		});
	}
	console.log(bidders);
	bidders.sort((a, b) => {
		return a.bidderToken - b.bidderToken;
	});
	const winnerObj = bidders[0];
	const winner = await Party.findById(winnerObj.bidderId);
	await project.updateOne({
		'wonBy.id': winnerObj.bidderId,
		'wonBy.name': winnerObj.bidderName,
		'wonBy.isAnonymous': winner.isAnonymous,
		'wonBy.token': winnerObj.bidderToken,
		'wonBy.timelineProposed': winnerObj.timelineAgreed,
		isIssued: true,
	});
	await winner.updateOne({
		$push: {
			biddingWon: {
				projectId: project._id,
				projectName: project.name,
				proposed: false,
				tokenBid: winnerObj.bidderToken,
				timelineProposed: winnerObj.timelineAgreed,
			},
		},
	});
	res.status(200).json({
		success: true,
		data: bidders,
		winner,
	});
};

exports.testFunction = async (req, res, next) => {
	const projectId = '642fc1d08250b3f2cd343c09';
	const project = await Project.findById(projectId);
	if (!project) {
		return;
	}
	const bidders = project.bidders;
	const numOfBidders = bidders.length;
	if (numOfBidders == 0) {
		await Project.findByIdAndUpdate(projectId, {
			isIssued: true,
		});
		res.status(200).json({
			success: true,
			msg: 'No bidders',
		});
	}
	console.log(bidders);
	bidders.sort((a, b) => {
		return a.bidderToken - b.bidderToken;
	});
	const winnerObj = bidders[0];
	const winner = await Party.findById(winnerObj.bidderId);
	await project.updateOne({
		'wonBy.id': winnerObj.bidderId,
		'wonBy.name': winnerObj.bidderName,
		'wonBy.isAnonymous': winner.isAnonymous,
		'wonBy.token': winnerObj.bidderToken,
		'wonBy.timelineProposed': winnerObj.timelineAgreed,
		isIssued: true,
	});
	await winner.updateOne({
		$push: {
			biddingWon: {
				projectId: project._id,
				projectName: project.name,
				proposed: false,
				tokenBid: winnerObj.bidderToken,
				timelineProposed: winnerObj.timelineAgreed,
			},
		},
	});
	res.status(200).json({
		success: true,
		data: bidders,
		winner,
	});
};

// getting list of all the validated projects

exports.getAllValidatedProject = async (req, res, next) => {
	try {
		const project = await Project.find({
			isValidated: true,
			isIssued: false,
		});
		res.status(200).json({ project });
	} catch {
		res.status(400).json({ msg: 'No Projects found!!!' });
	}
};

exports.getProjectsForBidding = async (req, res, next) => {
	let id = req.params.id;
	try {
		const projects = await Project.find({
			$and: [
				{ isValidated: true },
				{ isIssued: false },
				{ proposedBy: { $ne: id } },
				{
					bidders: {
						$not: {
							$elemMatch: { bidderId: id },
						},
					},
				},
			],
		});
		res.status(200).json({
			success: true,
			data: projects,
			length: projects.length,
		});
	} catch {
		res.status(400).json({ msg: 'Unable to fetch projects for bidding' });
	}
};

// Party bidding on a project (Updated API)

exports.bidOnProject = async (req, res, next) => {
	let { partyId, projectId, tokenBid, timeline } = req.body;

	const party = await Party.findById(partyId);
	if (!party) {
		return res.status(400).json({ success: false, msg: 'Party not found' });
	}
	const project = await Project.findById(projectId);
	if (!project) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project not found' });
	}
	if (project.isValidated == false) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project not validated yet' });
	}

	const hasBidAlready = await Project.findOne({
		_id: projectId,
		bidders: {
			$elemMatch: {
				partyId: partyId,
			},
		},
	});
	if (hasBidAlready) {
		return res.status(400).json({
			success: false,
			msg: 'You have already placed a bid on it',
		});
	}
	await party.updateOne({
		$push: {
			projectBidFor: {
				projectId,
				projectName: project.name,
				proposed: false,
				tokenBid,
				timelineProposed: timeline,
			},
		},
	});
	await project.updateOne({
		$push: {
			bidders: {
				bidderId: partyId,
				bidderName: party.name,
				bidderToken: tokenBid,
				timelineAgreed: timeline,
			},
		},
	});
	await project.updateOne({
		numOfBid: project.numOfBid + 1,
	});

	return res.status(200).json({ msg: 'Project bid added successfully.' });
};

// Project won by a party

exports.projectBidWonByParty = async (req, res, next) => {
	let partyId = req.params.id;
	try {
		const projects = await Project.find({ 'wonBy.id': partyId });
		return res.status(200).json({ success: true, data: projects });
	} catch {
		return res.status(400).json({ sucess: false, msg: 'No projects won.' });
	}
};
exports.projectsToDo = async (req, res, next) => {
	let partyId = req.params.id;
	try {
		const projects = await Project.find({
			'wonBy.id': partyId,
			isImplemented: false,
		});
		return res.status(200).json({ success: true, data: projects });
	} catch {
		return res.status(400).json({ sucess: false, msg: 'No projects won.' });
	}
};

exports.addMileStone = async (req, res, next) => {
	const { partyId, projectId, milestoneDone } = req.body;
	console.log(req.body);
	const party = await Party.findById(partyId);
	if (!party) {
		return res.status(400).json({ success: false, msg: 'Party Not Found' });
	}

	let project = await Project.findById(projectId);
	if (!project) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project not found.' });
	}
	// console.log(project);
	if (project.isIssued == false) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project not issued yet' });
	}
	if (milestoneDone < 4) {
		await project.updateOne({
			tokenGivenToWinningParty: (milestoneDone * project.wonBy.token) / 4,
			milestonesAchieved: milestoneDone,
		});
		return res.status(200).json({
			success: true,
			msg: `${milestoneDone} milestones are achieved out of ${4}`,
		});
	}
	await project.updateOne({
		tokenGivenToWinningParty: (milestoneDone * project.wonBy.token) / 4,
		milestonesAchieved: milestoneDone,
		implementationDone: true,
		actualFinishTime: Date.now(),
	});
	await party.updateOne({
		projectsDone: party.projectsDone + 1,
	});
	return res.status(200).json({
		success: true,
		msg: `All the milestones are completed successfully`,
	});
};
