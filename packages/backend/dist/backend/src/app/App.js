"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var ChatroomController_1 = require("../chat/ChatroomController");
var SocketAPI_1 = require("../api/SocketAPI");
var app = express_1.default();
var port = process.env.PORT || 3000;
var publicPath = path_1.default.join(__dirname, '..', '..', '..', '..', 'assets', 'build');
app.use(express_1.default.static(publicPath));
var server = app.listen(port, function () {
    console.log("server is running on port " + port);
});
/* Sockets */
var io = socket_io_1.default(server);
SocketAPI_1.SocketAPI(io);
/*  Base routes  */
app.get('/api/chatrooms', function (req, res, next) {
    res.status(200).send(ChatroomController_1.ChatroomController.getChatroomNames());
});
app.get('/api/chatrooms/:name', function (req, res, next) {
    res.status(200).send(ChatroomController_1.ChatroomController.getMessagesByChatroomName(req.params.name));
});
app.get('*', function (req, res, next) {
    res.sendFile(path_1.default.join(publicPath, 'index.html'));
});
/* Default Chatrooms */
ChatroomController_1.ChatroomController.addChatRoom('PUBG');
ChatroomController_1.ChatroomController.addChatRoom('Just Chill');
ChatroomController_1.ChatroomController.addChatRoom('Papich In Army');
//# sourceMappingURL=App.js.map