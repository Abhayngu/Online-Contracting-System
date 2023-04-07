const mongoose = require('mongoose');

const Bidder = new mongoose.Schema({
	bidderId: {
		type: [mongoose.Schema.ObjectId],
		ref: 'Party',
	},
	bidderName: {
		type: String,
	},
	bidderToken: {
		type: Number,
	},
});

const ProjectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			maxLength: 200,
		},
		proposedBy: {
			id: {
				type: mongoose.Schema.ObjectId,
				ref: 'Party',
				require: true,
			},
			name: {
				type: String,
			},
		},
		proposedAt: {
			type: Date,
			default: Date.now,
			immutable: false,
		},
		expectedFinishTime: {
			type: Date,
		},
		expectedTokens: {
			type: Number,
		},
		bidders: {
			type: [Bidder],
		},
		biddingDuration: {
			type: String,
			require: true,
		},
		isValidated: {
			type: Boolean,
			default: false,
		},
		isIssued: {
			type: Boolean,
			default: false,
		},
		wonBy: {
			type: mongoose.Schema.ObjectId,
			ref: 'Party',
		},
		milestonesAchieved: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Project', ProjectSchema);
