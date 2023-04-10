const Project = require('../models/Project');
const Party = require('../models/Party');

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

exports.getTop3Projects = async (req, res, next) => {
	const projects = await Project.find().sort({ finalBidPrice: -1 }).limit(3);
	res.status(200).json({ data: projects });
};

exports.getAllProjects = async (req, res, next) => {
	const projects = await Project.find();
	res.status(200).json({ data: projects });
};

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

exports.validateProject = async (req, res, next) => {
	let { partyId, projectId, decision, isValidator } = req.body;
	const party = await Party.findById(partyId);
	if (!party.isValidator) {
		return res.status(400).json({ sucess: false, msg: 'Party is not a validator.' });
	}
	const project = await Project.findById(projectId);
	if (!project) {
		return res.status(400).json({ msg: 'Project not found.' });
	}
	const count = project.validationCount;
	if(decision === true) {
		await Project.findByIdAndUpdate(project._id, { validationCount: count + 1 });
	}
	if(project.validationCount > 3){
		try {
			const project = await Project.findByIdAndUpdate(
				project._id,
				{ isValidated: true },
				{ new: true }
			);
			return res.status(200).json({sucess: true, msg: 'Project validated successfully.' });
		} catch {
			return res.status(400).json({sucess: false, msg: 'Failed to validate Project' });
		}
	}
	
};

// getting list of all the validated projects .(Updated API)

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

// Party bidding on a project (Updated API)

exports.partyBiddingForProjects = async (req, res, next) => {
	let { partyId, projectId, tokenBid, timeline } = req.body;

	const party = await Party.findById(partyId);
	if (!party) {
		return res.status(400).json({ msg: 'Party not found.' });
	}
	const project = await Project.findById(projectId);
	if (!project) {
		return res.status(400).json({ msg: 'Project not found.' });
	}

	await party.updateOne({
		$push: {
			projectBidFor: {
				projectId,
				projectName: project.name,
				tokenBid,
				proposed: false,
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

	return res.status(200).json({ msg: 'Project bid added successfully.' });
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

// 
exports.getProjectsForBidding = async (req, res, next) => {
	let {partyId} = req.body;
	try {
		const project = await Project.find({
			$and: [
				{isValidated: true},
				{isIssued: false},
				{ proposedBy: { $ne: partyId } },
				{ "validationDecision.partyId": {$nin : [partyId]}  },
			  ]
		});
		res.status(200).json( project );
	} catch {
		res.status(400).json({ msg: 'No Projects found!!!' });
	}
};