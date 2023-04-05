import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import ProjectBox from '../Components/ProjectBox';

function Profile() {
	const queryParameters = new URLSearchParams(window.location.search);
	const partyId = queryParameters.get('id');
	const [id, setId] = useState(partyId);
	const [name, setName] = useState('Party 123');
	const [projectBidFor, setProjectBidFor] = useState([
		'decoration system',
		'roadways',
	]);
	const [myProject, setMyProject] = useState([
		{ id: 54, name: 'sdafdsf' },
		{ id: 5463, name: 'galjesdf' },
	]);
	const [tokens, setTokens] = useState(30);
	const [isValidator, setIsValidator] = useState(false);

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
					{myProject.map((project) => {
						return <ProjectBox id={project.id} />;
					})}
				</div>
				<div style={customStyle.projectHeading}>Projects Bid For</div>
				<div style={customStyle.projectBidContainer}>
					{projectBidFor.map((project) => {
						return <ProjectBox id={project} />;
					})}
				</div>
			</div>
		</React.Fragment>
	);
}

export default Profile;
