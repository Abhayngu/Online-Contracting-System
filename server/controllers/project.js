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
		return res
			.status(400)
			.json({ success: false, msg: 'No party exist with the id.' });
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
	const projects = await Project.find({ implementationDone: true })
		.sort({ finalBidPrice: -1 })
		.limit(3);
	res.status(200).json({ success: true, data: projects });
};

// list of all the projects in the system
exports.getAllProjects = async (req, res, next) => {
	const projects = await Project.find();
	res.status(200).json({ success: true, data: projects });
};

// getting list of projects by party email

exports.getProjectsByEmail = async (req, res, next) => {
	try {
		const projects = await Project.find({ email: req.params.email });
		if (!projects) {
			return res.status(404).json({
				success: false,
				msg: 'No projects found for this email',
			});
		}
		res.status(200).json({ success: true, data: projects });
	} catch (err) {
		res.status(400).json({ success: false, msg: 'Server error' });
	}
};

// getting the list of
exports.getProjectById = async (req, res, next) => {
	try {
		const project = await Project.findById(req.params.id);
		res.status(200).json({ success: true, data: project });
	} catch {
		res.status(400).json({
			success: false,
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
		res.status(200).json({
			success: true,
			msg: 'Project issued successfully.',
		});
	} catch {
		res.status(400).json({
			success: false,
			msg: 'Failed to issue Project',
		});
	}
};

// route : /project/updateRating
// To update rating
exports.updateRating = async (req, res, next) => {
	const {
		projectId,
		projectProposingParty,
		projectImplementingParty,
		rating,
	} = req.body;
	// console.log(req.body);
	let proposingParty = await Party.findById(projectProposingParty);
	if (!proposingParty) {
		return res
			.status(400)
			.json({ success: false, msg: 'Proposing party Not Found' });
	}
	let implementingParty = await Party.findById(projectImplementingParty);
	if (!implementingParty) {
		return res.status(400).json({
			success: false,
			msg: 'Party Implementing project Not Found',
		});
	}
	let project = await Project.findById(projectId);
	if (!project) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project not found.' });
	}
	if (project.implementationDone == false) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project not implemented yet' });
	}
	if (project.proposedBy.id != projectProposingParty) {
		return res.status(400).json({
			success: false,
			msg: 'Project not proposed by the proposing party',
			projectProposingParty,
			id: project.proposedBy.id,
		});
	}
	if (project.wonBy.id != projectImplementingParty) {
		return res.status(400).json({
			success: false,
			msg: 'Project not Implemented by the party',
		});
	}
	if (project.isRated == true) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project alread rated' });
	}
	const isNum = /^\d+$/.test(rating);
	if (!isNum) {
		return res
			.status(400)
			.json({ success: false, msg: 'Numeric ratings is allowed only' });
	}

	if (Number(rating) < 0 || Number(rating) > 5) {
		return res.status(400).json({
			success: false,
			msg: 'Rating should be between 0 and 5 both included',
		});
	}
	await project.updateOne({ rating: Number(rating), isRated: true });
	await implementingParty.updateOne({
		rating:
			(implementingParty.rating + Number(rating)) /
			implementingParty.biddingWon.length,
	});
	return res.status(200).json({
		success: true,
		msg: `Project ${project.name} got rating ${rating} from ${implementingParty.name}`,
	});
};

// route : /projectBidBy/:id
// getting the list of all the projects bid by
// a particular party using id
exports.listOfProjectsBidByUser = async (req, res, next) => {
	let id = req.params.id;

	const party = await Party.findById(id);
	if (!party) {
		return res
			.status(400)
			.json({ success: false, msg: `Party not found with id ${id}` });
	}
	const projects = await Project.find({
		bidders: {
			$elemMatch: {
				bidderId: id,
			},
		},
	});

	return res.status(200).json({
		success: true,
		numberOfProjects: projects.length,
		data: projects,
	});
};

// route : /projectProposedBy/:id
// getting the list of all the projects proposed by a party
exports.getProjectProposedByUser = async (req, res, next) => {
	let partyId = req.params.id;
	const party = await Party.findById(partyId);
	if (!party) {
		return res.status(400).json({
			success: false,
			msg: `Party not found with id ${req.params.id}.`,
		});
	}
	const projects = await Project.find({ 'proposedBy.id': partyId });
	res.status(200).json({
		success: true,
		numberOfProjects: projects.length,
		data: projects,
	});
};

