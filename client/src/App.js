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
// import MyComponent from './Pages/Demo';
import { useState, createContext } from 'react';
import UpdateContract from './Pages/UpdateContract';
import RateProject from './Pages/RateProject';
import get_contract from './utils/getContract';
import getWeb3 from './utils/getWeb3';
// import { get } from 'http';

export const GlobalContext = createContext({});
function App() {
	const [contract_, setContract] = useState(null);
	const [web3_, setWeb3] = useState(null);
	const init1 = async () => {
		const instance = await get_contract();
		// const _web3 = await getWeb3();
		// console.log(instance,web);
		setContract(instance);
		// setWeb3(_web3)
	};
	init1();
	const init2 = async () => {
		// const instance = await get_contract();
		const _web3 = await getWeb3();
		// console.log(instance,web);
		// setContract(instance);
		setWeb3(_web3);
	};
	init2();
	console.log(contract_, web3_);
	//  const updateContract = (newVal) => {
	// 	setContract(newVal);
	//  }

	return (
		<GlobalContext.Provider value={{ contract_, web3_ }}>
			<BrowserRouter>
				<Routes>
					{/* <Route path="/test" element={<MyComponent />} /> */}
					<Route path="/" element={<Home />} />
					<Route path="/project" element={<Project />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/updateContract"
						element={<UpdateContract />}
					/>
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
