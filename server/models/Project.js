const mongoose = require('mongoose');

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

const Bidder = new mongoose.Schema({
	bidderId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Party',
	},
	bidderName: {
		type: String,
	},
	bidderToken: {
		type: Number,
	},
	timelineAgreed: {
		type: Date,
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
			isAnonymous: {
				type: Boolean,
				default: false,
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
		rating: {
			type: Number,
			min: 0,
			deafult: 0,
			max: 5,
		},
		isRated: {
			type: Boolean,
			default: false,
		},
		isValid: {
			type: Boolean,
			default: false,
		},
		reasonIfNotValid: {
			type: String,
			default: 'Not Validated by enough validators',
		},
		isValidated: {
			type: Boolean,
			default: false,
		},
		validationCount: {
			type: Number,
			default: 0,
		},
		validationDecision: {
			type: [Validation],
		},
		validationTime: {
			type: Date,
		},
		biddingTime: {
			type: Date,
		},
		isIssued: {
			type: Boolean,
			default: false,
		},
		numOfBid: {
			type: Number,
			default: 0,
		},
		biddingDuration: {
			type: String,
			require: true,
		},
		wonBy: {
			id: {
				type: mongoose.Schema.ObjectId,
				ref: 'Party',
			},
			name: {
				type: String,
			},
			isAnonymous: {
				type: Boolean,
				default: false,
			},
			token: {
				type: Number,
			},
			timelineProposed: {
				type: Date,
			},
		},
		tokenGivenToWinningParty: {
			type: Number,
			default: 0,
		},
		implementationDone: {
			type: Boolean,
			default: false,
		},
		milestonesAchieved: {
			type: Number,
			default: 0,
			// nothing, design, code, test, deploy
			// 0, 1, 2, 3, 4
		},
		actualFinishTime: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Project', ProjectSchema);
