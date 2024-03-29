import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../App';
function ProjectBox({
	id,
	name,
	isValidated,
	isIssued,
	partyName,
	partyId,
	partyWonBid,
	canRate,
	rating,
	numOfBid,
	isAnonymous,
	implementationDone,
	forBid,
}) {
	// console.log(id);\
	// console.log(id, name, isValidated, isIssued, partyName, canRate, rating);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [proId, setProId] = useState(id);
	const [projectRating, setProjectRating] = useState(rating);
	const [projectName, setProjectName] = useState(name);
	const [projectStatus, setProjectStatus] = useState('');
	const [message, setMessage] = useState('');
	const [proposedBy, setProposedBy] = useState(partyName);
	const val = useContext(GlobalContext);
	useEffect(() => {
		if (implementationDone == true) {
			setProjectStatus('Implemented');
		} else if (isIssued == true) {
			if (numOfBid == 0) {
				setProjectStatus('No Bid');
			} else {
				setProjectStatus('Issued');
			}
		} else if (isValidated == true) {
			setProjectStatus('Validated');
		} else {
			setProjectStatus('Not Validated Yet');
		}
	}, []);
	function handleProjectClick() {
		navigate(`/project?id=${proId}`);
	}
	const handleRating = (e) => {
		setProjectRating(e.target.value);
	};
	const rateProject = () => {
		setLoading(true);
		const options = {
			method: 'PUT',
			url: `http://localhost:2000/project/updateRating`,
			headers: {
				'content-type': 'application/json',
			},
			data: {
				projectId: proId,
				projectProposingParty: partyId,
				projectImplementingParty: partyWonBid,
				rating: projectRating,
			},
		};

		axios
			.request(options)
			.then((response) => {
				console.log(response.data);
				setLoading(false);
			})
			.catch(function (error) {
				console.error(error);
				setLoading(false);
			});
	};
	const stopBidding = async () => {
		// if (true) {
		// 	setMessage('Bidding Can not be stopped now');
		// }
		setLoading(true);
		try {
			const userAddress = JSON.parse(
				sessionStorage.getItem('user')
			).walletAddress;
			// const tokenAmount = val.web3_.utils.toBN(token.toString());
			// console.log("toekns",token);
			console.log(userAddress);
			const amount = await val.contract_.methods.getLowestBid(id).call({
				from: userAddress,
			});
			console.log('amount ', amount);
			const wt = await val.contract_.methods.endAuction(id).send({
				from: userAddress,
				value: val.web3_.utils.toWei(amount, 'wei'),
				// value : tokenAmount
			});
			console.log('Wallet Address After Bidding', wt, typeof wt);
			// setMessage(wt.from);
			// setLoading(false);
			// return ;
		} catch (error) {
			const x = error.message.indexOf('reason');
			const temp = error.message.substring(x, error.message.length);
			const fb = temp.indexOf('}');
			const error_message = temp.substring(8, fb);
			// setError(true);
			console.log(error);
			setMessage(error_message);
			setLoading(false);
			return;
		}
	};
	const customStyle = {
		projectBox: {
			backgroundColor: '#A9EDC4',
			width: '225px',
			// height: '225px',
			overflow: 'hidden',
			padding: '10px',
			textAlign: 'center',
			borderRadius: '20px',
			paddingTop: '30px',
			marginRight: '20px',
			marginBottom: '20px',
		},
		projectFlex: {
			marginTop: '20px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-end',
			alignItems: 'center',
		},
		projectId: {},
		projectName: {
			selfAlign: 'flex-start',
			cursor: 'pointer',
			fontSize: '16px',
			fontWeight: '600',
		},
		projectStatus: {
			marginBottom: '10px',
		},
		projectProposedBy: {
			marginBottom: '10px',
		},
		rating: {
			width: '40px',
			height: '30px',
			padding: '2px',
		},
	};
	return (
		<React.Fragment>
			<div style={customStyle.projectBox}>
				<div
					onClick={handleProjectClick}
					style={customStyle.projectName}
				>
					{projectName}
				</div>
				<div style={customStyle.projectFlex}>
					<div style={customStyle.projectStatus}>
						<span style={{ color: 'red' }}>Status</span> :{' '}
						{projectStatus}
					</div>
					<div style={customStyle.projectProposedBy}>
						<span style={{ color: 'blue' }}>Proposed By</span> :{' '}
						{isAnonymous ? 'Anonymous' : proposedBy}
					</div>
					<div>
						{!forBid && isValidated && !isIssued ? (
							<div
								onClick={stopBidding}
								style={{
									// marginRight: '15px',
									color: 'white',
									marginTop: '20px',
									padding: '10px',
									borderRadius: '4px',
									display: 'inline-block',
									cursor: 'pointer',
									background: '#f54a3b',
								}}
							>
								Stop Bidding
							</div>
						) : (
							<></>
						)}
					</div>

					<div
						style={{
							marginTop: '5px',
							fontSize: '12px',
							color: 'red',
						}}
					>
						{message}
					</div>
					<div>
						{isIssued && numOfBid == 0 ? (
							<div style={{ color: 'red', fontSize: '14px' }}>
								{' '}
								No Bid Happened in this project!{' '}
							</div>
						) : (
							<></>
						)}
					</div>
					<div>
						{canRate ? (
							<>
								<span>Rating</span> :{' '}
								<input
									value={projectRating}
									onChange={handleRating}
									style={customStyle.rating}
									type="number"
								/>
								<div
									style={{
										display: 'block',
										marginTop: '2px',
										background: 'rgb(216 92 88)',
										color: 'white',
										marginTop: '10px',
										borderRadius: '5px',
										cursor: 'pointer',
									}}
									onClick={rateProject}
								>
									Rate
								</div>
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ProjectBox;
