const express = require('express');
const router = express.Router();
const passport = require('passport');
const crypto = require('crypto');
const async = require('async');
const Project = require('../models/Project');
const Party = require('../models/Party');
const {
	createParty,
	login,
	updateParty,
	deleteParty,
	anonymityOfParty,
	changePassword,
	getPartytById,
	changeValidators,
	createSystem,
	isPermissioned
} = require('../controllers/party');

const {
	registerProject,
	getTop3Projects,
	getAllProjects,
	getProjectsByEmail,
	getProjectById,
	issueProject,
	validateProject,
	getAllValidatedProject,
	getProjectProposedByUser,
	partyBiddingForProjects,
	listOfProjectsBidByUser,
	getProjectsForBidding,
	projectBidWonByParty,
	notValidatedProject,
	bidWonByParty
} = require('../controllers/project');

router.get('/signup', (req, res) => {
	res.render('signup');
});
router.get('/login', (req, res) => {
	res.render('login');
});
router.get('/update', (req, res) => {
	res.render('update');
});
router.get('/delete', deleteParty);

// Party routes

router.post('/signup', createParty);
router.post('/login', login);
router.get('/partyById/:id', getPartytById);

router.put('/update', updateParty);
router.put('/updateAnonymity/:id', anonymityOfParty);
router.get('/changeValidators', changeValidators)
router.put('/party/permissionchanged',isPermissioned )

// Project routes
router.post('/registerProject', registerProject);
router.get('/top3', getTop3Projects);
router.get('/getAllProj', getAllProjects);
router.get('/byEmail', getProjectsByEmail);
router.get('/byId/:id', getProjectById);
router.put('/issueProj', issueProject);
router.put('/validateProj', validateProject);
router.get('/listOfValidProj', getAllValidatedProject);
router.get('/projectProposedBy/:id', getProjectProposedByUser);
router.put('/projectBidding', partyBiddingForProjects);
router.get('/projectBidBy/:id', listOfProjectsBidByUser);
router.get('/projectForBid', getProjectsForBidding);
router.get('/projectsWon',projectBidWonByParty);
router.get('/projectsNotValidated', notValidatedProject);
router.put('/bidWonByParty', bidWonByParty);



// Create system route
router.post('/createSystem', createSystem)
module.exports = router;
