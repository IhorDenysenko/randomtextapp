"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var ChatroomController_1 = require("../chat/ChatroomController");
var SocketAPIHandlers_1 = require("../api/SocketAPIHandlers");
var SocketAPI_1 = require("../api/SocketAPI");
var chatroomController = new ChatroomController_1.ChatroomController();
var handlers = new SocketAPIHandlers_1.SocketAPIHandlers(chatroomController);
var app = express_1.default();
var port = process.env.PORT || 3000;
var publicPath = path_1.default.join(__dirname, '..', '..', '..', 'build');
app.use(express_1.default.static(publicPath));
var server = app.listen(port, function () {
    console.log("server is running on port " + port);
});
/* Sockets */
var io = socket_io_1.default(server);
var sockets = new SocketAPI_1.SocketAPI(io, handlers);
sockets.events();
/*  Base routes  */
app.get('/api/chatrooms', function (req, res, next) {
    console.log(chatroomController.getChatroomNames());
    res.status(200).send(chatroomController.getChatroomNames());
});
app.get('/api/chatrooms/:name', function (req, res, next) {
    res.status(200).send(chatroomController.getMessagesByChatroomName(req.params.name));
});
app.get('*', function (req, res, next) {
    res.sendFile(path_1.default.join(publicPath, 'index.html'));
});
/* Default Chatrooms */
chatroomController.addChatRoom('PUBG');
chatroomController.addChatRoom('Just Chill');
chatroomController.addChatRoom('Papich In Army');
