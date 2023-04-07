import React, { useState, useEffect } from 'react';

function ProjectIssueBox({ name,tokens,desc }) {
	// const [stepcount, setstepcount] = useState(0);
	const customStyle = {
		stepboxContainer: {
			width: '18%',
			borderRadius: '15%',
			'&:hover': {
				// transform: 'scale(1.08) translateY(-12px)',
				// boxShadow: '10px 10px 10px 2000px rgb(12, 13, 34 / 20%)',
				display: 'none',
			},
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
        button :{
            // width: '380px',
            height: '50px',
            borderRadius: '60px',
            backgroundColor: '#774d8a',
            color: 'white',
            fontSize: '25px',
            border: 'none',
        }
	};
	console.log(tokens, desc, name);
	return (
		<React.Fragment>
			<div>
				<div style={customStyle.stepHeading}>
					 <span>{tokens}</span>
				</div>
				<div style={customStyle.stepboxDesc}>{desc}</div>
			</div>
            <div style={customStyle.stepHeading}>
				<span>{name}</span>
			</div>
			<button style={customStyle.button}>Bid Here</button>

		</React.Fragment>
	);
}
export default ProjectIssueBox;
