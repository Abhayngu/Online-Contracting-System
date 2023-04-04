import React, { useState, useEffect } from 'react';

function ProjectBox({ id }) {
	const [proId, setProId] = useState(34);
	const [projectName, setProjectName] = useState('laptop bidding');
	const [projectStatus, setProjectStatus] = useState('Bidding going on');
	const [proposedBy, setProposedBy] = useState('party3');
	const customStyle = {
		projectBox: {
			backgroundColor: '#A9EDC4',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			width: '200px',
			height: '200px',
			overflow: 'hidden',
		},
		projectId: {},
		projectName: {},
		projectStatus: {},
		projectProposedBy: {},
	};
	return (
		<React.Fragment>
			<div style={customStyle.projectBox}>
				<div style={customStyle.projectId}>Id : {proId}</div>
				<div style={customStyle.projectName}>Name : {projectName}</div>
				<div style={customStyle.projectName}>
					Status : {projectName}
				</div>
			</div>
		</React.Fragment>
	);
}

export default ProjectBox;
