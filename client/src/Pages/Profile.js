import React, { useState, useEffect, useContext } from 'react';
import Header from '../Components/Header';
import ProjectBox from '../Components/ProjectBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import { GlobalContext } from '../App';

function Profile() {
	const [name, setName] = useState('');
	const [myProject, setMyProject] = useState([]);
	const [projectBidFor, setProjectBidFor] = useState([]);
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [tokens, setTokens] = useState(0);
	const [isValidator, setIsValidator] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const saveProposedProjects = (idOfUser) => {
		setLoading(true);
		const options = {
			method: 'GET',
			url: `http://localhost:2000/projectProposedBy/${idOfUser}`,
			headers: {
				'content-type': 'application/json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				console.log(response.data);
				setMyProject(response.data.data);
				// sessionStorage.setItem(
				// 	'projectProposed',
				// 	JSON.stringify(response.data.data)
				// );
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
				setLoading(false);
			});
	};
	const saveBidProjects = (idOfUser) => {
		setLoading(true);
		const options = {
			method: 'GET',
			url: `http://localhost:2000/projectBidBy/${idOfUser}`,
			headers: {
				'content-type': 'application/json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				console.log(response.data);
				setProjectBidFor(response.data.data);
				// sessionStorage.setItem(
				// 	'projectBid',
				// 	JSON.stringify(response.data.data)
				// );
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
				setLoading(false);
			});
	};
	const getUser = () => {
		setLoading(true);
		const options = {
			method: 'GET',
			url: `http://localhost:2000/partyById/${sessionStorage.getItem(
				'id'
			)}`,
			headers: {
				'content-type': 'application/json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				const user = response.data.data;
				setIsAnonymous(user.isAnonymous);
				setName(user.name);
				setTokens(user.tokens);
				setIsValidator(user.isValidator);
				saveProposedProjects(user._id);
				saveBidProjects(user._id);
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
				setLoading(false);
			});
	};
	useEffect(() => {
		const isLoggedIn = sessionStorage.getItem('isLoggedIn');
		if (!(isLoggedIn == 'true')) {
			navigate('/');
		} else {
			// console.log('User is logged in <--- from profile page');
		}
		getUser();
	}, []);
	// /party/delete/:id
	const handleDelete = () => {
		setLoading(true);
		const options = {
			method: 'DELETE',
			url: `http://localhost:2000/party/delete/${sessionStorage.getItem(
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
				sessionStorage.clear();
				sessionStorage.setItem('isLoggedIn', false);
				window.alert('Your account has been deleted successfully');
				navigate('/');
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error.response.data.message);
				setLoading(false);
			});
	};

	const handleAnonymity = () => {
		setLoading(true);
		setIsAnonymous((prevVal) => !prevVal);
		const options = {
			method: 'PUT',
			url: `http://localhost:2000/updateAnonymity/${sessionStorage.getItem(
				'id'
			)}`,
			headers: {
				'content-type': 'application/json',
			},
			data: {
				isAnonymous: !isAnonymous,
			},
		};

		axios
			.request(options)
			.then((response) => {
				console.log(response.data);
				sessionStorage.setItem(
					'user',
					JSON.stringify(response.data.party)
				);
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
				setLoading(false);
			});
	};

	const customStyle = {
		profileContainer: {
			// display: 'flex',
			// justifyContent: 'center',
			// textAlign: 'center',
			padding: '80px 40px 20px 50px',
			width: '100%',
		},
		partyName: {
			textDecoration: 'underline',
			fontSize: '40px',
			marginBottom: '45px',
			// marginBottom: '30px',
			color: '#46B6A6',
			// fontSize: '16px',
		},
		tokens: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		isValidator: {
			marginBottom: '30px',
			fontSize: '16px',
		},
		projectHeading: {
			marginBottom: '30px',
			fontWeight: '600',
		},
		myProjectsContainer: {
			display: 'flex',
			justifyContent: 'flex-start',
			marginBottom: '60px',
			flexWrap: 'wrap',
		},
		projectBidContainer: {
			display: 'flex',
			justifyContent: 'flex-start',
			flexWrap: 'wrap',
			// marginBottom: '40px',
		},
	};
	return (
		<React.Fragment>
			{loading ? (
				<Spinner />
			) : (
				<>
					<Header c="#d9d9d9" />
					<div style={customStyle.profileContainer}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<div style={customStyle.partyName}>
								{isAnonymous ? 'Anonymous' : name}
							</div>

							<div>
								<label
									onClick={handleAnonymity}
									style={{
										marginRight: '15px',
										marginBottom: '20px',
										padding: '10px',
										borderRadius: '4px',
										display: 'inline-block',
										cursor: 'pointer',
										background: '#2f7cc4',
										color: 'white',
									}}
								>
									{isAnonymous
										? 'Click to show your profile'
										: 'Click here to be anonymous?'}
								</label>
								<span
									style={{
										// marginRight: '15px',
										color: 'white',
										marginTop: '20px',
										padding: '10px',
										borderRadius: '4px',
										display: 'inline-block',
										cursor: 'pointer',
										background: '#f54a3b',
									}}
									onClick={handleDelete}
								>
									Delete Profile
								</span>
							</div>
						</div>

						<div style={customStyle.tokens}>Tokens : {tokens}</div>
						<div style={customStyle.isValidator}>
							Is a Validator? :{' '}
							{isValidator ? (
								<span style={{ color: 'green' }}>Yes</span>
							) : (
								<span style={{ color: 'red' }}>No</span>
							)}
						</div>
						<div style={customStyle.projectHeading}>
							My Projects
						</div>
						<div style={customStyle.myProjectsContainer}>
							{myProject.length > 0 &&
								myProject.map((project) => {
									return (
										<ProjectBox
											key={project._id}
											id={project._id}
											isAnonymous={
												project.proposedBy.isAnonymous
											}
											name={project.name}
											isValidated={project.isValidated}
											isIssued={project.isIssued}
											partyName={project.proposedBy.name}
											numOfBid={project.numOfBid}
											implementationDone={
												project.implementationDone
											}
										/>
									);
								})}
							{!loading && myProject.length == 0 ? (
								<h3
									style={{
										textAlign: 'center',
										color: 'red',
										fontWeight: '600',
									}}
								>
									You haven't Proposed any project yet
								</h3>
							) : (
								<></>
							)}
						</div>

						<div style={customStyle.projectHeading}>
							Projects Bid For
						</div>
						<div style={customStyle.projectBidContainer}>
							{projectBidFor.length > 0 &&
								projectBidFor.map((project) => {
									return (
										<ProjectBox
											key={project._id}
											id={project._id}
											name={project.name}
											isValidated={project.isValidated}
											isIssued={project.isIssued}
											partyName={project.proposedBy.name}
											implementationDone={
												project.implementationDone
											}
										/>
									);
								})}
							{!loading && projectBidFor.length == 0 ? (
								<h3
									style={{
										textAlign: 'center',
										color: 'red',
										fontWeight: '600',
									}}
								>
									You haven't Bid for any project yet
								</h3>
							) : (
								<></>
							)}
						</div>
					</div>
				</>
			)}
		</React.Fragment>
	);
}

export default Profile;
