import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import { RiArrowDropDownFill } from 'react-icons/ri';
import axios from 'axios';

function Header({ c }) {
	const navigate = useNavigate();
	const [display, setDisplay] = useState('hide-it');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	const [id, setId] = useState('');

	useEffect(() => {
		const loggedIn = sessionStorage.getItem('isLoggedIn');

		if (loggedIn == 'true') {
			setIsLoggedIn(true);
			setUsername(JSON.parse(sessionStorage.getItem('user')).name);
			setId(JSON.parse(sessionStorage.getItem('user'))._id);
			setIsAdmin(sessionStorage.getItem('isAdmin'));
		} else {
			// console.log('loggedin value', typeof loggedIn);
		}
		// console.log('isLoggedin value', isLoggedIn);
	}, []);

	const customStyle = {
		headerContainer: {},
		header: {
			display: 'flex',
			justifyContent: 'space-between',
			// marginBottom: '52px',
			width: '100%',
			alignItems: 'center',
			height: '60px',
			backgroundColor: c ? c : '#fff',
		},
		logo: {
			cursor: 'pointer',
			'&:hover': { display: 'none' },
			fontWeight: 'normal',
			fontSize: '24px',
			paddingLeft: '20px',
		},
		headerIconContainer: {
			display: 'flex',
			height: '100%',
			alignItems: 'center',
		},
		icons: {
			width: '150px',
			display: 'flex',
			backgroundColor: '#d9d9d9',
			height: '100%',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer',
		},
		dropdownContainer: {
			position: 'relative',
		},
		Register: {},
		SignIn: {},
		projectListContainer: {
			position: 'absolute',
			top: '0px',
			left: '0px',
			// marginLeft: '11px',
			listStyle: 'none',
			width: '150px',
			// maxHeight: '236px',
			overflow: 'auto',
		},
		listContainer: {
			cursor: 'pointer',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '60px',
		},
		dropdownTrigger: {
			display: 'none',
		},
	};

	const navigateToHome = () => {
		navigate('/');
	};

	const goToRegisterPage = () => {
		navigate('/register');
	};

	const goToLoginPage = () => {
		navigate('/login');
	};

	const goToProfilePage = () => {
		navigate(`/profile?id=${id}`);
	};

	const visibleOptions = () => {
		if (display == 'hide-it') {
			setDisplay('');
		} else {
			setDisplay('hide-it');
		}
	};

	const handleLogout = () => {
		// sessionStorage.setItem('isLoggedIn', false);
		sessionStorage.clear();
		setIsLoggedIn(false);
		navigate('/');
	};

	const changeValidators = () => {
		// setLoading(true);
		const options = {
			method: 'GET',
			url: `http://localhost:2000/changeValidators`,
			headers: {
				'content-type': 'application/json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
				// setLoading(false);
			});
	};

	return (
		<React.Fragment>
			<div style={customStyle.headerContainer}>
				<div style={customStyle.header}>
					<div onClick={navigateToHome} style={customStyle.logo}>
						Contracting System
					</div>
					<div style={customStyle.headerIconContainer}>
						{isAdmin == 'true' ? (
							<div
								onClick={changeValidators}
								style={{
									...customStyle.Register,
									...customStyle.icons,
								}}
							>
								Change Validators
							</div>
						) : (
							<></>
						)}
						<div
							style={{
								...customStyle.dropdownContainer,
								...customStyle.icons,
							}}
						>
							<ul
								className="no-scrollbar"
								style={customStyle.projectListContainer}
							>
								<div style={customStyle.listContainer}>
									<div className="flex-vc">
										<span>Projects</span>
										<span onClick={visibleOptions}>
											<RiArrowDropDownFill />
										</span>
									</div>
								</div>
								<div className={display}>
									<div
										className="shadow"
										style={customStyle.listContainer}
									>
										<li data-value="value 1">Option 1</li>
									</div>
									<div
										className="shadow"
										style={customStyle.listContainer}
									>
										<li data-value="value 2">Option 2</li>
									</div>
									<div
										className="shadow"
										style={customStyle.listContainer}
									>
										<li data-value="value 3">Option 3</li>
									</div>
								</div>
							</ul>
						</div>
						{isLoggedIn == false ? (
							<div
								onClick={goToRegisterPage}
								style={{
									...customStyle.Register,
									...customStyle.icons,
								}}
							>
								Register
							</div>
						) : (
							<div
								onClick={handleLogout}
								style={{
									...customStyle.Register,
									...customStyle.icons,
								}}
							>
								Logout
							</div>
						)}

						{isLoggedIn == true ? (
							<div
								style={{
									...customStyle.SignIn,
									...customStyle.icons,
								}}
								onClick={goToProfilePage}
							>
								{username}
							</div>
						) : (
							<div
								onClick={goToLoginPage}
								style={{
									...customStyle.SignIn,
									...customStyle.icons,
								}}
							>
								Sign In
							</div>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Header;
