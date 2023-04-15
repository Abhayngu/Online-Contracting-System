import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Project() {
	const navigate = useNavigate();
	const queryParameters = new URLSearchParams(window.location.search);
	const projectId = queryParameters.get('id');
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState(projectId);
	const [projectName, setProjectName] = useState('');
	const [description, setDescription] = useState('');
	const [tokens, setTokens] = useState('');
	const [error, setError] = useState(false);
	const [message, setMessage] = useState('');
	const [project, setProject] = useState({});

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
				setProject(response.data.data);
				const project = response.data.data;
				setProjectName(project.name);
				setTokens(project.expectedTokens);
				setDescription(project.description);
				console.log('Projecttttt', project);
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
				setLoading(false);
			});
	};
	const handleUpdate = (e) => {
		e.preventDefault();
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
				setError(false);
				window.alert('Project updated successfully');
				navigate(`/project?id=${projectId}`);
				console.log(response.data);
			})
			.catch((err) => {
				setError(true);
				setMessage(err.response.data.msg);
				console.log(err.response.data.msg);
				console.log(projectId);
			});
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

	return (
		<React.Fragment>
			<>
				<Header c="#d9d9d9" />
				<div className="form">
					<div>
						<div className="mgbtm">
							<h1 style={{ fontWeight: 600 }}>
								Update your project
							</h1>
						</div>

						{/* Calling to the methods */}

						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<form>
								<label className="label">
									Name Of The Project*
								</label>
								<input
									onChange={handle_Project_Name}
									disabled
									className="input"
									value={projectName}
									type="text"
								/>
								<label className="label">
									Expected tokens*
								</label>
								<input
									onChange={handle_tokens}
									className="input"
									value={tokens}
									type="number"
								/>
								<label className="label">Description*</label>
								<textarea
									rows="8"
									cols="45"
									onChange={handle_description}
									// className="input"
									value={description}
									type="text"
								/>
								<div
									style={{
										color: error ? 'red' : 'green',
										textAlign: 'center',
									}}
								>
									{message}
								</div>
								<button
									onClick={handleUpdate}
									className="btn"
									// type="submit"
									style={{ background: '#256ab3' }}
								>
									Update
								</button>
							</form>
						</div>
					</div>
				</div>
			</>
		</React.Fragment>
	);
}

export default Project;