// route : /project/projectImplemented/:id
// getting the list of all the projects proposed by a party which are already implemented but not rated
exports.getImplementedProjects = async (req, res, next) => {
	let partyId = req.params.id;
	const party = await Party.findById(partyId);
	if (!party) {
		return res.status(400).json({
			success: false,
			msg: `Party not found with id ${req.params.id}.`,
		});
	}
	const projects = await Project.find({
		'proposedBy.id': partyId,
		implementationDone: true,
		isRated: false,
	});
	res.status(200).json({
		success: true,
		numOfProjects: projects.length,
		data: projects,
	});
};

// route : /projectsNotValidated/:id
// return list of projects a party can validate
exports.notValidatedProject = async (req, res, next) => {
	const partyId = req.params.id;
	const party = await Party.findById(partyId);
	if (!party) {
		return res
			.status(400)
			.json({ success: false, msg: `Party not found with id ${id}` });
	}
	if (!party.isValidator) {
		return res.status(400).json({
			success: false,
			msg: `Party with name ${party.name} is not a validator`,
		});
	}
	try {
		const projects = await Project.find({
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

		return res.status(200).json({
			success: true,
			party: party,
			numberOfProjects: projects.length,
			data: projects,
		});
	} catch (err) {
		return res.status(400).json({ success: false, msg: err.message });
	}
};

// route : (put) /validateProj
// Private route
// Validate decision of a validator for some project
// {       "partyId" : "642fab597ea3f5dd72a1fc97",
// 		"projectId" : "642fca82a323ff261ab00f68",
// 		"decision" : true,
// 		"timeline" : "2023-04-07T07:10:08.068+00:00"
// }
exports.validateProject = async (req, res, next) => {
	let { partyId, projectId, decision, isValidator } = req.body;
	console.log(typeof decision);
	// console.log(partyId, projectId, decision, isValidator);
	const party = await Party.findById(partyId);
	if (!party) {
		return res.status(400).json({
			success: false,
			msg: `Party Not Found with id ${partyId}`,
		});
	}
	if (party.isBan || !party.isPermissioned) {
		return res.status(400).json({
			success: false,
			msg: `Party is banned`,
		});
	}
	if (!party.isValidator) {
		return res.status(400).json({
			sucess: false,
			msg: `Party with name ${party.name} is not a validator`,
		});
	}
	let project = await Project.findById(projectId);
	if (!project) {
		return res.status(400).json({ msg: 'Project not found' });
	}
	if (project.proposedBy.id == partyId) {
		return res
			.status(400)
			.json({ msg: 'Can not validate your own project' });
	}
	if (project.isValidated) {
		return res.status(400).json({ msg: 'Project is already validated' });
	}
	if (project.isIssued) {
		return res.status(400).json({ msg: 'Project is already Issued' });
	}
	if (project.implementationDone) {
		return res.status(400).json({ msg: 'Project is already implemented' });
	}
	let alreadyValidated = await Project.findOne({
		_id: projectId,
		validationDecision: {
			$elemMatch: { partyId: partyId },
		},
	});
	if (alreadyValidated) {
		return res.status(200).json({
			success: false,
			msg: 'This project is already validated by you',
		});
	}

	// Getting the number of validation count of the project
	const count = project.validationCount;
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
	if (decision == false) {
		return res
			.status(200)
			.json({ sucess: true, msg: 'Discarded project successfully' });
	}
	if (count >= 3 && decision == true) {
		try {
			await project.updateOne({
				isValidated: true,
				reasonIfNotValid: 'User does not have enough token',
			});
			const date = new Date(Date.now() + 5 * 60 * 1000);
			schedule.scheduleJob(date, function () {
				getBiddingResult(projectId);
			});

			return res
				.status(200)
				.json({ sucess: true, msg: 'Project validated successfully.' });
		} catch {
			return res.status(400).json({
				sucess: false,
				msg: 'Validation done! Please validate manually in schema',
			});
		}
	} else {
		return res.status(200).json({
			sucess: true,
			msg: 'Validated! Project need more validators',
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
	}
	console.log(`Bidding done for ${project.name}`);
	// console.log(bidders);
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

// route : /listOfValidProj
// getting list of all the validated projects that are not issued that means bidding is going on for them
exports.getAllValidatedProject = async (req, res, next) => {
	try {
		const projects = await Project.find({
			isValidated: true,
			isIssued: false,
		});
		res.status(200).json({ success: true, data: projects });
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
};

// route : (get) /projectForBid/:id
// List of all projects a party can bid
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
				{
					validationDecision: {
						$not: {
							$elemMatch: { partyId: id },
						},
					},
				},
			],
		});
		res.status(200).json({
			success: true,
			numberOfProjects: projects.length,
			data: projects,
		});
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
};

// Party bidding on a project
// route : (put) /projectBidding
// {       "partyId" : "642fab597ea3f5dd72a1fc97",
// 		"projectId" : "642fca82a323ff261ab00f68",
// 		"tokenBid" : "5440",
// 		"timeline" : "2023-04-07T07:10:08.068+00:00"
// }
exports.bidOnProject = async (req, res, next) => {
	let { partyId, projectId, tokenBid, timeline } = req.body;
	console.log(typeof tokenBid);
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
	const isNum = /^\d+$/.test(tokenBid);
	if (!isNum) {
		return res
			.status(400)
			.json({ success: false, msg: 'Numeric bid is allowed only' });
	}
	if (Number(tokenBid) <= 1000) {
		return res
			.status(400)
			.json({ success: false, msg: 'Bid over 1000 is allowed only' });
	}
	if (project.isValidated == false) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project not validated yet' });
	}
	if (project.isIssued == true) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project already issued' });
	}
	if (project.implementationDone == true) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project already implemented' });
	}
	if (project.proposedBy.id == partyId) {
		return res
			.status(400)
			.json({
				success: false,
				msg: 'You can not bid on the project you have proposed',
			});
	}
	const hasValidated = await Project.findOne({
		_id: projectId,
		validationDecision: {
			$elemMatch: {
				partyId: partyId,
			},
		},
	});
	if (hasValidated) {
		return res.status(400).json({
			success: false,
			msg: 'Validator of a project can not bid',
		});
	}
	const hasBidAlready = await Project.findOne({
		_id: projectId,
		bidders: {
			$elemMatch: {
				bidderId: partyId,
			},
		},
	});
	if (hasBidAlready) {
		return res.status(400).json({
			success: false,
			msg: 'You have already placed a bid on the project',
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
		numOfBid: project.numOfBid + 1,
	});

	return res
		.status(200)
		.json({ success: true, msg: 'Project bid added successfully.' });
};

