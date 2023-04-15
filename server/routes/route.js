const express = require('express');
const router = express.Router();
const {
	createParty,
	login,
	updateParty,
	deleteParty,
	anonymityOfParty,
	getPartytById,
	changeValidators,
	isPermissioned,
	getWalletAddress,
	createSystem,
} = require('../controllers/party');

const {
	registerProject,
	getTop3Projects,
	updateRating,
	getAllProjects,
	getProjectsByEmail,
	getProjectById,
	getImplementedProjects,
	issueProject,
	listOfProjectsBidByUser,
	getProjectProposedByUser,
	notValidatedProject,
	validateProject,
	getAllValidatedProject,
	getProjectsForBidding,
	bidOnProject,
	projectBidWonByParty,
	addMileStone,
	projectsToDo,
	testFunction,
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
router.delete('/party/delete/:id', deleteParty);

// Party routes

router.post('/signup', createParty);
router.post('/login', login);
router.get('/partyById/:id', getPartytById);

router.get('/party/getWalletAddress/:id', getWalletAddress);

router.put('/update', updateParty);
router.put('/updateAnonymity/:id', anonymityOfParty);
router.get('/changeValidators', changeValidators);
router.put('/party/permissionchanged', isPermissioned);

// Project routes

// Project Get routes
router.get('/project/getTopThreeProjects', getTop3Projects);
router.get('/projectProposedBy/:id', getProjectProposedByUser);
router.get('/project/projectImplemented/:id', getImplementedProjects);
router.get('/getAllProj', getAllProjects);
router.get('/byEmail', getProjectsByEmail);
router.get('/byId/:id', getProjectById);

// Project post routes
router.post('/registerProject', registerProject);

// Project put routes
router.put('/project/updateRating', updateRating);

// Validator Related routes
router.put('/validateProj', validateProject);
router.get('/listOfValidProj', getAllValidatedProject);
router.get('/projectsNotValidated/:id', notValidatedProject);

// Bidding Related routes
router.put('/projectBidding', bidOnProject);
router.get('/projectBidBy/:id', listOfProjectsBidByUser);
router.get('/projectForBid/:id', getProjectsForBidding);

// Working on project related routes
router.get('/projectsWon/:id', projectBidWonByParty);
router.get('/projectsToDo/:id', projectsToDo);
router.put('/project/addMilestone', addMileStone);

// Create system route
router.post('/createSystem', createSystem);

// Extra APIs
router.put('/issueProj', issueProject);
router.get('/test', testFunction);

module.exports = router;
