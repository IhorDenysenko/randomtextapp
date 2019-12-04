import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import './ChatContainer.css';
import {
    subscribeToOnJoined,
    unsubscribeToOnJoined,
    subscribeToLeftChat,
    unsubscribeToLeftChat,
    leaveChatRoom
} from "./sockets-api";

const ChatContainer = (props) => {

    const [chatname, setChatname] = useState('');


    useEffect(() => {

        subscribeToOnJoined((data) => {

            if(chatname !== ''){

                leaveChatRoom(props.username, chatname);
                setChatname('');
            }

            setChatname(data.chat);

        });

        return() => {
            unsubscribeToOnJoined();
        };
    },[chatname]);

    useEffect(() => {

        subscribeToLeftChat((data) => {

            if(chatname === data.chat){
                setChatname('');
            }

        });

        return() => {
            unsubscribeToLeftChat();
        };
    },[chatname]);

    return (
        <div className="col-md-5 chat-container">
            {
                chatname !== '' ? (
                    <Chat username={props.username} name={chatname}/>
                    )
                    :
                    (
                        <div className="align-center header font-40"> Join Chat And Start Messaging </div>
                    )
            }
        </div>
    );
};

export default ChatContainer;