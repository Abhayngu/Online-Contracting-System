import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import ProjectBox from '../Components/ProjectBox';
import { useNavigate } from 'react-router-dom';

function Profile() {
	const navigate = useNavigate();
	const queryParameters = new URLSearchParams(window.location.search);
	const partyId = queryParameters.get('id');
	const [name, setName] = useState('');
	const [projectBidFor, setProjectBidFor] = useState([]);
	const [myProject, setMyProject] = useState([]);
	const [tokens, setTokens] = useState(0);
	const [isValidator, setIsValidator] = useState(false);

	useEffect(() => {
		const isLoggedIn = sessionStorage.getItem('isLoggedIn');
		if (!(isLoggedIn == 'true')) {
			navigate('/');
		} else {
			console.log('User is logged in <--- from profile page');
		}
		const user = JSON.parse(sessionStorage.getItem('user'));
		setName(user.name);
		setTokens(user.tokens);
		setIsValidator(user.isValidator);
		const projProp = JSON.parse(sessionStorage.getItem('projectProposed'));
		setMyProject(projProp);
		setProjectBidFor(projProp);
		console.log(user);
	}, []);
	const customStyle = {
		profileContainer: {
			// display: 'flex',
			// justifyContent: 'center',
			// textAlign: 'center',
			padding: '80px 40px 20px 50px',
			width: '100%',
		},
		partyName: {
			textDecoration: 'underline',
			fontSize: '40px',
			marginBottom: '45px',
			// marginBottom: '30px',
			color: '#46B6A6',
			// fontSize: '16px',
		},
		tokens: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		isValidator: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		projectHeading: {
			marginBottom: '30px',
			fontWeight: '600',
		},
		myProjectsContainer: {
			display: 'flex',
			justifyContent: 'flex-start',
			marginBottom: '30px',
		},
		projectBidContainer: {
			display: 'flex',
			justifyContent: 'flex-start',
		},
	};
	return (
		<React.Fragment>
			<Header c="#d9d9d9" />
			<div style={customStyle.profileContainer}>
				<div style={customStyle.partyName}>{name}</div>
				<div style={customStyle.tokens}>Tokens : {tokens}</div>
				<div style={customStyle.isValidator}>
					Is a Validator? :{' '}
					{isValidator ? (
						<span style={{ color: 'green' }}>Yes</span>
					) : (
						<span style={{ color: 'red' }}>No</span>
					)}
				</div>
				<div style={customStyle.projectHeading}>My Projects</div>
				<div style={customStyle.myProjectsContainer}>
					{myProject.length == 0 ? (
						<></>
					) : (
						myProject.map((project) => {
							return (
								<ProjectBox
									id={project._id}
									name={project.name}
									isValidated={project.isValidated}
									isIssued={project.isIssued}
									partyName={name}
								/>
							);
						})
					)}
				</div>
				<div style={customStyle.projectHeading}>Projects Bid For</div>
				<div style={customStyle.projectBidContainer}>
					{projectBidFor.length == 0 ? (
						<></>
					) : (
						projectBidFor.map((project) => {
							return (
								<ProjectBox
									id={project._id}
									name={project.name}
									status={project.status}
									partyName={project.partyName}
								/>
							);
						})
					)}
				</div>
			</div>
		</React.Fragment>
	);
}

export default Profile;
