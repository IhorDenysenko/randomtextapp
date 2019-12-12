import {ChatroomController} from "../chat/ChatroomController";
import * as SocketIO from 'socket.io';
import {UserChatDTO} from '../../shared/DTO';
import {SocketEvents} from "../../shared/Events";

export class SocketAPIHandlers {

    private chatroomManager: ChatroomController;

    constructor(chatroomManager: ChatroomController) {
        this.chatroomManager = chatroomManager;
    }

    handleJoin(data: UserChatDTO, socket: SocketIO.Socket): void {

        let chatroomName = data.chat;

        let chatroom = this.chatroomManager.getChatroomByName(chatroomName);
        if(!chatroom) return;

        if(chatroom.isUserAdded(socket)) return;

        console.log("user " + data.author);
        console.log("socket " + socket.id);
        console.log("chatroomName " + chatroomName);

        chatroom.addUser(socket);
        chatroom.broadcastMessage(data.author + " joined the room");
        chatroom.addEntry(data.author + " joined the room");

        socket.emit(SocketEvents.JOINED_CHAT, {chat: chatroomName});
    }

    handleLeave(data: UserChatDTO, socket: SocketIO.Socket): void {

        let chatroomName = data.chat;

        let chatroom = this.chatroomManager.getChatroomByName(chatroomName);
        if(!chatroom) return;

        chatroom.removeUser(socket);
        chatroom.broadcastMessage(data.author + " left the room");
        chatroom.addEntry(data.author + " left the room");

        socket.emit(SocketEvents.LEFT_CHAT, {chat: chatroomName});
    }

    handleMessage(data: UserChatDTO, socket: SocketIO.Socket): void {

        let chatroomName = data.chat;

        let chatroom = this.chatroomManager.getChatroomByName(chatroomName);
        if(!chatroom) return;

        chatroom.addEntry(data.author + ": " + data.message);
        chatroom.broadcastMessage(data.author + ": "+ data.message);
    }

    handleDisconnect(socket: SocketIO.Socket): void {
        this.chatroomManager.removeUser(socket);
    }

}