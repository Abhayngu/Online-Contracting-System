import React from 'react';
import { useNavigate } from 'react-router-dom';
function TopProject({ id, name, desc, tokens }) {
	const customStyle = {
		topProjectContainer: {
			width: '18%',
			borderRadius: '8px',
			height: '200px',
			background: '#fff',
			position: 'relative',
			padding: '12px',
			paddingTop: '12px',
			// cursor: 'pointer',
		},
		topProjectId: {
			textAlign: 'center',
			marginBottom: '15px',
			marginTop: '15px',
		},
		topProjectName: {
			textAlign: 'center',
			marginBottom: '15px',
			// marginTop: '15px',
		},
		topProjectDesc: {
			textAlign: 'center',
			marginBottom: '15px',
		},
		topProjectTokens: {
			textAlign: 'center',
			marginBottom: '15px',
		},
		topProjectLink: {
			position: 'absolute',
			fontSize: '12px',
			bottom: '5px',
			right: '5px',
			textAlign: 'center',
			cursor: 'pointer',
		},
	};
	const navigate = useNavigate();
	return (
		<React.Fragment>
			<div style={customStyle.topProjectContainer}>
				<div style={customStyle.topProjectName}>Name : {name}</div>
				<div style={customStyle.topProjectDesc}>Desc : {desc}</div>
				<div style={customStyle.topProjectTokens}>
					Tokens : {tokens}
				</div>
				<div
					onClick={(e) => {
						navigate(`/project?id=${id}`);
					}}
					style={customStyle.topProjectLink}
				>
					Click to know more..
				</div>
			</div>
		</React.Fragment>
	);
}

export default TopProject;
