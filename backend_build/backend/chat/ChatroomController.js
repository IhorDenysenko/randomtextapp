"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Chatroom_1 = require("./Chatroom");
var ChatroomController = /** @class */ (function () {
    function ChatroomController() {
        var _this = this;
        this.addChatRoom = function (name) {
            _this.Chatrooms.set(name, new Chatroom_1.Chatroom());
        };
        this.getChatroomNames = function () {
            return Array.from(_this.Chatrooms.keys());
        };
        this.getChatroomByName = function (name) {
            return _this.Chatrooms.get(name);
        };
        this.getMessagesByChatroomName = function (nameChat) {
            var result = _this.Chatrooms.get(nameChat);
            return result ? result.getChatHistory() : undefined;
        };
        this.removeUser = function (socket) {
            _this.Chatrooms.forEach(function (c) {
                c.removeUser(socket);
            });
        };
        this.Chatrooms = new Map();
    }
    return ChatroomController;
}());
exports.ChatroomController = ChatroomController;
