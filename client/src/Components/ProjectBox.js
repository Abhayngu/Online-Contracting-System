import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectBox({ id }) {
	const navigate = useNavigate();
	const [proId, setProId] = useState(id);
	const [projectName, setProjectName] = useState('Laptop bidding');
	const [projectStatus, setProjectStatus] = useState('Bidding going on');
	const [proposedBy, setProposedBy] = useState('party3');
	function handleProjectClick() {
		navigate(`/project?id=${proId}`);
	}
	const customStyle = {
		projectBox: {
			backgroundColor: '#A9EDC4',
			width: '200px',
			height: '200px',
			overflow: 'hidden',
			padding: '10px',
			textAlign: 'center',
			cursor: 'pointer',
			borderRadius: '20px',
			paddingTop: '30px',
			marginRight: '20px',
		},
		projectFlex: {
			marginTop: '20px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-end',
			alignItems: 'center',
		},
		projectId: {},
		projectName: {
			selfAlign: 'flex-start',
			fontSize: '16px',
			fontWeight: '600',
		},
		projectStatus: {},
		projectProposedBy: {},
	};
	return (
		<React.Fragment>
			<div onClick={handleProjectClick} style={customStyle.projectBox}>
				<div style={customStyle.projectName}>{projectName}</div>
				<div style={customStyle.projectFlex}>
					<div style={customStyle.projectStatus}>
						<span style={{ color: 'red' }}>Status</span> :{' '}
						{projectStatus}
					</div>
					<div style={customStyle.projectProposedBy}>
						<span style={{ color: 'blue' }}>Proposed By</span> :{' '}
						{proposedBy}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ProjectBox;
