const express = require('express');
const router = express.Router();
const {
	createParty,
	deleteParty,
	updateParty,
} = require('../controllers/party');

router.route('/party').post(createParty);

module.exports = router;
