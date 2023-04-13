import React, { useState, useEffect } from 'react';
import Validation from '../Components/ValidationBox';
import ValidationBox from '../Components/ValidationBox';
import Header from '../Components/Header';
import axios from 'axios';

export default function Validate() {
	const [projects, setProjects] = useState([]);
	const getAllTheProjectsToValidate = () => {
		const options = {
			method: 'GET',
			url: `http://localhost:2000/projectsNotValidated/${sessionStorage.getItem(
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
				setProjects(response.data.data);
			})
			.catch(function (error) {
				console.error(error.msg);
				// setLoading(false);
			});
	};
	useEffect(() => {
		getAllTheProjectsToValidate();
	}, []);
	const customStyle = {
		projectsContainer: {
			display: 'flex',
			justifyContent: 'flex-start',
			alignItems: 'center',
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
				Validate these projects{' '}
			</h1>
			<div style={customStyle.projectsContainer}>
				{projects.map((project) => {
					return (
						<ValidationBox
							id={project._id}
							name={project.name}
							issuers_name={project.proposedBy.name}
							tokens={project.expectedTokens}
							time={project.expectedFinishTime}
							isAnonymous={project.proposedBy.isAnonymous}
						/>
					);
				})}
			</div>
		</React.Fragment>
	);
}
