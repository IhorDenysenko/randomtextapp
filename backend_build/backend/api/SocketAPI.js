"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../../shared/Events");
var SocketAPI = /** @class */ (function () {
    function SocketAPI(io, handlers) {
        this.io = io;
        this.handlers = handlers;
    }
    SocketAPI.prototype.events = function () {
        var _this = this;
        this.io.on('connection', function (socket) {
            console.log("Client connected... " + socket.id);
            socket.on(Events_1.SocketEvents.JOIN_ROOM, function (data) {
                console.log("joined user: " + data.author + " chat: " + data.chat);
                _this.handlers.handleJoin(data, socket);
            });
            socket.on(Events_1.SocketEvents.LEAVE_ROOM, function (data) {
                _this.handlers.handleLeave(data, socket);
            });
            socket.on(Events_1.SocketEvents.SEND_MESSAGE, function (data) {
                _this.handlers.handleMessage(data, socket);
            });
            socket.on('disconnect', function () {
                console.log('client disconnected...', socket.id);
                _this.handlers.handleDisconnect(socket);
            });
        });
    };
    return SocketAPI;
}());
exports.SocketAPI = SocketAPI;
