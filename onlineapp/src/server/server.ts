import http, { IncomingMessage, ServerResponse } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {}
);

type UserDictionary = {
  [key: string]: string;
};

type UserChatHistory = {
  [key: string]: any[];
};

let activeUsers: UserDictionary = {};
let userChatHistory: UserChatHistory = {};

function findKeyByValue(
    dictionary: UserDictionary,
    value: string
): string | undefined {
  for (const key in dictionary) {
    if (dictionary[key] === value) {
      return key;
    }
  }
  return undefined;
}

const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected");
  console.log(socket.id);

  socket.on("user-nickname", (nick: string, id: string) => {
    console.log("Received nickname:", nick);
    console.log("Received id:", id);
    activeUsers[id] = nick;
    io.emit("active-users", activeUsers);
    console.log("emitting active users");
  });

  socket.on("send-message", ({ message, user }) => {
    console.log("Received message:", message, "from user:", user);
    Object.keys(activeUsers).forEach((userKey) => {
      if (!userChatHistory[userKey]) {
        userChatHistory[userKey] = [];
      }
      userChatHistory[userKey].push([message,user,false]);
    });

    console.log("Chat history", userChatHistory);
    socket.broadcast.emit("recive-message", { message, user });
  });

  socket.on('user-reload',(user) =>{
    console.log("chat-history send")
    console.log(user);
    console.log("userChatHistory", userChatHistory[socket.id]);
    socket.emit("chat-history",userChatHistory[socket.id]);
    io.emit("active-users", activeUsers);
  });

  socket.on("send-image", (data) => {
    socket.broadcast.emit("recive-image", data);
  });

  socket.on("private-message", ({ message, receiver, user }) => {
    console.log(
        "Received private message:",
        message,
        "for receiver:",
        receiver,
        "from user:",
        user
    );
    const receiverSocketId = findKeyByValue(activeUsers, receiver);
    const userId = socket.id;

    if (receiverSocketId) {
      console.log("Sending private message to socket ID:", receiverSocketId);

      if (!userChatHistory[userId]) {
        userChatHistory[userId] = [];
      }
      if (!userChatHistory[receiverSocketId]) {
        userChatHistory[receiverSocketId] = [];
      }
      userChatHistory[userId].push([message,user,true]);
      userChatHistory[receiverSocketId].push([message,user,true]);


      socket
          .in(receiverSocketId)
          .emit("recive-message", { message, user, receiver });
    } else {
      console.log("Receiver not found");
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete activeUsers[socket.id];
    delete userChatHistory[socket.id];
    console.log("active users", activeUsers);
    io.emit("active-users", activeUsers);
  });
});

server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});