// Project won by a party and done
// route : (get) /projectsWon/:id
exports.projectBidWonByParty = async (req, res, next) => {
	let partyId = req.params.id;
	try {
		const projects = await Project.find({
			'wonBy.id': partyId,
			isImplemented: true,
		});
		return res.status(200).json({ success: true, data: projects });
	} catch (err) {
		return res.status(400).json({ sucess: false, msg: err.message });
	}
};

// Projects won but pending
// route : (get) /projectsToDo/:id
exports.projectsToDo = async (req, res, next) => {
	let partyId = req.params.id;
	try {
		const projects = await Project.find({
			'wonBy.id': partyId,
			isImplemented: false,
		});
		return res.status(200).json({ success: true, data: projects });
	} catch (err) {
		return res.status(400).json({ sucess: false, msg: err.message });
	}
};

// To add a milestone
// route : (put)/project/addMilestone
exports.addMileStone = async (req, res, next) => {
	const { partyId, projectId, milestoneDone } = req.body;
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
	const isNum = /^\d+$/.test(milestoneDone);
	if (!isNum) {
		return res
			.status(400)
			.json({ success: false, msg: 'Numeric milestone is allowed only' });
	}
	if (Number(milestoneDone) > 4 || Number(milestoneDone <= 0)) {
		return res.status(400).json({
			success: false,
			msg: 'Milestone should be between 1 and 4 (both included)',
		});
	}
	// console.log(project);
	if (project.isIssued == false) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project not issued yet' });
	}
	if (project.isValidated == false) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project not validated yet' });
	}
	if (project.implementationDone == true) {
		return res
			.status(400)
			.json({ success: false, msg: 'Project already implemented' });
	}
	if (project.wonBy.id != partyId) {
		return res
			.status(400)
			.json({ success: false, msg: 'You did not won the bidding ' });
	}
	if (milestoneDone < 4) {
		await project.updateOne({
			tokenGivenToWinningParty: (milestoneDone * project.wonBy.token) / 4,
			milestonesAchieved: milestoneDone,
		});
		await party.updateOne({
			tokens: party.tokens + project.wonBy.token / 4,
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
		tokens: party.tokens + project.wonBy.token / 4,
	});
	return res.status(200).json({
		success: true,
		msg: `All the milestones are completed successfully`,
	});
};
