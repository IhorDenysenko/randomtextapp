"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../../shared/Events");
var Chatroom = /** @class */ (function () {
    function Chatroom() {
        this.members = new Map();
        this.chatHistory = new Array();
    }
    ;
    Chatroom.prototype.broadcastMessage = function (message) {
        this.members.forEach(function (m) { return m.emit(Events_1.SocketEvents.RECEIVE_MESSAGE, message); });
    };
    Chatroom.prototype.addEntry = function (entry) {
        this.chatHistory = this.chatHistory.concat(entry);
    };
    Chatroom.prototype.isUserAdded = function (socket) {
        return !!this.members.get(socket.id);
    };
    Chatroom.prototype.getChatHistory = function () {
        return this.chatHistory.slice();
    };
    Chatroom.prototype.addUser = function (socket) {
        this.members.set(socket.id, socket);
    };
    Chatroom.prototype.removeUser = function (socket) {
        this.members.delete(socket.id);
    };
    return Chatroom;
}());
exports.Chatroom = Chatroom;
