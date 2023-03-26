import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import homepageimg from './homepage.jpg';
function Home() {
	const customStyle = {
		titleImageContainer: {
			width: '100%',
			height: '100vh',
			// backgroundImg: 'url(./homepage.jpg)',
		},
		titleImage: {
			display: 'inline-block',
			height: '100%',
			width: '100%',
			objectFit: 'cover',
			overflow: 'hidden',
		},
	};
	return (
		<React.Fragment>
			<Header />
			<div style={customStyle.titleImageContainer}>
				<img style={customStyle.titleImage} src={homepageimg}></img>
			</div>
		</React.Fragment>
	);
}
export default Home;
