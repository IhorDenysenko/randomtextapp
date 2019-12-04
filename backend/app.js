const path = require('path');
const express = require('express');
const socket = require('socket.io');
const app = express();
const chatroomController = require('./chatroomController');
const ChatroomController = chatroomController();
const handlers = require('./handlers');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '..', 'build');
app.use(express.static(publicPath));

const server = app.listen(port, function(){
    console.log(`server is running on port ${port}`)
});

const io = socket(server);
require('./socketchat-api')(io, handlers(ChatroomController));

app.get('/api/chatrooms', (req,res,next) => {

    console.log(ChatroomController.getChatroomNames());
    res.status(200).send(ChatroomController.getChatroomNames());
});

app.get('/api/chatrooms/:name', (req,res,next) => {

    res.status(200).send(ChatroomController.getMessagesByChatroomName(req.params.name));
});


app.get('*',(req,res,next) => {

    res.sendFile(path.join(publicPath, 'index.html'));
});



// Fill chatrooms with template data
ChatroomController.addChatRoom('PUBG');
ChatroomController.addChatRoom('Just Chill');
ChatroomController.addChatRoom('Papich In Army');