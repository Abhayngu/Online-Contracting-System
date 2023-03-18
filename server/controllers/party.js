const Party = require('../models/Party');
exports.createParty = async (req, res) => {
	console.log(req.body);
	const party = await Party.create(req.body);
	res.status(201).json({
		success: true,
		// data: party,
	});
};
exports.deleteParty = (req, res) => {};
exports.updateParty = (req, res) => {};
