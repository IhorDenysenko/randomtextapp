import {Chatroom} from "./Chatroom";
import * as Socket from 'socket.io';

export class ChatroomController {

    private Chatrooms: Map<string, Chatroom>;

    constructor(){
        this.Chatrooms = new Map<string, Chatroom>();
    }

    addChatRoom = (name: string): void => {
        this.Chatrooms.set(name, new Chatroom());
    };

    getChatroomNames = (): Array<string> => {
        return Array.from(this.Chatrooms.keys());
    };

    getChatroomByName = (name: string): Chatroom | undefined => {
        return this.Chatrooms.get(name);
    };

    getMessagesByChatroomName = (nameChat: string): Array<string> | undefined => {

        let result = this.Chatrooms.get(nameChat);

        return result ? result.getChatHistory() : undefined;
    };

    removeUser = (socket: Socket.Socket): void => {
        this.Chatrooms.forEach((c) => {

            c.removeUser(socket);
        });
    };

}