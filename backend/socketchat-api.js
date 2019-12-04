module.exports = (io, handlers) => {

    io.on('connection', (socket) => {
        console.log("Client connected... " + socket.id);

        socket.on('JOIN_ROOM', (data) => {

            let chatName = data.chat;
            handlers.handleJoin(data, chatName, socket);
        });

        socket.on('LEAVE_ROOM', (data) => {
            let chatName = data.chat;

            handlers.handleLeave(data, chatName, socket);
        });

        socket.on('SEND_MESSAGE', (data) => {

            let chatName = data.chat;
            handlers.handleMessage(data, chatName, socket);
        });

        socket.on('disconnect',  () => {
            console.log('client disconnected...', socket.id)

            handlers.handleDisconnect(socket);
        });

    });
    
};