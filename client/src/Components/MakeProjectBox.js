import React, { useState, useEffect } from 'react';

function MakeProjectBox({
	id,
	name,
	tokens,
	proposedBy,
	isAnonymous,
	finishTime,
}) {
	const [token, setToken] = useState(0);
	const [dateTime, setDateTime] = useState('');
	const [milestones, setMilestones] = useState([
		{ id: 1, milestone: 'design', done: false },
		{ id: 2, milestone: 'code', done: false },
		{ id: 3, milestone: 'test', done: false },
		{ id: 4, milestone: 'deploy', done: false },
	]);
	const [currentMilestone, setCurrentMilestone] = useState({
		id: 0,
		milestones: 'nothing',
	});
	const handleTokenChange = (e) => {
		console.log(e.target.value);
		setToken(e.target.value);
	};
	const handleDateTimeChange = (e) => {
		console.log(e.target.value);
		setDateTime(e.target.value);
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
					<div style={customStyle.stepboxDesc}>{proposedBy}</div>
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
				<div>{}</div>
			</div>
		</React.Fragment>
	);
}
export default MakeProjectBox;
