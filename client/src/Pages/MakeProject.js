import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import MakeProjectBox from '../Components/MakeProjectBox';
// projectName, tokens, proposedByName, proposedByIsAnonymous, expectedFinishTime
export default function MakeProject() {
	const [projects, setProjects] = useState([
		{
			name: 'Project 1',
			tokens: 123,
			proposedBy: 'sdafdsf',
			proposedByIsAnonymous: true,
			expectedFinishTime: new Date(),
		},
		{
			name: 'Project 2',
			tokens: 420,
			proposedBy: 'sdgsdagasdgsdg',
			proposedByIsAnonymous: false,
			expectedFinishTime: new Date(),
		},
		{
			name: 'Project 3',
			tokens: 265,
			proposedBy: 'gagd',
			proposedByIsAnonymous: false,
			expectedFinishTime: new Date(),
		},
		{
			name: 'Project 4',
			tokens: 290,
			proposedBy: 'dsfa',
			proposedByIsAnonymous: false,
			expectedFinishTime: new Date(),
		},
		{
			name: 'Project 5',
			tokens: 232,
			proposedBy: 'fdhahf',
			proposedByIsAnonymous: false,
			expectedFinishTime: new Date(),
		},
	]);
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
			<h1 style={customStyle.issuedHeadingStyle}>
				Projects You are currently working on
			</h1>
			<div style={customStyle.projectsContainer}>
				{projects.map((project) => {
					return (
						<MakeProjectBox
							id={project.id}
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
