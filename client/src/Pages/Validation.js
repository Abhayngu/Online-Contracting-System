import React, {useState} from 'react';
import style from '../styles/style.css' ;
function Validation() {

// States for validation
const [Serial_Number, set_Serial_Number] = useState('');
const [Project_Name, set_Project_Name] = useState('');
const [Issuers_Name, set_Issuers_Name] = useState('');
const [tokens, set_tokens] = useState('');
const [Completion_Date, set_Completion_Date] = useState('');
// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Handling the name change
const handle_Serial_Number = (e) => {
	set_Serial_Number(e.target.value);
	setSubmitted(false);
};

// Handling the email change
const handle_Project_Name = (e) => {
	set_Project_Name(e.target.value);
	setSubmitted(false);
};

// Handling the password change
const handle_Issuers_Name = (e) => {
	set_Issuers_Name(e.target.value);
	setSubmitted(false);
};
const handle_tokens = (e) => {
	set_tokens(e.target.value);
	setSubmitted(false);
};
const handle_Completion_Date = (e) => {
	set_Completion_Date(e.target.value);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (Serial_Number === '' || Project_Name === '' || Issuers_Name === '' || tokens==='' || Completion_Date==='') {
	setError(true);
	} else {
	setSubmitted(true);
	setError(false);
	}
};

// Showing success message
const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
		<h1>Project successfully registered!!</h1>
	</div>
	);
};

// Showing error message if error is true
const errorMessage = () => {
	return (
	<div
		className="error"
		style={{
		display: error ? '' : 'none',
		}}>
		<h1>Please enter all the fields</h1>
	</div>
	);
};

return (
	<div className="form">
        <div>
        <div className='mgbtm'>
            <h1>Project Validation</h1>
        </div>

        {/* Calling to the methods */}
        <div className="messages">
            {errorMessage()}
            {successMessage()}
        </div>

        <form>
            {/* Labels and inputs for form data */}
            <label className="label">Serial Number</label>
            <input onChange={handle_Serial_Number} className="input"
            value={Serial_Number} type="text" />

            <label className="label">Name Of The Project</label>
            <input onChange={handle_Project_Name} className="input"
            value={Project_Name} type="text" />

            <label className="label">Issuer's Name</label>
            <input onChange={handle_Issuers_Name} className="input"
            value={Issuers_Name} type="text" />
            
            <label className="label">Tokens</label>
            <input onChange={handle_tokens} className="input"
            value={tokens} type="number" />
        
            <label className="label">Expected Completion Date</label>
            <input onChange={handle_Completion_Date} className="input"
            value={Completion_Date} type="date" />

            <button onClick={handleSubmit} className="btn" type="submit">
            Submit
            </button>
        </form>
        </div>
	</div>)
}


export default Validation;