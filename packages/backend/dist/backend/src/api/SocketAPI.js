"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketAPIHandlers_1 = require("./SocketAPIHandlers");
var shared_1 = require("@randomtext/shared");
exports.SocketAPI = function (io) {
    io.on('connection', function (socket) {
        socket.on(shared_1.SocketEvents.JOIN_ROOM, function (data) {
            SocketAPIHandlers_1.SocketAPIHandlers.handleJoin(data, socket);
        });
        socket.on(shared_1.SocketEvents.LEAVE_ROOM, function (data) {
            SocketAPIHandlers_1.SocketAPIHandlers.handleLeave(data, socket);
        });
        socket.on(shared_1.SocketEvents.SEND_MESSAGE, function (data) {
            SocketAPIHandlers_1.SocketAPIHandlers.handleMessage(data, socket);
        });
        socket.on('disconnect', function () {
            SocketAPIHandlers_1.SocketAPIHandlers.handleDisconnect(socket);
        });
    });
};
//# sourceMappingURL=SocketAPI.js.map