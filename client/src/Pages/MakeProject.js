import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import MakeProjectBox from '../Components/MakeProjectBox';
import axios from 'axios';
import Spinner from '../Components/Spinner';
// projectName, tokens, proposedByName, proposedByIsAnonymous, expectedFinishTime
export default function MakeProject() {
	const [projectsPending, setProjectsPending] = useState([]);
	const [loading, setLoading] = useState(false);
	const [projectsWon, setProjectsWon] = useState([]);

	useEffect(() => {
		getProjectsWon();
		getProjectsToDo();
	}, []);

	const getProjectsToDo = () => {
		setLoading(true);
		const options = {
			method: 'GET',
			url: `http://localhost:2000/projectsToDo/${sessionStorage.getItem(
				'id'
			)}`,
			headers: {
				'content-type': 'application/json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				console.log(response.data);
				setProjectsPending(response.data.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
				setLoading(false);
			});
	};

	const getProjectsWon = () => {
		setLoading(true);
		const options = {
			method: 'GET',
			url: `http://localhost:2000/projectsWon/${sessionStorage.getItem(
				'id'
			)}`,
			headers: {
				'content-type': 'application/json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				console.log(response.data);
				setProjectsWon(response.data.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
				setLoading(false);
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
			{loading ? (
				<Spinner />
			) : (
				<>
					<Header c="#d9d9d9" />
					{/* <h1 style={customStyle.issuedHeadingStyle}>
						Projects Implemented
					</h1>
					<div style={customStyle.projectsContainer}>
						{projectsPending.map((project) => {
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
					</div> */}
					<h1 style={customStyle.issuedHeadingStyle}>
						Projects Pending
					</h1>
					<div style={customStyle.projectsContainer}>
						{projectsWon.map((project) => {
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
				</>
			)}
		</React.Fragment>
	);
}
