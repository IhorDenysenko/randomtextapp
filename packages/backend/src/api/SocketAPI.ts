import * as SocketIO from 'socket.io';
import  {SocketAPIHandlers} from './SocketAPIHandlers';
import {UserChatDTO} from '@randomtext/shared';
import {SocketEvents} from "@randomtext/shared";


export const SocketAPI = (io: SocketIO.Server) => {

    io.on('connection', (socket: SocketIO.Socket) => {

        socket.on(SocketEvents.JOIN_ROOM, (data: UserChatDTO) => {

            SocketAPIHandlers.handleJoin(data, socket);
        });

        socket.on(SocketEvents.LEAVE_ROOM, (data: UserChatDTO) => {

            SocketAPIHandlers.handleLeave(data, socket);
        });

        socket.on(SocketEvents.SEND_MESSAGE, (data: UserChatDTO) => {

            SocketAPIHandlers.handleMessage(data, socket);
        });

        socket.on('disconnect',  () => {
    
            SocketAPIHandlers.handleDisconnect(socket);
        });

    });

};