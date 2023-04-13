import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import BidBox from '../Components/BidBox';
// projectName, tokens, proposedByName, proposedByIsAnonymous, expectedFinishTime
export default function BidProject() {
	const [projects, setProjects] = useState([]);
	const getProjectsForBidding = () => {};
	useEffect(() => {
		getProjectsForBidding();
	}, []);
	const customStyle = {
		projectsContainer: {
			display: 'flex',
			justifyContent: 'space-evenly',
			flexWrap: 'wrap',
			padding: '0 40px',
			margin: '50px 0',
		},
		issuedHeadingStyle: {
			marginTop: '50px',
			textAlign: 'center',
			fontWeight: '600',
			fontSize: '24px',
		},
	};
	return (
		<React.Fragment>
			<Header c="#d9d9d9" />
			<h1 style={customStyle.issuedHeadingStyle}>Projects to Bid for </h1>
			<div style={customStyle.projectsContainer}>
				{projects.map((project) => {
					return (
						<BidBox
							name={project.name}
							tokens={project.tokens}
							proposedBy={project.proposedBy}
							isAnonymous={project.proposedByIsAnonymous}
							finishTime={project.expectedFinishTime}
						/>
					);
				})}
			</div>
		</React.Fragment>
	);
}
