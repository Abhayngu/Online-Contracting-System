import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
function Project() {
	const queryParameters = new URLSearchParams(window.location.search);
	const projectId = queryParameters.get('id');
	const [name, setName] = useState('Decoration System');
	const [id, setId] = useState(projectId);
	const [proposedBy, setProposedBy] = useState('Party1');
	const [bidWonBy, setBidWonBy] = useState('Party5');
	const [winningBidPrice, setWinningBidPrice] = useState('50 ether');
	const [projectStatus, setProjectStatus] = useState('issued');
	const [projectMilstones, setProjectMilstones] = useState('develop');

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
