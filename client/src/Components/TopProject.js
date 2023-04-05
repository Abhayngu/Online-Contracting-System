import React, { useState, useEffect } from 'react';

function TopProject({ id, name, desc }) {
	const customStyle = {
		topProjectContainer: {
			width: '18%',
			borderRadius: '8px',
			height: '200px',
			background: '#fff',
			position: 'relative',
		},
		topProjectId: {
			textAlign: 'center',
		},
		topProjectName: {
			textAlign: 'center',
		},
		topProjectDesc: {
			textAlign: 'center',
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
	return (
		<React.Fragment>
			<div style={customStyle.topProjectContainer}>
				<div style={customStyle.topProjectId}>{id}</div>
				<div style={customStyle.topProjectName}>{name}</div>
				<div style={customStyle.topProjectDesc}>{desc}</div>
				<div style={customStyle.topProjectLink}>
					Click to know more..
				</div>
			</div>
		</React.Fragment>
	);
}

export default TopProject;
