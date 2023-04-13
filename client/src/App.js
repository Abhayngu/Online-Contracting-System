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
import Issue from './Pages/Issue';
import ValidateProject from './Pages/ValidateProject';
import BidProject from './Pages/BidProject';
import MakeProject from './Pages/MakeProject';
import MyComponent from './Pages/Demo';

function App() {
	return (
		<BrowserRouter>
			<Routes> 
				<Route path="/" element={<Home />} />
				<Route path="/test" element={<MyComponent />} />
				<Route path="/project" element={<Project />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/validation" element={<Validation />} />

				<Route path="/bidproject" element={<BidProject />} />
				<Route path="/validateProject" element={<ValidateProject />} />
				<Route path="/makeProject" element={<MakeProject />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
