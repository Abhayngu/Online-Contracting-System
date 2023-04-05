const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

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
			type: [mongoose.Schema.ObjectId],
			ref: 'Project',
			default: [],
		},
		projectBidFor: {
			type: [mongoose.Schema.ObjectId],
			ref: 'Project',
			default: [],
		},
		biddingWon: {
			type: [mongoose.Schema.ObjectId],
			ref: 'Project',
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

PartySchema.plugin(passportLocalMongoose, { usernameField: 'email' });
module.exports = mongoose.model('Parties', PartySchema);
