import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../src/Pages/Home';
import Login from '../src/Pages/Login';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/test" element={<div>test page</div>} />
				<Route path="/login" element={<Login />}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
