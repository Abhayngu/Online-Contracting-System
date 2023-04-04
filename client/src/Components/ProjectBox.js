import React, { useState, useEffect } from 'react';

function ProjectBox({ id }) {
	const [proId, setProId] = useState(34);
	const customStyle = {
		projectBox: { backgroundColor: '#fbfbfb' },
		projectId: {},
		projectName: {},
		projectStatus: {},
	};
	return (
		<React.Fragment>
			<div style={customStyle.projectBox}>
				<div style={customStyle.projectId}>Id : {id}</div>
				<div></div>
			</div>
		</React.Fragment>
	);
}

export default ProjectBox;
