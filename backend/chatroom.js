module.exports = function () {
    const members = new Map();
    let chatHistory = [];

    function broadcastMessage(message) {
        members.forEach(m => m.emit('RECEIVE_MESSAGE', message));
    }

    function addEntry(entry) {
        chatHistory = chatHistory.concat(entry);
    }

    function isUserAdded(socket) {
        return !!members.get(socket.id);
    }
    
    function getChatHistory() {
        return chatHistory.slice();
    }

    function addUser(socket) {
        members.set(socket.id, socket);
    }

    function removeUser(socket) {
        members.delete(socket.id);
    }

    return {
        broadcastMessage,
        addEntry,
        getChatHistory,
        addUser,
        removeUser,
        isUserAdded
    }
};