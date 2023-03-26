import React, { useState } from 'react';
import '../styles/styles.css';
import { RiArrowDropDownFill } from 'react-icons/ri';

function Header() {
	const [display, setDisplay] = useState('hide-it');

	const customStyle = {
		headerContainer: {},
		header: {
			display: 'flex',
			justifyContent: 'space-between',
			// marginBottom: '52px',
			width: '100%',
			alignItems: 'center',
			height: '60px',
		},
		logo: {
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

	const visibleOptions = () => {
		if (display == 'hide-it') {
			setDisplay('');
		} else {
			setDisplay('hide-it');
		}
	};

	return (
		<React.Fragment>
			<div style={customStyle.headerContainer}>
				<div style={customStyle.header}>
					<div style={customStyle.logo}>Contracting System</div>
					<div style={customStyle.headerIconContainer}>
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
						<div
							style={{
								...customStyle.Register,
								...customStyle.icons,
							}}
						>
							Register
						</div>
						<div
							style={{
								...customStyle.SignIn,
								...customStyle.icons,
							}}
						>
							Sign In
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Header;
