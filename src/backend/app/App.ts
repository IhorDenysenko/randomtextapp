import path from 'path';
import express from 'express';
import socket from 'socket.io';
import {ChatroomController} from '../chat/ChatroomController';
import {SocketAPIHandlers} from "../api/SocketAPIHandlers";
import  {SocketAPI} from "../api/SocketAPI";

const chatroomController = new ChatroomController();
const handlers = new SocketAPIHandlers(chatroomController);

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '..', '..', '..', 'build');
app.use(express.static(publicPath));

const server = app.listen(port, function() {
    console.log(`server is running on port ${port}`)
});

/* Sockets */
const io = socket(server);
const sockets = new SocketAPI(io, handlers);
sockets.events();

/*  Base routes  */
app.get('/api/chatrooms', (req,res,next) => {

    console.log(chatroomController.getChatroomNames());
    res.status(200).send(chatroomController.getChatroomNames());
});

app.get('/api/chatrooms/:name', (req,res,next) => {

    res.status(200).send(chatroomController.getMessagesByChatroomName(req.params.name));
});


app.get('*',(req,res,next) => {

    res.sendFile(path.join(publicPath, 'index.html'));
});


/* Default Chatrooms */
chatroomController.addChatRoom('PUBG');
chatroomController.addChatRoom('Just Chill');
chatroomController.addChatRoom('Papich In Army');