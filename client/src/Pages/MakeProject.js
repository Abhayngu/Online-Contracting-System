import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import MakeProjectBox from '../Components/MakeProjectBox';
import axios from 'axios';
// projectName, tokens, proposedByName, proposedByIsAnonymous, expectedFinishTime
export default function MakeProject() {
	const [projects, setProjects] = useState([
		{
			name: 'Project 1',
			expectedTokens: 123,
			proposedBy: 'sdafdsf',
			proposedBy: {
				isAnonymous: false,
			},
			expectedFinishTime: new Date(),
			milestonesAchieved: 0,
		},
		{
			name: 'Project 2',
			expectedTokens: 420,
			proposedBy: 'sdgsdagasdgsdg',
			proposedBy: {
				isAnonymous: true,
			},
			expectedFinishTime: new Date(),
			milestonesAchieved: 1,
		},
		{
			name: 'Project 3',
			expectedTokens: 265,
			proposedBy: 'gagd',
			proposedBy: {
				isAnonymous: false,
			},
			expectedFinishTime: new Date(),
			milestonesAchieved: 2,
		},
		{
			name: 'Project 4',
			expectedTokens: 290,
			proposedBy: 'dsfa',
			proposedBy: {
				isAnonymous: false,
			},
			expectedFinishTime: new Date(),
			milestonesAchieved: 3,
		},
		{
			name: 'Project 5',
			expectedTokens: 232,
			proposedBy: 'fdhahf',
			proposedBy: {
				isAnonymous: false,
			},
			expectedFinishTime: new Date(),
			milestonesAchieved: 4,
		},
	]);
	useEffect(() => {
		// getProjectsWon();
	}, []);

	const getProjectsWon = () => {
		const options = {
			method: 'GET',
			url: `http://localhost:2000/projectsWon`,
			headers: {
				'content-type': 'application/json',
			},
			data: {
				partyId: sessionStorage.getItem('id'),
			},
		};

		axios
			.request(options)
			.then((response) => {
				console.log(response.data);
				setProjects(response.data.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

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
							id={project._id}
							name={project.name}
							tokens={project.expectedTokens}
							proposedBy={project.proposedBy.name}
							isAnonymous={project.proposedBy.isAnonymous}
							finishTime={project.expectedFinishTime}
							mileStonesDone={project.milestonesAchieved}
						/>
					);
				})}
			</div>
		</React.Fragment>
	);
}
