const Chatroom = require('./chatroom');

module.exports = function () {
    const Chatrooms = new Map();

    const addChatRoom = (name) => {
        Chatrooms.set(name, Chatroom());
    };

    const getChatroomNames = () => {
        return Array.from(Chatrooms.keys());
    };

    const getChatroomByName = (name) => {
        return Chatrooms.get(name);
    };

    const getMessagesByChatroomName = (nameChat) => {

        let result = Chatrooms.get(nameChat);

        return result ? result.getChatHistory() : undefined;
    };

    const removeUser = (socket) => {
        Chatrooms.forEach((c) => {

            c.removeUser(socket);
        });
    };


    return {
        getChatroomNames,
        getMessagesByChatroomName,
        addChatRoom,
        getChatroomByName,
        removeUser
    };

};