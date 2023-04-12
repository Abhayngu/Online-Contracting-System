import React, { useState, useEffect } from 'react';

function MakeProjectBox({
	id,
	name,
	tokens,
	proposedBy,
	isAnonymous,
	finishTime,
	mileStonesDone,
}) {
	const [token, setToken] = useState(0);
	const [dateTime, setDateTime] = useState('');
	const [milestones, setMilestones] = useState([
		{ id: 0, milestone: 'nothing', done: true },
		{ id: 1, milestone: 'design', done: false },
		{ id: 2, milestone: 'code', done: false },
		{ id: 3, milestone: 'test', done: false },
		{ id: 4, milestone: 'deploy', done: false },
	]);
	const [currentMilestone, setCurrentMilestone] = useState(mileStonesDone);
	const handleTokenChange = (e) => {
		console.log(e.target.value);
		setToken(e.target.value);
	};
	const handleDateTimeChange = (e) => {
		console.log(e.target.value);
		setDateTime(e.target.value);
	};

	const handleMilestoneClick = () => {
		console.log(currentMilestone);
		if (currentMilestone != 4) {
			setCurrentMilestone(currentMilestone + 1);
		}
	};
	const handleAllMilestonesCompleted = () => {};
	const getMilestone = () => {
		switch (currentMilestone) {
			case 0:
				return (
					<div
						onClick={handleMilestoneClick}
						style={customStyle.milestones}
					>
						Click to complete first milestone
					</div>
				);
				break;
			case 1:
				return (
					<div
						onClick={handleMilestoneClick}
						style={customStyle.milestones}
					>
						Click to complete second milestone
					</div>
				);
				break;
			case 2:
				return (
					<div
						onClick={handleMilestoneClick}
						style={customStyle.milestones}
					>
						Click to complete third milestone
					</div>
				);
				break;
			case 3:
				return (
					<div
						onClick={handleMilestoneClick}
						style={customStyle.milestones}
					>
						Click to complete fourth (last) milestone
					</div>
				);
				break;
			case 4:
				return (
					<div
						onClick={handleMilestoneClick}
						style={customStyle.milestones}
					>
						Congrats You have completed this project
					</div>
				);
				break;
		}
	};
	const customStyle = {
		stepboxContainer: {
			width: '18%',
			backgroundColor: 'lightgreen',
			borderRadius: '10px',
			padding: '15px',
		},
		stepHeading: {
			marginTop: '10px',
			marginBottom: '10px',
			textAlign: 'center',
		},
		stepboxImageContainer: {
			display: 'flex',
			justifyContent: 'center',
			marginBottom: '10px',
		},
		stepboxImage: {
			textAlign: 'center',
			borderRadius: '50%',
			display: 'inline-block',
			height: '80%',
			width: '70%',
			objectFit: 'cover',
			// overflow: 'hidden',
		},
		stepboxDesc: {
			margin: '0 auto 16px auto',
			// width: '80%',
			textAlign: 'center',
			// marginBottom: '16px',
			fontSize: '14px',
		},
		button: {
			width: '80%',
			height: '50px',
			// display: 'inline-block',
			cursor: 'pointer',
			// borderRadius: '60px',
			backgroundColor: '#774d8a',
			borderRadius: '10px',
			color: 'white',
			fontSize: '14px',
			border: 'none',
			marginBottom: '10px',
		},
		biddingAmountInput: {
			width: '35%',
			height: '40px',
			border: 'none',
			outline: 'none',
			textAlign: 'center',
		},
		expectedTimeInput: {
			outline: 'none',
			textAlign: 'center',
		},
		milestones: {
			cursor: 'pointer',
			fontSize: '14px',
			textAlign: 'center',
		},
	};

	return (
		<React.Fragment>
			<div style={customStyle.stepboxContainer}>
				<div style={customStyle.stepHeading}>
					<span>{name}</span>
				</div>
				<div style={customStyle.stepHeading}>
					Expected tokens : <span>{tokens}</span>
				</div>
				{isAnonymous ? (
					<div style={customStyle.stepboxDesc}>{'Anonymous'}</div>
				) : (
					<div style={customStyle.stepboxDesc}>{name}</div>
				)}
				<div style={customStyle.stepboxDesc}>
					Expected finish time : {finishTime.toISOString()}
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<div className="flex-vc" style={customStyle.button}>
						Set Milestones Below
					</div>
				</div>
				<div>{getMilestone()}</div>
			</div>
		</React.Fragment>
	);
}
export default MakeProjectBox;
