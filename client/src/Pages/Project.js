import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
function Project() {
	const navigate = useNavigate();
	const queryParameters = new URLSearchParams(window.location.search);
	const projectId = queryParameters.get('id');
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [id, setId] = useState(projectId);
	const [proposedBy, setProposedBy] = useState('');
	const [bidWonBy, setBidWonBy] = useState('');
	const [winningBidPrice, setWinningBidPrice] = useState('');
	const [projectName, setProjectName] = useState('');
	const [description, setDescription] = useState('');
	const [tokens, setTokens] = useState('');
	const [completionDate, setCompletionDate] = useState('');
	const [biddingCompletionDate, setBiddingCompletionDate] = useState('');
	const [error, setError] = useState(false);
	const [message, setMessage] = useState('');
	const [isUpdate, setIsUpdate] = useState(false);
	const [project, setProject] = useState({});
	const [projectStatus, setProjectStatus] = useState('');
	const [projectMilstones, setProjectMilstones] = useState('');
	const updateContractDetails = () => {
		navigate(`/updateContract?id=${projectId}`);
		setProjectName(project.name);
		setTokens(project.expectedTokens);
		setCompletionDate(project.completionDate);
		setDescription(project.description);
		setIsUpdate(true);
	};

	const getProjectById = () => {
		setLoading(true);
		const options = {
			method: 'GET',
			url: `http://localhost:2000/byId/${id}`,
			headers: {
				'content-type': 'application/json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				// console.log(response.data);
				setProject(response.data.data);
				const project = response.data.data;
				console.log(project);
				setName(project.name);
				// getUserNameById(project.proposedBy);
				if (!(project.isIssued == true)) {
					setBidWonBy('Bidding Not Over Yet');
					setWinningBidPrice('None');
				} else {
					if (project.numOfBid == 0) {
						setBidWonBy('No bid happened in this project');
						setWinningBidPrice(0);
					} else {
						setBidWonBy(project.wonBy.name);
						setWinningBidPrice(project.wonBy.token);
					}
				}
				if (project.implementationDone == true) {
					setProjectStatus('Implemented');
				} else if (project.isIssued == true) {
					if (project.numOfBid == 0) {
						setProjectStatus('No Bid');
					} else {
						setProjectStatus('Issued');
					}
				} else if (project.isValidated == true) {
					setProjectStatus('Validated');
				} else {
					setProjectStatus('Not Validated');
				}
				setProjectMilstones(project.milestonesAchieved);
				setProposedBy(project.proposedBy.name);
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
				setLoading(false);
			});
	};
	const handleUpdate = () => {
		if (tokens <= 1000) {
			setError(true);
			setMessage('At least 1000 tokens');
			navigate(`/project?id=${projectId}`);
		} else if ((description = '')) {
			setError(true);
			setMessage('Enter description');
			navigate(`/project?id=${projectId}`);
		} else {
			setError(false);
			const options = {
				method: 'PUT',
				url: `http://localhost:2000/project/updateProject`,
				headers: {
					'content-type': 'application/json',
				},
				data: {
					projectId,
					tokens,
					description,
				},
			};
			axios
				.request(options)
				.then((response) => {
					console.log(response.data);
					window.alert('Project Updated');
					navigate(`/project?id=${projectId}`);
				})
				.catch((err) => {
					console.log(err.response.data.msg);
					console.log(projectId);
					// window.alert('Project did not update due to some error');
					// navigate(`/project?id=${projectId}`);
				});
		}
	};
	useEffect(() => {
		getProjectById();
	}, []);
	const handle_Project_Name = (e) => {
		setProjectName(e.target.value);
	};

	// Handling the password change
	const handle_description = (e) => {
		setDescription(e.target.value);
	};
	const handle_tokens = (e) => {
		setTokens(e.target.value);
	};
	const handle_Completion_Date = (e) => {
		setCompletionDate(e.target.value);
	};
	const handle_Bidding_Completion_Date = (e) => {
		setBiddingCompletionDate(e.target.value);
	};
	const customStyle = {
		projectContainer: {
			// display: 'flex',
			// justifyContent: 'center',
			textAlign: 'center',
			margin: '80px auto 20px auto',
		},
		projectName: {
			textDecoration: 'underline',
			fontSize: '40px',
			marginBottom: '45px',
			// marginBottom: '30px',
			color: '#46B6A6',
			// fontSize: '16px',
		},
		projectId: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		proposedBy: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		bidBy: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		bidWonBy: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		winningBid: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		projectStatus: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		projectMilestone: {
			marginBottom: '30px',
			fontSize: '16px',
		},
	};
	return (
		<React.Fragment>
			<>
				{loading ? (
					<Spinner />
				) : (
					<>
						<Header c="#d9d9d9" />
						<div style={customStyle.projectContainer}>
							<div style={customStyle.projectName}>{name}</div>
							<div style={customStyle.projectId}>
								Id of the project : {id}
							</div>
							<div style={customStyle.proposedBy}>
								Proposed by Party : {proposedBy}
							</div>
							<div style={customStyle.bidWonBy}>
								Bidding Won By : {bidWonBy}
							</div>
							<div style={customStyle.winningBid}>
								Price of winning bid : {winningBidPrice}
							</div>
							<div style={customStyle.projectStatus}>
								Status of the project : {projectStatus}
							</div>
							<div style={customStyle.projectMilestone}>
								Milestones achieved in the project :{' '}
								{projectMilstones}
							</div>
							<div>
								{!project.isValidated && !project.isIssued ? (
									<div
										onClick={updateContractDetails}
										style={{
											// marginRight: '15px',
											color: 'white',
											marginTop: '20px',
											padding: '10px',
											borderRadius: '4px',
											display: 'inline-block',
											cursor: 'pointer',
											background: '#256ab3',
										}}
									>
										Update Contract
									</div>
								) : (
									<></>
								)}
							</div>
						</div>
					</>
				)}
			</>
		</React.Fragment>
	);
}

export default Project;
