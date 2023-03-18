const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	tokens: {
		type: Number,
		default: 0,
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
	},
	projectsDone: {
		type: Number,
		default: 0,
	},
	email: {
		type: String,
	},
});

module.exports = mongoose.model('Party', PartySchema);
