"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatroomController_1 = require("../chat/ChatroomController");
var shared_1 = require("@randomtext/shared");
exports.SocketAPIHandlers = {
    handleJoin: function (data, socket) {
        var chatroom = ChatroomController_1.ChatroomController.getChatroomByName(data.chat);
        if (!chatroom)
            return;
        if (chatroom.isUserAdded(socket))
            return;
        chatroom.addUser(socket);
        chatroom.broadcastMessage(data.author + " joined the room");
        chatroom.addEntry(data.author + " joined the room");
        socket.emit(shared_1.SocketEvents.JOINED_CHAT, { chat: data.chat });
    },
    handleLeave: function (data, socket) {
        var chatroom = ChatroomController_1.ChatroomController.getChatroomByName(data.chat);
        if (!chatroom)
            return;
        chatroom.removeUser(socket);
        chatroom.broadcastMessage(data.author + " left the room");
        chatroom.addEntry(data.author + " left the room");
        socket.emit(shared_1.SocketEvents.LEFT_CHAT, { chat: data.chat });
    },
    handleMessage: function (data, socket) {
        var chatroom = ChatroomController_1.ChatroomController.getChatroomByName(data.chat);
        if (!chatroom)
            return;
        chatroom.addEntry(data.author + ": " + data.message);
        chatroom.broadcastMessage(data.author + ": " + data.message);
    },
    handleDisconnect: function (socket) {
        ChatroomController_1.ChatroomController.removeUser(socket);
    }
};
//# sourceMappingURL=SocketAPIHandlers.js.map