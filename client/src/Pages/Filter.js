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

	// nothing, design, code, test, deploy
	// 0, 1, 2, 3, 4
	const [mileStones, setMileStones] = useState(0);
	const [mileDict, setMileDict] = useState({
		nothing: 0,
		design: 1,
		code: 2,
		test: 3,
		deploy: 4,
	});

	// Name of the party
	const [nameOfParty, setNameOfParty] = useState('');

	// Not Validated, Validated, Bidding Going On, Issued
	const [status, setStatus] = useState('');

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
		setFilteredProjects(filteredProjects);
		if (nameOfParty != '') {
			newFilteredProjects = filteredProjects.filter((project) => {
				return project.proposedBy.name
					.toLowerCase()
					.includes(nameOfParty);
			});
		}
		setFilteredProjects(newFilteredProjects);
		setStatus(status.trim);
		if (status != '') {
			if (status == 'Not Validated') {
				newFilteredProjects = filteredProjects.filter((project) => {
					return project.isValidated == false;
				});
			} else if (status == 'Validated') {
				newFilteredProjects = filteredProjects.filter((project) => {
					return project.isValidated == true;
				});
			} else if (status == 'Issued') {
				newFilteredProjects = filteredProjects.filter((project) => {
					return project.isIssued == true;
				});
			} else {
				newFilteredProjects = filteredProjects.filter((project) => {
					return (
						project.isIssued == false && project.isValidated == true
					);
				});
			}
		}
		setFilteredProjects(newFilteredProjects);
		if (mileStones > 0) {
			newFilteredProjects = filteredProjects.filter((project) => {
				return project.milestonesAchieved >= mileStones;
			});
		}
		setFilteredProjects(newFilteredProjects);
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
				setFilteredProjects(projects);
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
