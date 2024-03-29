import React, { useContext, useEffect, useState } from 'react';
import style from '../styles/style.css';
import axios from 'axios';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import getWalletAddress from '../utils/connection';
// import contract_instance  from '../utils/getContract';
import { GlobalContext } from '../App';

function Register() {
	// States for registration
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [tempName, setTempName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [walletAddress, setWalletAddress] = useState('');
	// const [contract_, setContract] = useState(null);

	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
	const val = useContext(GlobalContext);
	// console.log(val.contract_);

	// Handling the name change
	const handleName = (e) => {
		setName(e.target.value);
		setSubmitted(false);
	};

	const goToSignIn = () => {
		navigate('/login');
	};

	// Handling the email change
	const handleEmail = (e) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	// Handling the password change
	const handlePassword = (e) => {
		setPassword(e.target.value);
		setSubmitted(false);
	};

	// Handling the form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (name === '' || email === '' || password === '') {
			setError(true);
			setSubmitted(false);
		} else {
			try {
				const address = await getWalletAddress();
				setWalletAddress(address);
				// console.log('walletaddress', walletAddress);
				const tx = await val.contract_.methods.createParty(name).send({
					from: address,
					// value: web3.utils.toWei('1', 'ether')
				});
			} catch (error) {
				const x = error.message.indexOf('reason');
				const temp = error.message.substring(x, error.message.length);
				const fb = temp.indexOf('}');
				const error_message = temp.substring(8, fb);
				setError(true);
				// setMessage(error_message);
				// setLoading(false);
				return;
			}
			const options = {
				method: 'POST',
				url: 'http://localhost:2000/signup',
				headers: {
					'content-type': 'application/json',
				},
				data: {
					name: name,
					email: email,
					password: password,
					description: 'some kind of description',
					walletAddress: walletAddress,
				},
			};

			axios
				.request(options)
				.then((response) => {
					// Smart contract function call of createParty
					// console.log("name",walletAddress);
					// createParty(name,walletAddress);
					// console.log("contract",val.contract_);
					// const tx = val.contract_.methods.createParty(name).send({
					// 	from: walletAddress
					// 	// value: web3.utils.toWei('1', 'ether')
					// })
					// console.log(tx);

					// tx.on('transactionHash', function(hash) {
					// 	console.log('Transaction hash:', hash);
					// }).on('confirmation', function(confirmationNumber, receipt) {
					// 	console.log('Confirmation number:', confirmationNumber);
					// }).on('receipt', function(receipt) {
					// 	console.log('Transaction receipt:', receipt);
					// }).on('error', function(error) {
					// 	console.error(error);
					// });

					// console.log(response.data);
					setSubmitted(true);
					setError(false);
					setEmail('');
					setTempName(name);
					setName('');
					setPassword('');
					// sessionStorage.setItem('isLoggedIn', true);
				})
				.catch(function (error) {
					console.error(error);
					setError(true);
					setSubmitted(false);
				});
		}
	};

	useEffect(() => {
		// setContract(contract_instance());
		// console.log(contract_);
		// const init = async () => {
		// 	const instance = await contract_instance();
		// 	setContract(instance);
		// };
		// init();
		// getWalletAddress()
		//   .then(address => {
		// 	setWalletAddress(address);
		//   })
		//   .catch(error => {
		// 	console.error(`Error getting wallet address: ${error}`);
		//   });
	}, []);

	// axios
	// 		.get('http://localhost:2401/api/zomato/getCities')
	// 		.then((result) => {
	// 			this.setState({
	// 				cities: result.data.cities,
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});

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
					User {tempName} successfully registered!!
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
				<div
					style={{
						borderRadius: '60px',
						backgroundColor: 'white',
						padding: '30px 0',
						marginTop: '40px',
					}}
				>
					<div className="mgbtm">
						<h1 style={{ fontWeight: 600, textAlign: 'center' }}>
							Get Your Party Registered Here!
						</h1>
					</div>

					{/* Calling to the methods */}
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<form>
							<div className="messages">
								{errorMessage()}
								{successMessage()}
							</div>
							{/* Labels and inputs for form data */}
							<label className="label">Name*</label>
							<input
								onChange={handleName}
								className="input"
								value={name}
								type="text"
							/>

							<label className="label">Email*</label>
							<input
								onChange={handleEmail}
								className="input"
								value={email}
								type="email"
							/>

							<label className="label">Password*</label>
							<input
								onChange={handlePassword}
								className="input"
								value={password}
								type="password"
							/>
							<div
								onClick={goToSignIn}
								style={{
									textAlign: 'center',
									marginBottom: '20px',
									color: 'blue',
									cursor: 'pointer',
								}}
							>
								Already have an account?
							</div>
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

export default Register;
