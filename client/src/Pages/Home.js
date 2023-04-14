import React from 'react';
import Header from '../Components/Header';
import homepageimg from './homepage.jpg';
import StepBox from '../Components/StepBox';
import TopProject from '../Components/TopProject';
import { greenColor, blueColor } from '../globalVars';
import Spinner from '../Components/Spinner';
import axios from 'axios';
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			loggedIn: false,
			topThreeProjects: [],
		};
	}
	componentDidMount() {
		if (
			sessionStorage.getItem('isLoggedIn') == null ||
			sessionStorage.getItem('isLoggedIn') == 'false' ||
			sessionStorage.getItem('isLoggedIn') == false
		) {
			sessionStorage.setItem('isLoggedIn', false);
		} else {
			this.setState({
				loggedIn: true,
			});
		}
		this.getTopBiddingProjects();
	}
	handleLoggedIn = (result) => {
		console.log('handling logged in home page', result);
		this.setState({ loggedIn: result });
	};
	goToValidationPage = () => {
		this.props.history.push('/validation');
	};
	goToIssuePage = () => {
		this.props.history.push('/rateProject');
	};

	customStyle = {
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

	issuerWorkingSteps = [
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

	bidderWorkingSteps = [
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

	getTopBiddingProjects = () => {
		this.setState({
			loading: true,
		});
		const options = {
			method: 'GET',
			url: `http://localhost:2000/project/getTopThreeProjects`,
			headers: {
				'content-type': 'application/json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				// console.log(response.data);
				this.setState({
					topThreeProjects: response.data.data,
					loading: false,
				});
			})
			.catch(function (error) {
				console.error(error.message);
				this.setState({
					loading: false,
				});
			});
	};
	render() {
		return (
			<React.Fragment>
				{this.state.loading ? (
					<Spinner />
				) : (
					<>
						<Header
							loggedIn={this.state.loggedIn}
							handleLoggedIn={(result) => this.handleLoggedIn()}
						/>
						<div style={this.customStyle.titleImageContainer}>
							<img
								style={this.customStyle.titleImage}
								src={homepageimg}
							></img>

							{this.state.loggedIn ? (
								<div
									onClick={this.goToValidationPage}
									style={this.customStyle.validationButton}
								>
									Get Your Project Validated
								</div>
							) : (
								<></>
							)}
							{this.state.loggedIn ? (
								<div
									onClick={this.goToIssuePage}
									style={this.customStyle.issueButton}
								>
									Rate your done projects
								</div>
							) : (
								<></>
							)}
						</div>
						<div style={this.customStyle.issuerStepsHeading}>
							Understand How it Works for an Issuer ?
						</div>
						<div style={this.customStyle.issuerStepsContainer}>
							{this.issuerWorkingSteps.map((step) => {
								return (
									<StepBox
										key={step.stepcount}
										stepcount={step.stepcount}
										imgsrc={step.imgsrc}
										desc={step.desc}
										bgColor={step.bgColor}
									/>
								);
							})}
						</div>
						<div style={this.customStyle.issuerStepsHeading}>
							Understand How it Works for a Bidder ?
						</div>
						<div style={this.customStyle.bidderStepsContainer}>
							{this.bidderWorkingSteps.map((step) => {
								return (
									<StepBox
										key={step.stepcount}
										stepcount={step.stepcount}
										imgsrc={step.imgsrc}
										desc={step.desc}
										bgColor={step.bgColor}
									/>
								);
							})}
						</div>
						<div style={this.customStyle.boldCenteredHeading}>
							Some of the top Implemented projects
						</div>
						<div style={this.customStyle.topProjectsContainer}>
							{this.state.topThreeProjects.map((project) => {
								return (
									<TopProject
										key={project._id}
										id={project._id}
										name={project.name}
										desc={project.description}
										tokens={project.wonBy.token}
									/>
								);
							})}
						</div>
					</>
				)}
			</React.Fragment>
		);
	}
}
