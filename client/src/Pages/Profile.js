import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';

function Profile() {
	const queryParameters = new URLSearchParams(window.location.search);
	const partyId = queryParameters.get('id');
	const [id, setId] = useState(partyId);
	const [name, setName] = useState('Party 123');
	const [projectBidFor, setProjectBidFor] = useState([
		'decoration system',
		'roadways',
	]);
	const [myProject, setMyProject] = useState(['mypro1', 'mypro2']);
	const [tokens, setTokens] = useState(30);
	const [isValidator, setIsValidator] = useState(false);

	const customStyle = {};
	return (
		<React.Fragment>
			<Header c="#d9d9d9" />
			<div style={customStyle.projectContainer}>
				<div style={customStyle.party}>{name}</div>
				<div style={customStyle.projectId}>Tokens : {tokens}</div>
				<div style={customStyle.proposedBy}>
					Is a Validator? : {isValidator}
				</div>
				<div style={customStyle.bidWonBy}>
					My Projects
					{myProject.map((project) => {
						return <div style={customStyle.specificProject}></div>;
					})}
				</div>
			</div>
		</React.Fragment>
	);
}

export default Profile;
