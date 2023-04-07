import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Components/Spinner';

export default function Filter() {
    // Spinner
	const [loading, setLoading] = useState(false);

    // Projects
	const [projects, setProjects] = useState([]);
	const [filteredProjects, setFilteredProjects] = useState([]);

    // filters
	const [mileStones, setMileStones] = useState([]);
	const [nameOfParty, setNameOfParty] = useState('');
	const [status, setStatus] = useState('Not Validated');

    
	const customStyle = {
		filterPageContainer: {
			width: '100%',
			height: '100%',
			display: 'flex',
			alignItems: 'center',
		},
		filterBoxContainer: {
			background: '#fbfbfb',
		},
		projectContainer: {},
	};

	useEffect(() => {
		getFilteredProjects();
	}, [mileStones, nameOfParty, status]);
	const getFilteredProjects = () => {
		setLoading(true);
		setNameOfParty(nameOfParty.trim);
		if (nameOfParty != '') {
			let newFilteredProjects = projects.filter((project) => {
				return project.proposedByName
					.toLowerCase()
					.includes(nameOfParty);
			});
		}
        if()
		setLoading(false);
	};
	useEffect(() => {
		getAllProjects();
	}, []);
	const getAllProj = () => {
		setLoading(true);
		const options = {
			method: 'GET',
			url: `http://localhost:2000/getAllProj`,
			headers: {
				'content-type': 'application/json',
			},
		};

		axios
			.request(options)
			.then((response) => {
				console.log(response.data);
				setProjects(response.data.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
				setLoading(false);
			});
	};
	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<div style={customStyle.filterPageContainer}>
						<div style={customStyle.filterBoxContainer}></div>
						<div style={customStyle.projectContainer}></div>
					</div>
				</>
			)}
		</>
	);
}
