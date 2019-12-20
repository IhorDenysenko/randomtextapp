import io from "socket.io-client";
import axios from "axios";
import {SocketEvents} from "@randomtext/shared";


export const APP_URL = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL : "";

const socket = io(APP_URL);

export const subscribeToReceiveMessage = (callback: (data: string) => void) => {
    socket.on(SocketEvents.RECEIVE_MESSAGE, (data: string) => callback(data));
};

export const unsubscribeToReceiveMessage = () => {
    socket.off(SocketEvents.RECEIVE_MESSAGE);
};

export const subscribeToOnJoined = (callback: (data: {chat: string}) => void) => {
    socket.on(SocketEvents.JOINED_CHAT, (data: {chat: string}) => callback(data));
};

export const unsubscribeToOnJoined = () => {
    socket.off(SocketEvents.JOINED_CHAT);
};

export const subscribeToLeftChat = (callback: (data: {chat: string}) => void) => {
    socket.on(SocketEvents.LEFT_CHAT, (data: {chat: string}) => callback(data));
};

export const unsubscribeToLeftChat = () => {
    socket.off(SocketEvents.LEFT_CHAT);
};

export const sendMessageToChatroom = (username: string, chatroom: string, message: string) => {
    socket.emit(SocketEvents.SEND_MESSAGE, {
        author: username,
        message: message,
        chat: chatroom
    });
};

export const joinChatRoom = (username: string, chatname: string) => {
    socket.emit(SocketEvents.JOIN_ROOM, {
        author: username,
        chat: chatname
    });
};

export const leaveChatRoom = (username: string, chatname: string) => {
    socket.emit(SocketEvents.LEAVE_ROOM, {
        author: username,
        chat: chatname
    });
};

export const loadMessageHistory = async (name: string, callback: (data: string[]) => void) => {
    await axios.get(APP_URL+'/api/chatrooms/'+name)
        .then(res => {
            const messageData = res.data;
            callback(messageData);
        });
};

export const loadChatRoomNames = async (callback: (data: string[]) => void) => {
    await axios.get(APP_URL+`/api/chatrooms`)
        .then(res => {
            const roomdata = res.data;
            callback(roomdata);
        });
};