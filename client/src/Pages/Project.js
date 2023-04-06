import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import axios from 'axios';
function Project() {
	const queryParameters = new URLSearchParams(window.location.search);
	const projectId = queryParameters.get('id');
	const [name, setName] = useState('');
	const [id, setId] = useState(projectId);
	const [proposedBy, setProposedBy] = useState('');
	const [bidWonBy, setBidWonBy] = useState('');
	const [winningBidPrice, setWinningBidPrice] = useState('');
	const [projectStatus, setProjectStatus] = useState('');
	const [projectMilstones, setProjectMilstones] = useState('');

	const getUserNameById = (id) => {
		const options = {
			method: 'GET',
			url: `http://localhost:2000/partyById/${id}`,
			headers: {
				'content-type': 'application/json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				setProposedBy(getUserNameById(response.data.name));
			})
			.catch(function (error) {
				console.error(error);
			});
	};
	useEffect(() => {
		const options = {
			method: 'GET',
			url: `http://localhost:2000/byId/${id}`,
			headers: {
				'content-type': 'application/json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				// console.log(response.data);
				const project = response.data.data;
				console.log(project);
				setName(project.name);
				// getUserNameById(project.proposedBy);
				if (project.wonBy.length == 0) {
					setBidWonBy('Bidding Not Over Yet');
					setWinningBidPrice('None');
				} else {
					setBidWonBy(project.wonby[0]);
					setWinningBidPrice('Need to be added in schema');
				}
				if (project.isIssued == 'true') {
					setProjectStatus('Issued');
				} else if (project.isValidated == 'true') {
					setProjectStatus('Validated');
				} else {
					setProjectStatus('Not Validated');
				}
				setProjectMilstones(project.milestonesAchieved);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

	const customStyle = {
		projectContainer: {
			// display: 'flex',
			// justifyContent: 'center',
			textAlign: 'center',
			margin: '80px auto 20px auto',
		},
		projectName: {
			textDecoration: 'underline',
			fontSize: '40px',
			marginBottom: '45px',
			// marginBottom: '30px',
			color: '#46B6A6',
			// fontSize: '16px',
		},
		projectId: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		proposedBy: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		bidBy: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		bidWonBy: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		winningBid: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		projectStatus: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		projectMilestone: {
			marginBottom: '30px',
			fontSize: '16px',
		},
	};
	return (
		<React.Fragment>
			<Header c="#d9d9d9" />
			<div style={customStyle.projectContainer}>
				<div style={customStyle.projectName}>{name}</div>
				<div style={customStyle.projectId}>
					Id of the project : {id}
				</div>
				<div style={customStyle.proposedBy}>
					Proposed by Party : {proposedBy}
				</div>
				<div style={customStyle.bidWonBy}>
					Bidding Won By : {bidWonBy}
				</div>
				<div style={customStyle.winningBid}>
					Price of winning bid : {winningBidPrice}
				</div>
				<div style={customStyle.projectStatus}>
					Status of the project : {projectStatus}
				</div>
				<div style={customStyle.projectMilestone}>
					Milestones achieved in the project : {projectMilstones}
				</div>
			</div>
		</React.Fragment>
	);
}

export default Project;
