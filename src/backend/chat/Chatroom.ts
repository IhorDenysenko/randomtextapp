import * as Socket from 'socket.io';
import {SocketEvents} from "../../shared/Events";

export class Chatroom {

    private members: Map<string, Socket.Socket>;
    private chatHistory: Array<string>;

    constructor() {
        this.members = new Map<string, Socket.Socket>();
        this.chatHistory = new Array<string>();
    };

    broadcastMessage(message: string): void {

        this.members.forEach(m => m.emit(SocketEvents.RECEIVE_MESSAGE, message));
    }

    addEntry(entry: string): void {
        this.chatHistory = this.chatHistory.concat(entry);
    }

    isUserAdded(socket: Socket.Socket): boolean {
        return !!this.members.get(socket.id);
    }

    getChatHistory(): Array<string> {
        return this.chatHistory.slice();
    }

    addUser(socket: Socket.Socket): void {
        this.members.set(socket.id, socket);
    }

    removeUser(socket: Socket.Socket): void {
        this.members.delete(socket.id);
    }

}