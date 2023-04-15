import React, { useState, useEffect } from 'react';
import Spinner from '../Components/Spinner';
import axios from 'axios';
import Header from '../Components/Header';
import ProjectBox from '../Components/ProjectBox';
function RateProject() {
	const customStyle = {
		divContainer: {
			padding: '50px',
			display: 'flex',
			justifyContent: 'flex-start',
			marginBottom: '60px',
		},
	};
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);
	const getImplementedProjects = (idOfUser) => {
		setLoading(true);
		const options = {
			method: 'GET',
			url: `http://localhost:2000/project/projectImplemented/${idOfUser}`,
			headers: {
				'content-type': 'application/json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				console.log(response.data);
				setProjects(response.data.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
				setLoading(false);
			});
	};
	useEffect(() => {
		const id = sessionStorage.getItem('id');
		getImplementedProjects(id);
	}, []);
	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<Header c="#d9d9d9" />
					<div
						style={{
							textAlign: 'center',
							marginTop: '20px',
							fontSize: '20px',
							fontWeight: '600',
							marginBottom: '50px',
						}}
					>
						Rate Your Proposed Projects
					</div>
					<div style={customStyle.divContainer}>
						{projects.length > 0 &&
							projects.map((project) => {
								return (
									<ProjectBox
										key={project._id}
										id={project._id}
										name={project.name}
										isValidated={project.isValidated}
										isIssued={project.isIssued}
										partyName={project.proposedBy.name}
										partyId={project.proposedBy.id}
										partyWonBid={project.wonBy.id}
										canRate={true}
										rating={project.rating}
										implementationDone={
											project.implementationDone
										}
									/>
								);
							})}
					</div>
				</>
			)}
		</>
	);
}
export default RateProject;
