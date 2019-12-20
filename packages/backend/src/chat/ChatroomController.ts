import {Chatroom} from "./Chatroom";
import * as Socket from 'socket.io';


const Chatrooms: Map<string, Chatroom> = new Map<string, Chatroom>();

export const ChatroomController = {

    addChatRoom(name: string): void {
        Chatrooms.set(name, new Chatroom());
    },

    getChatroomNames(): Array<string> {
        return Array.from(Chatrooms.keys());
    },

    getChatroomByName (name: string): Chatroom | undefined {
        return Chatrooms.get(name);
    },

    getMessagesByChatroomName(nameChat: string): Array<string> {
        let result = Chatrooms.get(nameChat);
        return result ? result.getChatHistory() : [] as string[];
    },

    removeUser(socket: Socket.Socket): void {
        Chatrooms.forEach((c) => {
            c.removeUser(socket);
        });
    },
};