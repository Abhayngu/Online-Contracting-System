const Project = require('../models/Project');
const Party = require('../models/Party');

exports.registerProject = async (req, res, next) => {
	let {
		name,
		description,
		proposedBy,
		expectedFinishTime,
		expectedTokens,
		biddingDuration,
	} = req.body;
	const party = await Party.findById(proposedBy.toString());
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
			proposedBy,
			{ $push: { projectProposed: project._id } },
			{ new: true }
		);
		res.status(200).json({ msg: 'Project registered sucessfully.' });
	} catch {
		res.status(400).json({ msg: 'Failed to register project.' });
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
	try {
		const project = await Project.findByIdAndUpdate(
			req.params.id,
			{ isValidated: true },
			{ new: true }
		);
		res.status(200).json({ msg: 'Project validated successfully.' });
	} catch {
		res.status(400).json({ msg: 'Failed to validate Project' });
	}
};

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

exports.partyBiddingForProjects = async (req, res, next) => {
	let { partyId, projectId } = req.body;

	const party = await Party.findById(partyId);
	if (!party) {
		return res.status(400).json({ msg: 'Party not found.' });
	}
	const project = await Project.findById(projectId);
	if (!project) {
		return res.status(400).json({ msg: 'Project not found.' });
	}

	await party.updateOne({ $push: { projectBidFor: projectId } });
	await project.updateOne({ $push: { bidders: partyId } });

	return res.status(200).json({ msg: 'Project bid added successfully.' });
};

exports.listOfProjectsBidByUser = async (req, res, next) => {
	let id = req.params.id;

	const party = await Party.findById(id);
	if (!party) {
		return res.status(400).json({ msg: 'Party not found.' });
	}
	console.log(party);
	const project = await Project.find({ bidders: id });

    return res.status(200).json(project);
};

exports.getProjectProposedByUser = async (req, res, next) => {
	let id = req.params.id;
	const party = await Party.findById(id);
	if (!party) {
		return res
			.status(400)
			.json({ msg: `Party not found with id ${req.params.id}.` });
	}
	const projects = await Project.find({ proposedBy: id });
	res.status(200).json(projects);
};
