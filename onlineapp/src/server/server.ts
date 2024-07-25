import http, { IncomingMessage, ServerResponse } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

// Tworzenie serwera HTTP
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  // Obsługa żądań HTTP, jeśli potrzebne
});

// Tworzenie instancji serwera Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Dostosuj do swoich potrzeb
  },
});

// Obsługa połączeń Socket.IO
io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  // Obsługa wiadomości czatu
  socket.on('chat message', (message: string) => {
    io.emit('chat message', message); // Rozsyłanie wiadomości do wszystkich podłączonych klientów
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Uruchamianie serwera
server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});
