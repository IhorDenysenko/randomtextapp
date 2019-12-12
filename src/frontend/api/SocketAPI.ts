import io from "socket.io-client";
import {SocketEvents} from "../../shared/Events";


const socket = io('https://randomtextapp.herokuapp.com/');
//const socket = io('http://localhost:3000/');

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