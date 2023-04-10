import React, { useState, useEffect } from 'react';
import Validation from '../Components/ValidationBox';
import ValidationBox from '../Components/ValidationBox';
import Header from '../Components/Header';
import axios from 'axios';

export default function Validate() {
	const [validation, setProjects] = useState([
		{ name: 'Project 1', tokens: 12, issuers_name: 'Abhay', time: '12' },
		{ name: 'Project 2', tokens: 42, issuers_name: 'Subhajit', time: '14' },
		{ name: 'Project 3', tokens: 2, issuers_name: 'Hrithik', time: '12' },
	]);
	const customStyle = {
		projectsContainer: {
			display: 'flex',
			justifyContent: 'space-evenly',
			flexWrap: 'wrap',
			padding: '0 40px',
			margin: '50px 0',
		},
		issuedHeadingStyle: {
			marginTop: '50px',
			textAlign: 'center',
			fontWeight: '600',
			fontSize: '24px',
		},
	};
	return (
		<React.Fragment>
			<Header c="#d9d9d9" />
			<h1 style={customStyle.issuedHeadingStyle}>
				Validate these projects{' '}
			</h1>
			<div style={customStyle.projectsContainer}>
				{validation.map((ob) => {
					return (
						<ValidationBox
							name={ob.name}
							issuers_name={ob.issuers_name}
							tokens={ob.tokens}
							time={ob.time}
						/>
					);
				})}
			</div>
		</React.Fragment>
	);
}
