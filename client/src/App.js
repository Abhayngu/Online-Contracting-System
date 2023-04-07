import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../src/Pages/Home';
import Login from '../src/Pages/Login';
import Register from './Pages/Register';
// import Register from './Pages/registrationForm';
import Validation from './Pages/Validation';

import Project from '../src/Pages/Project';
import Profile from '../src/Pages/Profile';
import ProjectBox from './Components/ProjectBox';
import Spinner from './Components/Spinner';
import Issue from './Pages/Issue' ;

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/test" element={<Spinner />} />
				<Route path="/project" element={<Project />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/validation" element={<Validation />} />
				<Route path="/issuer" element={<Issue />} />
				
			</Routes>
		</BrowserRouter>
	);
}

export default App;
