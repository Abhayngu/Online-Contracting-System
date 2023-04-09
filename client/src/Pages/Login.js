import React, { useState } from 'react';
import '../styles/Login.css';
import profile from '../image/a.png';
import email from '../image/b.png';
import pass from '../image/c.png';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import { RiCollageLine } from 'react-icons/ri';
import Spinner from '../Components/Spinner';
import axios from 'axios';
function Login() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [id, setId] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const login = async () => {
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

		const response = await axios(options);
		console.log('axios response', response.data);
		const nameOfUser = response.data.user.name;
		const idOfUser = response.data.user._id;
		setUsername('');
		setPassword('');
		setId(idOfUser);
		await sessionStorage.setItem('isLoggedIn', true);
		await sessionStorage.setItem(
			'user',
			JSON.stringify(response.data.user)
		);
		await sessionStorage.setItem('id', idOfUser);
		await sessionStorage.setItem('isAdmin', response.data.user.isAdmin);
		setLoading(false);
		navigate(`/profile?id=${idOfUser}`);
	};

	const goToRegister = () => {
		navigate('/register');
	};

	const handleForgotPassword = () => {
		console.log('forgot the password');
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
									<div>
										{/* <img src={email} alt="email" className="email"/> */}
										<input
											value={username}
											onChange={(e) => {
												setUsername(e.target.value);
											}}
											valuetype="text"
											placeholder="email"
											className="input name"
										/>
									</div>
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
									<div
										onClick={handleForgotPassword}
										style={{
											textAlign: 'center',
											marginBottom: '20px',
											color: 'blue',
											cursor: 'pointer',
										}}
									>
										Forgot Password?
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
