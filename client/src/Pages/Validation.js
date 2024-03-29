import React, {useContext,useEffect, useState } from 'react';
import Header from '../Components/Header';
import axios from 'axios';
import Spinner from '../Components/Spinner';
// import getWalletAddress from '../utils/connection';
// import contract_instance  from '../utils/getContract';
import { GlobalContext } from '../App';
// import createProject  from '../utils/CreateProject';


 function Validation() {
	// States for validation
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [projectName, setProjectName] = useState('');
	const [description, setDescription] = useState('');
	const [tokens, setTokens] = useState('');
	const [completionDate, setCompletionDate] = useState('');
	const [biddingCompletionDate, setBiddingCompletionDate] = useState('');
	// States for checking the errors
	const [error, setError] = useState(false);
	// const [contract_, setContract] = useState(null);
	const [msg, setMsg] = useState('');
	const val = useContext(GlobalContext);

	// Handling the email change
	console.log(val.contract_,val.web3_);
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
	const registerProject =  ()  => {
		// setLoading(true);
		// try{
		// 	const userAddress = JSON.parse(sessionStorage.getItem('user')).walletAddress;
		// 	await val.contract_.methods.createProject(response.data.project._id,100).send({
		// 		from: userAddress
		// 	})
		// }
		// catch{
		// 	const x = error.message.indexOf('reason')
		// 	const temp = error.message.substring(x, error.message.length)
		// 	const fb = temp.indexOf('}')
		// 	const error_message = temp.substring(8, fb);
		// 	setError(true);
		// 	setMsg(error_message);
		// 	setLoading(false);
		// 	return ;
		// }

		const options = {
			method: 'POST',
			url: `http://localhost:2000/registerProject`,
			headers: {
				'content-type': 'application/json',
			},
			data: {
				name: projectName,
				description,
				proposedBy: {
					id: sessionStorage.getItem('id'),
					name: JSON.parse(sessionStorage.getItem('user')).name,
					isAnonymous: JSON.parse(sessionStorage.getItem('user'))
						.isAnonymous,
				},
				expectedFinishTime: completionDate,
				expectedTokens: tokens,
				biddingDuration: '1hr',
			},
		};
		// console.log(options);
		axios
			.request(options)
			.then((response) => {
				console.log(response.data.project);
				console.log( response.data.party.walletAddress)
				// try{
					// createProject(response.data.party._id,100,response.data.party.walletAddress);
				val.contract_.methods.createProject(response.data.project._id,200).send({
					from: response.data.party.walletAddress
				})
					
				// console.log("response",response.data.party._id,response.data.party.walletAddress);
				// }
				// catch(error){	
				// 	console.log("Error : ",error);
				// }

				setLoading(false);
				setError(false);
				setMessage('Registered project successfully');
				setProjectName('');
				setTokens('');
				setDescription('');
				setCompletionDate('');
				setBiddingCompletionDate('');
			})
			.catch(function (error) {
				console.error(error);
				setError(true);
				setMessage(error.response.data.msg);
				setLoading(false);
			});
	};

	// Handling the form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			projectName === '' ||
			description === '' ||
			tokens === '' ||
			completionDate === '' ||
			biddingCompletionDate == ''
		) {
			setError(true);
			setMessage('Enter all fields');
		} else {

			console.log(
				projectName,
				description,
				tokens,
				completionDate,
				biddingCompletionDate
			);

			

			registerProject();
			setProjectName('');
			setTokens('');
			setDescription('');
			setCompletionDate('');
			setBiddingCompletionDate('');
		}
	};
	// const init = async () => {
	// 	const instance = await contract_instance();
	// 	console.log(instance);
	// 	setContract(instance);
	// };

	// useEffect(() => {
	// 	console.log('useeffect')
	// 	init();
	// 	console.log(contract_);
	// 	// window.location.reload()
	//   }, []);

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
								<div
									style={{
										color: error ? 'red' : 'green',
									}}
								>
									{message}
								</div>
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
								Expected Bidding Completion Date*
							</label>
							<input
								onChange={handle_Bidding_Completion_Date}
								className="input"
								value={biddingCompletionDate}
								type="datetime-local"
							/>
							<label className="label">
								Expected Project Completion Date*
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
