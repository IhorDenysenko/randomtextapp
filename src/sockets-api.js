import React from "react";
import io from "socket.io-client";


const socket = io('https://randomtextapp.herokuapp.com/');
//const socket = io('http://localhost:3000/');

export const subscribeToReceiveMessage = (callback) => {
    socket.on('RECEIVE_MESSAGE', (data) => callback(data));
};

export const unsubscribeToReceiveMessage = () => {
    socket.off('RECEIVE_MESSAGE');
};

export const subscribeToOnJoined = (callback) => {
    socket.on('JOINED_CHAT', (data) => callback(data));
};

export const unsubscribeToOnJoined = () => {
    socket.off('JOINED_CHAT');
};

export const subscribeToLeftChat = (callback) => {
    socket.on('LEFT_CHAT', (data) => callback(data));
};

export const unsubscribeToLeftChat = () => {
    socket.off('LEFT_CHAT');
};

export const sendMessageToChatroom = (username, chatroom, message) => {
    socket.emit('SEND_MESSAGE', {
        author: username,
        message: message,
        chat: chatroom
    });
};

export const joinChatRoom = (username, chatname) => {
    socket.emit('JOIN_ROOM', {
        author: username,
        chat: chatname
    });
};

export const leaveChatRoom = (username, chatname) => {
    socket.emit('LEAVE_ROOM', {
        author: username,
        chat: chatname
    });
};