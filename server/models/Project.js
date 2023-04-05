const mongoose = require('mongoose');

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
			type: mongoose.Schema.ObjectId,
			ref: 'Party',
			require: true,
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
			type: [mongoose.Schema.ObjectId],
			ref: 'Party',
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
			type: [mongoose.Schema.ObjectId],
			ref: 'Party',
		},
		milestonesAchieved: {
			type: String,
			default: 'Nothing',
			enum: ['Nothing', 'Design', 'Code', 'Test', 'Deploy'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Project', ProjectSchema);
