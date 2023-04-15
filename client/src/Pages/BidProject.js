import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import BidBox from '../Components/BidBox';
import axios from 'axios';
import Spinner from '../Components/Spinner';
// projectName, tokens, proposedByName, proposedByIsAnonymous, expectedFinishTime
export default function BidProject() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);
	const getProjectsForBidding = () => {
		setLoading(true);
		const options = {
			method: 'GET',
			url: `http://localhost:2000/projectForBid/${sessionStorage.getItem(
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
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error.msg);
				setLoading(false);
			});
	};
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
			{loading ? (
				<Spinner />
			) : (
				<>
					<Header c="#d9d9d9" />
					<h1 style={customStyle.issuedHeadingStyle}>
						Projects to Bid for{' '}
					</h1>
					<div style={customStyle.projectsContainer}>
						{projects.length > 0 &&
							projects.map((project) => {
								return (
									<BidBox
										key={project._id}
										id={project._id}
										name={project.name}
										tokens={project.expectedTokens}
										proposedBy={project.proposedBy.name}
										isAnonymous={
											project.proposedBy.isAnonymous
										}
										finishTime={project.expectedFinishTime}
									/>
								);
							})}
						{!loading && projects.length == 0 ? (
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '50vh',
								}}
							>
								<h3
									style={{
										textAlign: 'center',
										fontSize: '30px',
										color: 'red',
									}}
								>
									No projects to Bid On!
								</h3>
							</div>
						) : (
							<></>
						)}
					</div>
				</>
			)}
		</React.Fragment>
	);
}
