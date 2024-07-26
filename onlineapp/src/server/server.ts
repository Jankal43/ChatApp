import http, { IncomingMessage, ServerResponse } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
});


const io = new SocketIOServer(server, {
  cors: {
    origin: '*', 
  },
});


io.on('connection', (socket: Socket) => {
  console.log('A user connected');
  console.log(socket.id)


  socket.on('chat message', (message: string) => {
    io.emit('chat message', message); 
  });

  socket.on('disconnect', () => {
    console.log(socket.id)
    console.log('A user disconnected');
  });
});


server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});
