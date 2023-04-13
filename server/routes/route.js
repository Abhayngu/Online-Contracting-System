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
	createSystem,
} = require('../controllers/party');

const {
	registerProject,
	getTop3Projects,
	getAllProjects,
	getProjectsByEmail,
	getProjectById,
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
router.get('/delete', deleteParty);

// Party routes

router.post('/signup', createParty);
router.post('/login', login);
router.get('/partyById/:id', getPartytById);

router.put('/update', updateParty);
router.put('/updateAnonymity/:id', anonymityOfParty);
router.get('/changeValidators', changeValidators);

// Project routes
router.post('/registerProject', registerProject);
router.get('/project/getTopThreeProjects', getTop3Projects);
router.get('/getAllProj', getAllProjects);
router.get('/byEmail', getProjectsByEmail);
router.get('/byId/:id', getProjectById);
router.put('/issueProj', issueProject);

// Update the result of a validator for a particular project
router.put('/validateProj', validateProject);

router.get('/listOfValidProj/:id', getAllValidatedProject);
router.get('/projectProposedBy/:id', getProjectProposedByUser);
router.put('/projectBidding', bidOnProject);
router.get('/projectBidBy/:id', listOfProjectsBidByUser);

// To get all the projects yet not validated
router.get('/projectsNotValidated/:id', notValidatedProject);

// Get All the projects for bidding for a particular user
router.get('/projectForBid/:id', getProjectsForBidding);

router.get('/projectsWon/:id', projectBidWonByParty);
router.get('/projectsToDo/:id', projectsToDo);
router.put('/project/addMilestone', addMileStone);

// Create system route
router.post('/createSystem', createSystem);

router.get('/test', testFunction);

module.exports = router;
