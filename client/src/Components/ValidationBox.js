import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

function ValidationBox({ id, name, issuers_name, time, tokens }) {
	const [validationDecision, setValidationDecision] = useState(false);
	const [msg, setMessage] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleValidate = (decision) => {
		setLoading(true);
		if (decision) {
			setValidationDecision(true);
		}
		const decisionBool = decision == 1 ? true : false;
		// console.log('main thing', decision);
		const options = {
			method: 'PUT',
			url: `http://localhost:2000/validateProj`,
			headers: {
				'content-type': 'application/json',
			},
			data: {
				partyId: sessionStorage.getItem('id'),
				projectId: id,
				decision: decisionBool,
				isValidator: sessionStorage.getItem('isValidator'),
			},
		};

		axios
			.request(options)
			.then((response) => {
				if (response.data.success == false) {
					console.log(response.data);
					setError(true);
					setMessage(response.data.msg);
				} else {
					console.log(response.data);
					setError(false);
					setMessage(response.data.msg);
				}
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
				setLoading(false);
			});
	};
	const customStyle = {
		// stepboxWithMsgContainer: {

		// 	marginBottom: '50px',
		// },
		stepboxContainer: {
			width: '18%',
			margin: '0 10px',
			backgroundColor: 'lightgreen',
			borderRadius: '10px',
			padding: '15px',
			marginBottom: '12px',
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
		style1: {
			width: '80%',
			height: '50px',
			marginBottom: '10px',
			backgroundColor: '#774d8a',
			borderRadius: '10px',
			color: 'white',
			fontSize: '14px',
			border: 'none',
			cursor: 'pointer',
		},
	};
	// console.log(name, issuers_name, time, tokens);
	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<div style={customStyle.stepboxContainer}>
						<div style={customStyle.stepHeading}>
							Project Name: <span>{name}</span>
						</div>
						<div style={customStyle.stepHeading}>
							Issuer Name: <span>{issuers_name}</span>
						</div>
						<div style={customStyle.stepHeading}>
							Expected finish time : <span>{time}</span>
						</div>
						<div style={customStyle.stepHeading}>
							Expected Tokens:{tokens}
						</div>
						<div style={{ textAlign: 'center' }}>
							<div>
								<button
									onClick={() => handleValidate(1)}
									style={customStyle.style1}
								>
									Validate
								</button>
							</div>
							<div>
								<button
									onClick={() => handleValidate(0)}
									style={customStyle.style1}
								>
									Discard
								</button>
							</div>
						</div>
					</div>
					<div
						style={{
							color: error ? 'red' : 'green',
							fontSize: '14px',
							textAlign: 'center',
						}}
					>
						{msg}
					</div>
				</>
			)}
		</>
	);
}
export default ValidationBox;
