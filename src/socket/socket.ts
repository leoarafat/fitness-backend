/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Server } from 'socket.io';

export let io: Server;
const initializeSocketIO = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  // Log socket connections and handle events
  io.on('connection', (socket: any) => {
    console.log('connected', socket?.id);

    // Handle 'joinChat' event
    socket.on('joinChat', (data: any) => {
      console.log(data?.conversationId, 'conversationId');
      socket.join(data?.conversationId);
    });

    // Handle 'message' event
    socket.on('sendMessage', (messages: any) => {
      console.log(messages, 'Message');
      // io.to(conversationId).emit('getMessage', message);
    });

    // Handle socket disconnection
    socket.on('disconnect', () => {
      console.log(`ID: ${socket.id} disconnected`);
    });
  });

  return io;
};

export default initializeSocketIO;
