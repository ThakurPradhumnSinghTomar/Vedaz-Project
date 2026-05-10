import { Server } from 'socket.io';

let io: Server;

export const initSocket = (server: any, clientUrl: string) => {
  io = new Server(server, {
    cors: {
      origin: clientUrl,
      methods: ['GET', 'POST', 'PATCH']
    }
  });

  io.on('connection', (socket) => {
    socket.on('joinExpertRoom', (expertId: string) => {
      socket.join(`expert:${expertId}`);
    });
  });

  return io;
};

export { io };
