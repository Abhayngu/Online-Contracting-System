import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import homepageimg from './homepage.jpg';
import StepBox from '../Components/StepBox';
import { greenColor, blueColor } from '../globalVars';
function Home() {
	const customStyle = {
		titleImageContainer: {
			width: '100%',
			height: '100vh',
			marginBottom: '100px',
		},
		titleImage: {
			display: 'inline-block',
			height: '100%',
			width: '100%',
			objectFit: 'cover',
			overflow: 'hidden',
		},
		issuerStepsHeading: {
			textAlign: 'center',
			fontWeight: 'bold',
			fontSize: '24px',
			marginBottom: '50px',
		},
		bidderStepsHeading: {
			textAlign: 'center',
			fontWeight: 'bold',
			fontSize: '24px',
			marginBottom: '50px',
		},
		issuerStepsContainer: {
			display: 'flex',
			justifyContent: 'space-evenly',
			marginBottom: '100px',
		},
		bidderStepsContainer: {
			display: 'flex',
			justifyContent: 'space-evenly',
			marginBottom: '100px',
		},
	};

	const issuerWorkingSteps = [
		{
			stepcount: 1,
			imgsrc: homepageimg,
			desc: 'Register/Login Your Party',
			bgColor: greenColor,
		},
		{
			stepcount: 2,
			imgsrc: homepageimg,
			desc: 'Apply to get your project Validated',
			bgColor: greenColor,
		},
		{
			stepcount: 3,
			imgsrc: homepageimg,
			desc: 'Wait till the bidding time is over',
			bgColor: greenColor,
		},
	];

	const bidderWorkingSteps = [
		{
			stepcount: 1,
			imgsrc: homepageimg,
			desc: 'Register/Login Your Party',
			bgColor: blueColor,
		},
		{
			stepcount: 2,
			imgsrc: homepageimg,
			desc: 'See the Project List',
			bgColor: blueColor,
		},
		{
			stepcount: 3,
			imgsrc: homepageimg,
			desc: 'Select one project and bid for it',
			bgColor: blueColor,
		},
	];
	return (
		<React.Fragment>
			<Header />
			<div style={customStyle.titleImageContainer}>
				<img style={customStyle.titleImage} src={homepageimg}></img>
			</div>
			<div style={customStyle.issuerStepsHeading}>
				Understand How it Works for an Issuer ?
			</div>
			<div style={customStyle.issuerStepsContainer}>
				{issuerWorkingSteps.map((step) => {
					return (
						<StepBox
							stepcount={step.stepcount}
							imgsrc={step.imgsrc}
							desc={step.desc}
							bgColor={step.bgColor}
						/>
					);
				})}
			</div>
			<div style={customStyle.issuerStepsHeading}>
				Understand How it Works for a Bidder ?
			</div>
			<div style={customStyle.bidderStepsContainer}>
				{bidderWorkingSteps.map((step) => {
					return (
						<StepBox
							stepcount={step.stepcount}
							imgsrc={step.imgsrc}
							desc={step.desc}
							bgColor={step.bgColor}
						/>
					);
				})}
			</div>
		</React.Fragment>
	);
}
export default Home;
