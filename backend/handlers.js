
module.exports = function (chatroomManager) {

    function handleJoin(data, chatroomName, socket) {

        let chatroom = chatroomManager.getChatroomByName(chatroomName);
        if(!chatroom) return;

        if(chatroom.isUserAdded(socket)) return;

        console.log("user " + data.author);
        console.log("socket " + socket.id);
        console.log("chatroomName " + chatroomName);

        socket.username = data.author;
        chatroom.addUser(socket);
        chatroom.broadcastMessage(data.author + " joined the room");
        chatroom.addEntry(data.author + " joined the room");

        socket.emit('JOINED_CHAT', {chat: chatroomName});
    }

    function handleLeave(data, chatroomName, socket) {

        let chatroom = chatroomManager.getChatroomByName(chatroomName);
        if(!chatroom) return;

        chatroom.removeUser(socket);
        chatroom.broadcastMessage(data.author + " left the room");
        chatroom.addEntry(data.author + " left the room");

        socket.emit('LEFT_CHAT', {chat: chatroomName});
    }

    function handleMessage(data, chatroomName, socket) {

        let chatroom = chatroomManager.getChatroomByName(chatroomName);
        if(!chatroom) return;

        chatroom.addEntry(data.author + ": " + data.message);
        chatroom.broadcastMessage(data.author + ": "+ data.message);
    }

    function handleDisconnect(socket) {
        chatroomManager.removeUser(socket);
    }

    return {
        handleJoin,
        handleLeave,
        handleMessage,
        handleDisconnect
    }
};