import React, { useState, useEffect } from 'react';

function BidBox({ name, tokens, proposedBy, isAnonymous, finishTime }) {
	const [token, setToken] = useState(0);
	const [dateTime, setDateTime] = useState('');
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState('');
	const handleBid = () => {
		if (token == '' || token == 0 || dateTime == '') {
			setIsError(true);
			setError('Enter all the fields');
			console.log(tokens, proposedBy, name, isAnonymous, finishTime);
		} else {
			setIsError(false);
			setError('');
		}
	};
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
					<div
						onClick={handleBid}
						className="flex-vc"
						style={customStyle.button}
					>
						Bid
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'flex-start',
							alignItems: 'center',
							marginLeft: '25%',
							marginBottom: '10px',
						}}
					>
						<span style={{ marginRight: '8px' }}>Token : </span>
						<input
							style={customStyle.biddingAmountInput}
							type="text"
							onChange={handleTokenChange}
							value={token}
						/>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'flex-between',
							alignItems: 'center',
							flexDirection: 'column',
						}}
					>
						<span
							style={{ textAlign: 'center', marginBottom: '8px' }}
						>
							Finish Time
						</span>
						<input
							style={customStyle.expectedTimeInput}
							value={dateTime}
							onChange={handleDateTimeChange}
							type="datetime-local"
						/>
					</div>
				</div>
				{isError ? (
					<div
						style={{
							color: 'red',
							textAlign: 'center',
							marginTop: '4px',
							fontSize: '14px',
						}}
					>
						{error}{' '}
					</div>
				) : (
					<></>
				)}
			</div>
		</React.Fragment>
	);
}
export default BidBox;
