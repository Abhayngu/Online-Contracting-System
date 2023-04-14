const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Validation = new mongoose.Schema({
	partyId: { type: mongoose.Schema.ObjectId, ref: 'Party', require: true },
	projectId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Project',
		require: true,
	},
	decision: {
		type: Boolean,
	},
});

const Proj = new mongoose.Schema({
	projectId: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Project',
	},
	projectName: {
		type: String,
	},
	proposed: {
		type: Boolean,
	},
	tokenBid: {
		type: Number,
		default: 0,
	},
	timelineProposed: {
		type: Date,
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
	},
});

const PartySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		walletAddress: {
			type: String,
			default: '',
		},
		email: {
			type: String,
		},
		password: {
			type: String,
			select: false,
		},
		description: {
			type: String,
			required: true,
		},
		isAnonymous: {
			type: Boolean,
			default: false,
		},
		isValidator: {
			type: Boolean,
			default: false,
		},
		isPermissioned: {
			type: Boolean,
			default: true,
		},
		isBan: {
			type: Boolean,
			default: false,
		},
		tokens: {
			type: Number,
			default: 1000,
		},
		rating: {
			type: Number,
			min: 0,
			max: 5,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		validationDecision: {
			type: [Validation],
		},
		projectsDone: {
			type: Number,
			default: 0,
		},
		projectFailed: {
			type: Number,
			default: 0,
		},
		projectProposed: {
			type: [Proj],
		},
		projectBidFor: {
			type: [Proj],
		},
		biddingWon: {
			type: [Proj],
		},
	},
	{
		timestamps: true,
	}
);

PartySchema.plugin(passportLocalMongoose, { usernameField: 'email' });
module.exports = mongoose.model('Parties', PartySchema);
