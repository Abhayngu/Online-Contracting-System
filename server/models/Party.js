const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Proj = new mongoose.Schema({
	projectId: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Project',
	},
	projectName: {
		type: String,
	},
	tokenBid: {
		type: Number,
		default: 0,
	},
	proposed: {
		type: Boolean,
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
		tokens: {
			type: Number,
			default: 50,
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
