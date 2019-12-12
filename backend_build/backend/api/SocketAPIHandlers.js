"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../../shared/Events");
var SocketAPIHandlers = /** @class */ (function () {
    function SocketAPIHandlers(chatroomManager) {
        this.chatroomManager = chatroomManager;
    }
    SocketAPIHandlers.prototype.handleJoin = function (data, socket) {
        var chatroomName = data.chat;
        var chatroom = this.chatroomManager.getChatroomByName(chatroomName);
        if (!chatroom)
            return;
        if (chatroom.isUserAdded(socket))
            return;
        console.log("user " + data.author);
        console.log("socket " + socket.id);
        console.log("chatroomName " + chatroomName);
        chatroom.addUser(socket);
        chatroom.broadcastMessage(data.author + " joined the room");
        chatroom.addEntry(data.author + " joined the room");
        socket.emit(Events_1.SocketEvents.JOINED_CHAT, { chat: chatroomName });
    };
    SocketAPIHandlers.prototype.handleLeave = function (data, socket) {
        var chatroomName = data.chat;
        var chatroom = this.chatroomManager.getChatroomByName(chatroomName);
        if (!chatroom)
            return;
        chatroom.removeUser(socket);
        chatroom.broadcastMessage(data.author + " left the room");
        chatroom.addEntry(data.author + " left the room");
        socket.emit(Events_1.SocketEvents.LEFT_CHAT, { chat: chatroomName });
    };
    SocketAPIHandlers.prototype.handleMessage = function (data, socket) {
        var chatroomName = data.chat;
        var chatroom = this.chatroomManager.getChatroomByName(chatroomName);
        if (!chatroom)
            return;
        chatroom.addEntry(data.author + ": " + data.message);
        chatroom.broadcastMessage(data.author + ": " + data.message);
    };
    SocketAPIHandlers.prototype.handleDisconnect = function (socket) {
        this.chatroomManager.removeUser(socket);
    };
    return SocketAPIHandlers;
}());
exports.SocketAPIHandlers = SocketAPIHandlers;
