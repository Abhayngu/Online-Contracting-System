const mongoose = require('mongoose');

const SystemSchema = new mongoose.Schema({
	T: {
		type: Number,
		default: 6,
	},
	K: {
		type: Number,
		default: 4,
	},
	minBidPrice: {
		type: Number,
		default: 100,
	},
	minReward: {
		type: Number,
		default: 50,
	},
	milestoneReward: {
		type: [Number],
		deafult: [25, 25, 25, 25],
	},
	maxBiddingTime: {
		hours: { type: Number, default: 24 },
		minutes: { type: Number, default: 0 },
		seconds: { type: Number, default: 0 },
	},
	maxTotalPrice: {
		type: Number,
		default: 10000,
	},
	validators: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Party',
	},
});

module.exports = mongoose.model('System', SystemSchema);
