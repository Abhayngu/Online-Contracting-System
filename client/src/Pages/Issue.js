import React, { useState, useEffect } from 'react';
import ProjectIssueBox from '../Components/ProjectIssueBox';
import Header from '../Components/Header';

export default function Issue() {
	const [projects, setProjects] = useState([
		{ name: 'Project 1', tokens: 12, desc: 'sdafdsf' },
		{ name: 'Project 2', tokens: 42, desc: 'sdgsdagasdgsdg' },
		{ name: 'Project 3', tokens: 2, desc: 'asdfkjsafd sd;afkds f' },
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
				Your Projects which are Validated but yet to be Issued{' '}
			</h1>
			<div style={customStyle.projectsContainer}>
				{projects.map((project) => {
					return (
						<ProjectIssueBox
							name={project.name}
							tokens={project.tokens}
							desc={project.desc}
						/>
					);
				})}
			</div>
		</React.Fragment>
	);
}
