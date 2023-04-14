const Project = require('../models/Project');
const Party = require('../models/Party');

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
		res.status(200).json({ success : true, project, party,msg: 'Project registered sucessfully.' });
	} catch (err) {
		res.status(400).json({ success : false, msg: err.message });
	}
};

// get list of top three projects
exports.getTop3Projects = async (req, res, next) => {
	const projects = await Project.find().sort({ finalBidPrice: -1 }).limit(3);
	res.status(200).json({ data: projects });
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

// list of not validated project by given user

exports.notValidatedProject = async (req, res, next) => {
	let { partyId } = req.body;
	try{
		const project = await Project.find({
			$and: [
				{isValidated: false},
				{isIssued: false},
				{ proposedBy: { $ne: partyId } }
			  ]
		});
		return res.status(200).json(project);
	} catch {
		return res.status(400).json({sucess: false, msg: "Project not found"});
	}
};
// Validating projects by validator
exports.validateProject = async (req, res, next) => {
	let { partyId, projectId, decision, isValidator } = req.body;
	console.log(partyId, projectId, decision, isValidator)
	const party = await Party.findById(partyId);
	if (!isValidator) {
		return res.status(400).json({ sucess: false, msg: 'Party is not a validator.' });
	}
	let project = await Project.findById(projectId);
	if (!project) {
		return res.status(400).json({ msg: 'Project not found.' });
	}
	let alreadyValidated = await Project.findOne({_id : projectId
		, "validationDecision.projectId": {$in : [projectId]}});
	if(alreadyValidated){
		return res.status(200).json({sucess: false, msg: "Already validated by you"});
	}
	// const party = await Party.find({
	// 		 "validationDecision.projectId": {$in : projectId}
	// });
	const count = project.validationCount;
	console.log('before updation ', project.validationCount)
	if(decision == true) {
		// await Project.findByIdAndUpdate(project._id, { validationCount: count + 1 });
		await project.updateOne({ validationCount: count + 1 });
		await project.updateOne({
			$push: {
				validationDecision: {
					partyId: partyId,
					projectId: projectId,
					decision: true
				},
			},
		});
		await party.updateOne({
			$push: {
				validationDecision: {
					partyId: partyId,
					projectId: projectId,
					decision: true
				},
			},
		});
		console.log('After updation ', project.validationCount)
	} else {
		await project.updateOne({
			$push: {
				validationDecision: {
					partyId: partyId,
					projectId: projectId,
					decision: false
				},
			},
		});
		await party.updateOne({
			$push: {
				validationDecision: {
					partyId: partyId,
					projectId: projectId,
					decision: false
				},
			},
		});
		return res.status(200).json({sucess: true, msg: "Your decision noted."});
	}
	if(count >= 3 && decision == true){
		try {
			await Project.findOneAndUpdate({_id : projectId}, 
				{ isValidated: true,
				reasonIfNotValid: "User does not have enough token"},
				{new : true}
			);
			return res.status(200).json({sucess: true, msg: 'Project validated successfully.' });
		} catch {
			return res.status(400).json({sucess: false, msg: 'Failed to validate Project' });
		}
	} else {
		return res.status(200).json({sucess: true, msg: "Waiting for other validators to validate."});
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

// Project won by a party

exports.projectBidWonByParty =async (req, res, next) => {
	let { partyId } = req.body;
	try {
		const project = await Project.find({"wonBy.id" :partyId});
		return res.status(200).json(project);
	} catch  {
		return res.status(400).json({ sucess: false , msg : "No projects won."});
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

// partId projectId, partName, projectName, isAnonymous, 
// token,timelineProposed


exports.bidWonByParty = async (req, res, next) => {
	let {partyId, projectId, partyName, projectName, isAnonymous, token, timeline } = req.body;
	const project = await Project.find(projectId);
	if(!project) {
		return res.status(400).json({sucess: false, msg: "Project not found."});
	}
	const party = await Party.find(partyId);
	if(!party) {
		return res.status(400).json({sucess: false, msg: "Party not found."});
	}
	await Project.findByIdAndUpdate(
		project._id,
		{ "wonBy.id": partyId },
		{"wonBy.name": partyName},
		{"wonBy.isAnonymous": isAnonymous},
		{"wonBy.token": token},
		{"wonBy.timelineProposed": timeline},
		{ new: true }
	);
	
	await party.updateOne({
		$push: {
			biddingWon: {
				projectId,
				projectName,
				proposed : false,
				tokenBid: token,
				timelineProposed: timeline,
			},
		},
	});
	res.status(200).json({sucess: true, msg: "You have won the Bid"});
};