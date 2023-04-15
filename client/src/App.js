import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../src/Pages/Home';
import Login from '../src/Pages/Login';
import Register from './Pages/Register';
import Validation from './Pages/Validation';
import Project from '../src/Pages/Project';
import Profile from '../src/Pages/Profile';
import ProjectBox from './Components/ProjectBox';
import Spinner from './Components/Spinner';
import Issue from './Pages/Issue';
import ValidateProject from './Pages/ValidateProject';
import BidProject from './Pages/BidProject';
import MakeProject from './Pages/MakeProject';
import RateProject from './Pages/RateProject';
import { createContext } from 'react';

export const GlobalContext = createContext({});
function App() {
	return (
		<GlobalContext.Provider value={{ somVal: false }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/test" element={<Spinner />} />
					<Route path="/project" element={<Project />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/validation" element={<Validation />} />
					<Route path="/rateProject" element={<RateProject />} />

					<Route path="/bidproject" element={<BidProject />} />
					<Route
						path="/validateProject"
						element={<ValidateProject />}
					/>
					<Route path="/makeProject" element={<MakeProject />} />
				</Routes>
			</BrowserRouter>
		</GlobalContext.Provider>
	);
}

export default App;
