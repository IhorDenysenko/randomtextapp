import {ChatroomController} from "../chat/ChatroomController";
import * as SocketIO from 'socket.io';
import {UserChatDTO} from '@randomtext/shared';
import {SocketEvents} from "@randomtext/shared";


export const SocketAPIHandlers = {

    handleJoin(data: UserChatDTO, socket: SocketIO.Socket): void {

        let chatroom = ChatroomController.getChatroomByName(data.chat);
        if(!chatroom) return;

        if(chatroom.isUserAdded(socket)) return;

        chatroom.addUser(socket);
        chatroom.broadcastMessage(data.author + " joined the room");
        chatroom.addEntry(data.author + " joined the room");

        socket.emit(SocketEvents.JOINED_CHAT, {chat: data.chat});
    },

    handleLeave(data: UserChatDTO, socket: SocketIO.Socket): void {

        let chatroom = ChatroomController.getChatroomByName(data.chat);
        if(!chatroom) return;

        chatroom.removeUser(socket);
        chatroom.broadcastMessage(data.author + " left the room");
        chatroom.addEntry(data.author + " left the room");

        socket.emit(SocketEvents.LEFT_CHAT, {chat: data.chat});
    },

    handleMessage(data: UserChatDTO, socket: SocketIO.Socket): void {

        let chatroom = ChatroomController.getChatroomByName(data.chat);
        if(!chatroom) return;

        chatroom.addEntry(data.author + ": " + data.message);
        chatroom.broadcastMessage(data.author + ": "+ data.message);
    },

    handleDisconnect(socket: SocketIO.Socket): void {
        ChatroomController.removeUser(socket);
    }

};