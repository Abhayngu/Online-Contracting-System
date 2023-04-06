import React, { useState, useEffect } from 'react';

function StepBox({ stepcount, imgsrc, desc, bgColor }) {
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
			width: '80%',
			textAlign: 'center',
			// marginBottom: '16px',
			fontSize: '14px',
		},
	};
	// console.log(props);
	return (
		<React.Fragment>
			<div
				className="scaleOnHover"
				style={{
					...customStyle.stepboxContainer,
					backgroundColor: bgColor,
				}}
			>
				<div style={customStyle.stepHeading}>
					Step <span>{stepcount}</span>
				</div>
				<div style={customStyle.stepboxImageContainer}>
					<img
						src={imgsrc}
						style={customStyle.stepboxImage}
						alt="steps box"
					></img>
				</div>
				<div style={customStyle.stepboxDesc}>{desc}</div>
			</div>
		</React.Fragment>
	);
}
export default StepBox;
