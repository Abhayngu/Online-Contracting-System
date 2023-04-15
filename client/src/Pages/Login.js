import React, { useState, useContext } from 'react';
import '../styles/Login.css';
import profile from '../image/a.png';
import email from '../image/b.png';
import pass from '../image/c.png';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import getWalletAddress from '../utils/connection';
import { RiCollageLine } from 'react-icons/ri';
import { GlobalContext } from '../App';
import Spinner from '../Components/Spinner';

import axios from 'axios';
function Login() {
	const navigate = useNavigate();
	const contextVal = useContext(GlobalContext);
	console.log(contextVal);
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const [message, setMessage] = useState('');
	const [id, setId] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	const [walletAddress, setWalletAddress] = useState('');
	const [isWalletAddressSame, setIsWalletAddressSame] = useState(true);

	//  val.updateContract("string");
	// console.log(val)

	const isWalletAddressValid = async (idOfUser) => {
		const address = await getWalletAddress();
		setWalletAddress(address);
		const options = {
			method: 'GET',
			url: `http://localhost:2000/party/getWalletAddress/${idOfUser}`,
			headers: {
				'content-type': 'application/json',
			},
		};
		axios
			.request(options)
			.then((response) => {
				console.log(response.data);
				console.log(address);
				if (response.data.walletAddress == address) {
					setIsWalletAddressSame(true);
				} else {
					setIsWalletAddressSame(false);
				}
			})
			.catch((err) => {
				setError(true);
				setMessage(err.response.data.msg);
				console.error(err);
			});
	};
	const login = () => {
		if (username == '' || password == '') {
			setError(true);
			setMessage('Enter all the fields');
			return;
		}
		setLoading(true);
		const options = {
			method: 'POST',
			url: 'http://localhost:2000/login',
			headers: {
				'content-type': 'application/json',
			},
			data: {
				email: username,
				password: password,
			},
		};

		axios
			.request(options)
			.then((response) => {
				const idOfUser = response.data.user._id;
				// let x = isWalletAddressValid(idOfUser);
				// console.log(isWalletAddressSame);
				// if (x) {
				setUsername('');
				setPassword('');
				setId(idOfUser);
				sessionStorage.setItem('isLoggedIn', true);
				sessionStorage.setItem(
					'user',
					JSON.stringify(response.data.user)
				);
				sessionStorage.setItem('id', idOfUser);
				sessionStorage.setItem('isAdmin', response.data.user.isAdmin);
				sessionStorage.setItem(
					'isValidator',
					response.data.user.isValidator
				);
				navigate(`/profile?id=${idOfUser}`);
				// } else {
				// 	setError(true);
				// 	setMessage(
				// 		'Wallet address of current user in metamask and platform is different'
				// 	);
				// }
				setLoading(false);
			})
			.catch((error) => {
				console.log(error.message);
				setError(true);
				setMessage(error.response.data.message);
				setLoading(false);
			});
	};

	const goToRegister = () => {
		navigate('/register');
	};

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<Header c="#d9d9d9" />
					<div className="main">
						<div className="sub-main">
							<div>
								<div className="imgs">
									<div className="container-image">
										<img
											src={profile}
											alt="profile"
											className="profile"
										/>
									</div>
								</div>
								<div>
									<h1 className="margin">Sign In</h1>
									<div
										style={{
											color: 'red',
											textAlign: 'center',
											fontSize: '14px',
											marginBottom: '10px',
										}}
									>
										{error ? message : <></>}
									</div>
									<form>
										<input
											value={username}
											onChange={(e) => {
												setUsername(e.target.value);
											}}
											valuetype="text"
											placeholder="email"
											className="input name"
										/>
										<div className="second-input">
											{/* <img src={pass} alt="pass" className="pass"/> */}
											<input
												value={password}
												onChange={(e) => {
													setPassword(e.target.value);
												}}
												type="password"
												placeholder="password"
												className="input name"
											/>
										</div>
									</form>
									<div
										onClick={goToRegister}
										style={{
											textAlign: 'center',
											marginBottom: '5px',
											marginTop: '20px',
											color: 'blue',
											cursor: 'pointer',
										}}
									>
										Don't have an account?
									</div>

									<button className="btn" onClick={login}>
										Login
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
export default Login;
