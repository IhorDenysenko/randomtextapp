import React, { useState, useEffect } from "react";
import axios from 'axios';
import  './СhatroomContainer.css';
import {joinChatRoom} from "./sockets-api";

const ChatroomContainer = (props) => {

    const [chatrooms, setChatrooms] = useState([]);

    useEffect(() => {

        const loadChatRooms = () => {
            axios.get(`https://randomtextapp.herokuapp.com/api/chatrooms`)
                .then(res => {

                    const roomdata = res.data;
                    setChatrooms(roomdata);
                });
        };

        loadChatRooms();

    },[]);

    const handleChooseChatroom = (ev) => {
        ev.preventDefault();

        joinChatRoom(props.username, ev.target.value);
    };

    return(
        <div className="container col-md-3 chatroom-container">
            <div className="card">
                <div className="card-body">
                    <div className="card-title header font-40">Chatrooms</div>
                    <hr/>
                    <div className="chats">
                        {chatrooms.map(chatroom => {
                            return (
                                <div className="margin-top-25px">
                                    <button onClick={handleChooseChatroom} className="btn btn-dark form-control" value={chatroom}> {chatroom}</button>
                                </div>
                            )
                        })}
                    </div>

                </div>

            </div>
        </div>
    );

};

export default ChatroomContainer;