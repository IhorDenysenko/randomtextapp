"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Chatroom_1 = require("./Chatroom");
var Chatrooms = new Map();
exports.ChatroomController = {
    addChatRoom: function (name) {
        Chatrooms.set(name, new Chatroom_1.Chatroom());
    },
    getChatroomNames: function () {
        return Array.from(Chatrooms.keys());
    },
    getChatroomByName: function (name) {
        return Chatrooms.get(name);
    },
    getMessagesByChatroomName: function (nameChat) {
        var result = Chatrooms.get(nameChat);
        return result ? result.getChatHistory() : [];
    },
    removeUser: function (socket) {
        Chatrooms.forEach(function (c) {
            c.removeUser(socket);
        });
    },
};
//# sourceMappingURL=ChatroomController.js.map