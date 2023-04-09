import React, { useState, useEffect } from 'react';

function ProjectIssueBox({ name,issuer_name,time, tokens, desc }) {
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
		button: {
			width: '50%',
			height: '50px',
			// display: 'inline-block',

			// borderRadius: '60px',
			backgroundColor: '#774d8a',
			borderRadius: '10px',
			color: 'white',
			fontSize: '14px',
			border: 'none',
		},
	};
	console.log(tokens, desc, name);
	return (
		<React.Fragment>
			<div style={customStyle.stepboxContainer}>
				<div style={customStyle.stepHeading}>
				Project Name:	<span>{name}</span>
				</div>
                <div style={customStyle.stepHeading}>
				Issuer Name:	<span>{issuer_name}</span>
				</div>
				<div style={customStyle.stepHeading}>
					Expected finish time : <span>{time}</span>
				</div>
				<div style={customStyle.stepHeading}>Expected Tokens:{tokens}</div>
				<div className="flex-vc">
					<div className="flex-vc" style={customStyle.button}><button>Validate</button></div>
                    <div className="flex-vc"><button>Discard</button></div>
				</div>
			</div>
		</React.Fragment>
	);
}
export default ProjectIssueBox;
