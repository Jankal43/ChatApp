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
let usersGameSlots = ["Empty slot", "Empty slot"]

let usersTurn = "";
let board = Array(9).fill('');

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];


function checkWinner(board: string[]): string | null {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every(cell => cell !== '')) {
    return "draw";
  }
  return null;
}

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


  socket.on("player-join", (player)=>{
    console.log("player join", player);
    console.log(usersGameSlots)
    if(usersGameSlots[0] === "Empty slot") {
      usersGameSlots[0] = player;
      usersTurn = usersGameSlots[0];
    } else if(usersGameSlots[1] === "Empty slot"){
      usersGameSlots[1] = player;
      console.log("Rozpoczęcie gry");
      io.emit('board-update', board);
      io.emit('round-update', usersTurn === usersGameSlots[0] ? 'X' : 'O');
    } else {
      console.log("All slot reserved");
    }
    io.emit("users-game-slots", usersGameSlots);
  })

  socket.on('player-click', (index) => {
    if (board[index] === '') {
      board[index] = usersTurn === usersGameSlots[0] ? 'X' : 'O';
      usersTurn = usersTurn === usersGameSlots[0] ? usersGameSlots[1] : usersGameSlots[0];

      const winner = checkWinner(board);
      if (winner) {
        if (winner === "draw") {
          io.emit("game-over", "Remis!");
        } else {
          io.emit("game-over", `Zwycięzca: ${winner}`);
        }
        io.emit('board-update', board);
        board = Array(9).fill('');
      } else {
        io.emit('board-update', board);
        io.emit('round-update', usersTurn === usersGameSlots[0] ? 'X' : 'O');
      }
    }
  });



  socket.on("player-leave", (player) => {
    console.log("Gracz opuścił grę:", player);

    if (usersGameSlots[0] === player) {
      usersGameSlots[0] = "Empty slot";
    } else if (usersGameSlots[1] === player) {
      usersGameSlots[1] = "Empty slot";
    }

    board = Array(9).fill('');
    usersTurn = "";
    io.emit("users-game-slots", usersGameSlots);
    io.emit("board-update", board);
    io.emit("round-update", null);
    io.emit("game-over", "Gra została przerwana, oczekiwanie na graczy.");
  });






  socket.on("disconnect", () => {
    let user = activeUsers[socket.id];
    console.log("User disconnected:", user, "Socket ID:", socket.id);

    if (!user) {
      console.log("User was not playing, skipping...");
      return;
    }

    if (usersGameSlots[0] === user) {
      usersGameSlots[0] = "Empty slot";
    } else if (usersGameSlots[1] === user) {
      usersGameSlots[1] = "Empty slot";
    } else {
      console.log("User was not in the game slots");
    }

    delete activeUsers[socket.id];
    delete userChatHistory[socket.id];

    console.log("Updated game slots:", usersGameSlots);
    io.emit("users-game-slots", usersGameSlots);

    console.log("Updated active users:", activeUsers);
    io.emit("active-users", activeUsers);
  });

});

server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});