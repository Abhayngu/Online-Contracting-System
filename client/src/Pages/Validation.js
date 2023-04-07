import React, { useState } from 'react';
import Header from '../Components/Header';
function Validation() {
	// States for validation
	const [projectName, setProjectName] = useState('');
	const [description, setDescription] = useState('');
	const [tokens, setTokens] = useState('');
	const [completionDate, setCompletionDate] = useState('');
	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	// Handling the email change
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

	// Handling the form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			projectName === '' ||
			description === '' ||
			tokens === '' ||
			completionDate === ''
		) {
			setError(true);
		} else {
			setSubmitted(true);
			setError(false);
			setProjectName('');
			setTokens('');
			setDescription('');
			setCompletionDate('');
		}
	};

	// Showing success message
	const successMessage = () => {
		return (
			<div
				className="success"
				style={{
					display: submitted ? '' : 'none',
				}}
			>
				<h1 style={{ fontWeight: 100, fontSize: '16px' }}>
					Project successfully registered!!
				</h1>
			</div>
		);
	};

	// Showing error message if error is true
	const errorMessage = () => {
		return (
			<div
				className="error"
				style={{
					display: error ? '' : 'none',
				}}
			>
				<h1 style={{ fontWeight: 100, fontSize: '16px' }}>
					Please enter all the fields
				</h1>
			</div>
		);
	};

	return (
		<>
			<Header c="#d9d9d9" />
			<div className="form">
				<div>
					<div className="mgbtm">
						<h1 style={{ fontWeight: 600 }}>
							Register your project to get it Validated
						</h1>
					</div>

					{/* Calling to the methods */}

					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<form>
							<div className="messages">
								{errorMessage()}
								{successMessage()}
							</div>
							<label className="label">
								Name Of The Project*
							</label>
							<input
								onChange={handle_Project_Name}
								className="input"
								value={projectName}
								type="text"
							/>

							<label className="label">Expected tokens*</label>
							<input
								onChange={handle_tokens}
								className="input"
								value={tokens}
								type="number"
							/>

							<label className="label">
								Expected Completion Date*
							</label>
							<input
								onChange={handle_Completion_Date}
								className="input"
								value={completionDate}
								type="datetime-local"
							/>
							<label className="label">Description*</label>
							<textarea
								rows="6"
								cols="35"
								onChange={handle_description}
								className="input"
								value={description}
								type="text"
							/>
							<button
								onClick={handleSubmit}
								className="btn"
								type="submit"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Validation;