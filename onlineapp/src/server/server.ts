import http, { IncomingMessage, ServerResponse } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
});


type UserDictionary = {
  [key: string]: string;
}

let activeUsers: UserDictionary = {};

function findKeyByValue(dictionary: UserDictionary, value: string): string | undefined {
  for (const key in dictionary) {
    if (dictionary[key] === value) {
      return key;
    }
  }
  return undefined;
}


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



  socket.on('send-message', ({ message, user }) => {
  console.log('Received message:', message, 'from user:', user);
  io.emit('recive-message', { message, user });
  });



   socket.on('private-message', ({ message, receiver, user }) => {
    console.log('Received private message:', message, 'for receiver:', receiver, 'from user:', user);
    const receiverSocketId = findKeyByValue(activeUsers, receiver);
    if (receiverSocketId) {
      console.log('Sending private message to socket ID:', receiverSocketId);
      io.to(receiverSocketId).emit('recive-message', { message, user });
    } else {
      console.log('Receiver not found');
    }
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
