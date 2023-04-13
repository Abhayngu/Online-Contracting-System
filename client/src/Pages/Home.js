import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import homepageimg from './homepage.jpg';
import { useNavigate } from 'react-router-dom';
import StepBox from '../Components/StepBox';
import TopProject from '../Components/TopProject';
import { greenColor, blueColor } from '../globalVars';
import Spinner from '../Components/Spinner';
function Home() {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const customStyle = {
		titleImageContainer: {
			width: '100%',
			height: '100vh',
			marginBottom: '100px',
			position: 'relative',
		},
		titleImage: {
			display: 'inline-block',
			height: '100%',
			width: '100%',
			objectFit: 'cover',
			overflow: 'hidden',
		},
		validationButton: {
			position: 'absolute',
			background: '#005B9A',
			fontSize: '12px',
			color: 'white',
			// padding: '12px 40px 12px 40px',
			padding: '12px 0',
			textAlign: 'center',
			width: '250px',
			cursor: 'pointer',
			borderRadius: '12px',
			bottom: '250px',
			right: '80px',
		},
		issueButton: {
			position: 'absolute',
			background: '#EA6A47',
			fontSize: '12px',
			color: 'white',
			// padding: '12px 40px 12px 40px',
			padding: '12px 0',
			width: '250px',
			textAlign: 'center',
			cursor: 'pointer',
			borderRadius: '12px',
			bottom: '170px',
			right: '80px',
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
		topProjectsContainer: {
			height: '300px',
			display: 'flex',
			justifyContent: 'space-evenly',
			alignItems: 'center',
			background: '#46B6A6',
			marginBottom: '80px',
		},
		topProjectBox: {
			background: '#fff',
		},
		boldCenteredHeading: {
			textAlign: 'center',
			fontWeight: 'bold',
			fontSize: '24px',
			marginBottom: '50px',
		},
		signUpDesc: {
			width: '80%',
			margin: '0 auto 20px auto',
		},
		signUpContainer: {
			padding: '0 50px 0 50px',
			display: 'flex',
			justifyContent: 'space-between',
			marginTop: '50px',
		},
		signUpLeftContainer: {
			maxWidth: '50%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		signUpLeft: {
			width: '50%',
			marginBottom: '50px',
		},
		signUpLeftHeading: {
			fontSize: '18px',
			textAlign: 'center',
			fontWeight: 'bold',
			marginBottom: '8px',
		},
		signUpLeftDesc: {},
		signUpRightContainer: {
			display: 'flex',
			flexDirection: 'column',
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

	// API call to fetch these projects
	// Hardcoded as of now
	const topBiddingProjects = [
		{ id: 1, name: 'abc', desc: 'sadfsdf' },
		{ id: 2, name: 'def', desc: 'sagasdgdf' },
		{ id: 3, name: 'ghi', desc: 'dsgjds' },
	];

	useEffect(() => {
		if (sessionStorage.getItem('isLoggedIn') == null) {
			sessionStorage.setItem('isLoggedIn', false);
		}
	}, []);

	const goToValidationPage = () => {
		navigate('/validation');
	};
	const goToIssuePage = () => {
		navigate('/issuer');
	};

	return (
		<React.Fragment>
			<Header />
			<div style={customStyle.titleImageContainer}>
				<img style={customStyle.titleImage} src={homepageimg}></img>
				<div
					onClick={goToValidationPage}
					style={customStyle.validationButton}
				>
					Get Your Project Validated
				</div>
				<div onClick={goToIssuePage} style={customStyle.issueButton}>
					Get Your Project Issued
				</div>
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
			<div style={customStyle.boldCenteredHeading}>
				Some of the top bidding projects
			</div>
			<div style={customStyle.topProjectsContainer}>
				{topBiddingProjects.map((project) => {
					return (
						<TopProject
							id={project.id}
							name={project.name}
							desc={project.desc}
						/>
					);
				})}
			</div>
			{/* <div style={customStyle.boldCenteredHeading}>
				What do you get on Sign up?
			</div> */}
			{/* <div style={customStyle.signUpDesc}>
				This Platform helps you to let your project done by some of the
				top contractors as well as to bid for projects with no hassle
				and 100% transparency!
			</div>
			<div style={customStyle.signUpContainer}>
				<div style={customStyle.signUpLeftContainer}>
					<div style={customStyle.signUpLeft}>
						<div style={customStyle.signUpLeftHeading}>
							Web Dashboard
						</div>
						<div style={customStyle.signUpLeftDesc}>
							Manage all your projects and bidding at one place
						</div>
					</div>
					<div style={customStyle.signUpLeft}>
						<div style={customStyle.signUpLeftHeading}>
							API integration
						</div>
						<div style={customStyle.signUpLeftDesc}>
							Integration with third party APIs to manage all your
							projects
						</div>
					</div>
					<div style={customStyle.signUpLeft}>
						<div style={customStyle.signUpLeftHeading}>
							Blockchain integration
						</div>
						<div style={customStyle.signUpLeftDesc}>
							Integration with Blockchain to give full
							transparency and consistency in the bidding process
						</div>
					</div>
				</div>
				<div style={customStyle.signUpRightContainer}></div>
			</div> */}
		</React.Fragment>
	);
}
export default Home;
