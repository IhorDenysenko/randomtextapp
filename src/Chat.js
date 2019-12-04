import React, { useState, useEffect } from "react";
import  {leaveChatRoom, subscribeToReceiveMessage, unsubscribeToReceiveMessage, sendMessageToChatroom} from './sockets-api';
import axios from "axios";
import './Chat.css';

const Chat = (props) => {

    const [chatname, setChatname] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {

        console.log("CHAT "+props.name);
        const loadMessageHistory = (name) => {
            axios.get(`https://randomtextapp.herokuapp.com/api/chatrooms/`+name)
                .then(res => {
                    const messageData = res.data;
                    setMessages(messageData);
                });
        };

        setChatname(props.name);
        loadMessageHistory(props.name);

    },[chatname]);

    useEffect(() => {

        subscribeToReceiveMessage((data) => {
            setMessages([...messages, data]);
        });

        return () => {
            unsubscribeToReceiveMessage();
        };
    },[messages]);

    const sendMessage = (ev) => {
        ev.preventDefault();

        if(message === ''){
            return;
        }

        sendMessageToChatroom(props.username, chatname, message);

        setMessage('');
    };

    const handleLeaveRoom = (ev) => {
        ev.preventDefault();

        leaveChatRoom(props.username, chatname);
    };


    return (
        <div className="container col-sm-12">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-10 card-title header font-40">
                            {chatname}
                        </div>
                        <div className="col-sm-2">
                            <div className="btn-close text-danger" onClick={handleLeaveRoom}>x</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="messages overflow-scroll height-200">
                        {messages.map(messag => {
                            return (
                                <div className="message">{messag}</div>
                            )
                        })}
                    </div>
                </div>
                <hr/>
                <div className="card-footer">
                    <input type="text" placeholder="Message" className="form-control" value={message} onChange={ev => setMessage(ev.target.value)}/>
                    <br/>
                    <button onClick={sendMessage} className="btn btn-primary form-control">Send</button>
                </div>
            </div>
        </div>
    );


};

export default Chat;