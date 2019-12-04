import React, {useState, useEffect} from 'react';
import SignIn from "./SignIn";
import ChatContainer from "./ChatContainer";
import ChatroomContainer from "./ChatroomContainer";
import  './App.css';

const App = () => {

    const [name,setName] = useState('');

    useEffect(() => {

        console.log("new name: " + name);
    },[name]);


    return (
        <div className="col-md-12 container-center">
            <div className="row">
            {
                name !== ''? (
                    <div className="margin-top-10per">
                        <div className="col-md-1"></div>
                        <ChatroomContainer username={name} />
                        <div className="col-md-2"></div>
                        <ChatContainer username={name} />
                        <div className="col-md-1"></div>
                    </div>
                ) : (
                    <SignIn onUsernameChange={n => setName(n)} />
                )
            }
            </div>
        </div>
    );
};

export default App;