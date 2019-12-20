"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("@randomtext/shared");
var Chatroom = /** @class */ (function () {
    function Chatroom() {
        var _this = this;
        this.broadcastMessage = function (message) { _this.members.forEach(function (m) { return m.emit(shared_1.SocketEvents.RECEIVE_MESSAGE, message); }); };
        this.addEntry = function (entry) { _this.chatHistory = _this.chatHistory.concat(entry); };
        this.isUserAdded = function (socket) { return !!_this.members.get(socket.id); };
        this.getChatHistory = function () { return _this.chatHistory.slice(); };
        this.addUser = function (socket) { _this.members.set(socket.id, socket); };
        this.removeUser = function (socket) { _this.members.delete(socket.id); };
        this.members = new Map();
        this.chatHistory = new Array();
    }
    ;
    return Chatroom;
}());
exports.Chatroom = Chatroom;
//# sourceMappingURL=Chatroom.js.map