import React, { useState, useEffect } from 'react';


function ValidationBox({ name,issuers_name,time, tokens }) {
	// const [stepcount, setstepcount] = useState(0);
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
		style1: {
			width: '80%',
			height: '50px',
			marginBottom : '10px',
			backgroundColor: '#774d8a',
			borderRadius: '10px',
			color: 'white',
			fontSize: '14px',
			border: 'none',
			cursor : 'pointer'
		},
	};
	console.log(name,issuers_name,time, tokens);
	return (
		<React.Fragment>
			<div style={customStyle.stepboxContainer}>
				<div style={customStyle.stepHeading}>
				Project Name:	<span>{name}</span>
				</div>
                <div style={customStyle.stepHeading}>
				Issuer Name:	<span>{issuers_name}</span>
				</div>
				<div style={customStyle.stepHeading}>
					Expected finish time : <span>{time}</span>
				</div>
				<div style={customStyle.stepHeading}>Expected Tokens:{tokens}</div>
				<div style={{textAlign : 'center'}}>
					<div ><button style={customStyle.style1}>Validate</button></div>
                    <div ><button style={customStyle.style1}>Discard</button></div>
				</div>
			</div>
		</React.Fragment>
	);
}
export default ValidationBox;
