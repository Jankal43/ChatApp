import http, { IncomingMessage, ServerResponse } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
});


type UserDictionary = {
  [key: string]: string;
}

let activeUsers: UserDictionary = {};


const io = new SocketIOServer(server, {
  cors: {
    origin: '*', 
  },
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected');
  console.log(socket.id);
 

  socket.on('user-nickname', (nick: string, id: string) => {
    console.log('Received nickname:', nick);
    console.log('Received id:', id);

    activeUsers[id] = nick;

    console.log("active users", activeUsers);
    io.emit('active-users', activeUsers);
    
    console.log("emitting active users");
});



  socket.on('send-message', ({ message, receiver, user }) => {
    console.log('Received message:', message, 'for receiver:', receiver, 'from user:', user);
    io.emit('recive-message', { message, user });
  });



  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
    delete activeUsers[socket.id];
    console.log("active users", activeUsers)
    io.emit("active-users",  activeUsers)
  });
});

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});
