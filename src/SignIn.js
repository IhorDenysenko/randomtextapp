import  './SignIn.css';
import React, { useState, useEffect } from "react";


const SignIn = (props) => {

    const [username, setUsername] = useState('');

    const setUser = (ev) => {
        ev.preventDefault();

        if(username !== '') {
            props.onUsernameChange(username);
        }
    };

    return (
        <div className="container center">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="header font-60">Pick Up Your Name</div>
                            <hr/>
                        </div>
                        <div className="card-footer">
                            <input type="text" placeholder="Username" value={username} onChange={ev => setUsername(ev.target.value)} className="form-control"/>
                            <br/>
                            <button onClick={setUser} className="btn btn-primary form-control">Go</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default SignIn;