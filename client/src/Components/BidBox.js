import React, { useState, useEffect } from 'react';
import axios from 'axios';
function BidBox({ id, name, tokens, proposedBy, isAnonymous, finishTime }) {
	const [token, setToken] = useState(0);
	const [dateTime, setDateTime] = useState('');
	const [error, setError] = useState(false);
	const [msg, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const handleBid = () => {
		if (token == '' || dateTime == '') {
			setError(true);
			setMessage('Enter all the fields');
		} else if (token < 1000) {
			setError(true);
			setMessage('Token value should be more than 1000');
		} else {
			setLoading(true);
			setError(false);
			setError('');

			const options = {
				method: 'PUT',
				url: `http://localhost:2000/projectBidding`,
				headers: {
					'content-type': 'application/json',
				},
				data: {
					partyId: sessionStorage.getItem('id'),
					projectId: id,
					tokenBid: token,
					timeline: dateTime,
				},
			};

			axios
				.request(options)
				.then((response) => {
					console.log(response.data);
					setError(true);
					setMessage(response.data.msg);
					setLoading(false);
				})
				.catch(function (error) {
					console.error(error);
					setError(true);
					setMessage(error.response.data.msg);

					setLoading(false);
				});
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
				{isAnonymous ? (
					<div style={customStyle.stepboxDesc}>{'Anonymous'}</div>
				) : (
					<div style={customStyle.stepboxDesc}>
						Proposed by : {proposedBy}
					</div>
				)}
				{/* <div style={customStyle.stepHeading}>
					Expected tokens : <span>{tokens}</span>
				</div> */}
				<div style={customStyle.stepboxDesc}>
					Expected finish time : {finishTime}
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
				{error ? (
					<div
						style={{
							color: 'red',
							textAlign: 'center',
							marginTop: '4px',
							fontSize: '14px',
						}}
					>
						{msg}{' '}
					</div>
				) : (
					<></>
				)}
			</div>
		</React.Fragment>
	);
}
export default BidBox;
