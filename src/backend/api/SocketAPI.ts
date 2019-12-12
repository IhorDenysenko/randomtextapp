import * as SocketIO from 'socket.io';
import  {SocketAPIHandlers} from './SocketAPIHandlers';
import {UserChatDTO} from '../../shared/DTO';
import {SocketEvents} from "../../shared/Events";

export class SocketAPI {

    private io: SocketIO.Server;
    private handlers: SocketAPIHandlers;

    constructor(io: SocketIO.Server, handlers: SocketAPIHandlers) {
        this.io = io;
        this.handlers = handlers;
    }

    events(): void {

        this.io.on('connection', (socket: SocketIO.Socket) => {
            console.log("Client connected... " + socket.id);

            socket.on(SocketEvents.JOIN_ROOM, (data: UserChatDTO) => {

                console.log("joined user: "+data.author+" chat: "+data.chat);

                this.handlers.handleJoin(data, socket);
            });

            socket.on(SocketEvents.LEAVE_ROOM, (data: UserChatDTO) => {

                this.handlers.handleLeave(data, socket);
            });

            socket.on(SocketEvents.SEND_MESSAGE, (data: UserChatDTO) => {

                this.handlers.handleMessage(data, socket);
            });

            socket.on('disconnect',  () => {
                console.log('client disconnected...', socket.id);

                this.handlers.handleDisconnect(socket);
            });

        });

    }

}