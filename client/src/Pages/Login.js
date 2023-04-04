import React, { useState } from 'react';
import '../styles/Login.css';
import profile from  "../image/a.png";
import email from "../image/b.png";
import pass from "../image/c.png" ;
import { RiCollageLine } from 'react-icons/ri';
function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    function login(){
        console.log(username, password)
        setPassword("")
        setUsername("")
    }


    return (
        <div className="main">
        <div className="sub-main">
            <div>
                <div className="imgs">
                    <div className="container-image">
                        <img src={profile} alt="profile" className="profile"/>
                    </div>
                </div>
                <div>
                    <h1 className='margin'> Login Page</h1>
                    <div>
                        {/* <img src={email} alt="email" className="email"/> */}
                        <input value={username} onChange={(e) => {setUsername(e.target.value)}} valuetype="text" placeholder="user name" className="name"/>
                    </div>
                    <div className="second-input">
                        {/* <img src={pass} alt="pass" className="pass"/> */}
                        <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="text" placeholder="password" className="name"/>
                        <h1 className='margin'></h1>
                    </div>
                    <button onClick={login}>Login</button>
                    </div>
                    <div className='m1'>
                    <button >Create an account</button>
                    </div>
                
            </div>

        </div>
        
    </div>

)
}
export default Login