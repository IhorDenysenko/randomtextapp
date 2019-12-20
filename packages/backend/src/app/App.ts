import path from 'path';
import express from 'express';
import socket from 'socket.io';
import {ChatroomController} from '../chat/ChatroomController';
import  {SocketAPI} from "../api/SocketAPI";

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname,'..','..','..','..', 'assets', 'build');
app.use(express.static(publicPath));

const server = app.listen(port, function() {
    console.log(`server is running on port ${port}`)
});

/* Sockets */
const io = socket(server);
SocketAPI(io);

/*  Base routes  */
app.get('/api/chatrooms', (req,res,next) => {

    res.status(200).send(ChatroomController.getChatroomNames());
});

app.get('/api/chatrooms/:name', (req,res,next) => {

    res.status(200).send(ChatroomController.getMessagesByChatroomName(req.params.name));
});


app.get('*',(req,res,next) => {

    res.sendFile(path.join(publicPath, 'index.html'));
});


/* Default Chatrooms */
ChatroomController.addChatRoom('PUBG');
ChatroomController.addChatRoom('Just Chill');
ChatroomController.addChatRoom('Papich In Army');