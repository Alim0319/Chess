// server.js
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { v4: uuidV4 } = require("uuid");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: "*",
});

const rooms = new Map();

io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  socket.on("username", (username) => {
    console.log("username:", username);
    socket.data.username = username;
  });

  socket.on("createRoom", async (callback) => {
    const roomId = uuidV4();
    await socket.join(roomId);

    rooms.set(roomId, {
      roomId,
      players: [{ id: socket.id, username: socket.data?.username }],
    });

    callback(roomId);
  });

  socket.on("joinRoom", async (args, callback) => {
    const room = rooms.get(args.roomId);
    let error, message;

    if (!room) {
      error = true;
      message = "Room does not exist";
    } else if (room.players.length >= 2) {
      error = true;
      message = "Room is full";
    }

    if (error) {
      if (callback) {
        callback({
          error,
          message,
        });
      }
      return;
    }

    await socket.join(args.roomId);

    const roomUpdate = {
      ...room,
      players: [
        ...room.players,
        { id: socket.id, username: socket.data?.username },
      ],
    };

    rooms.set(args.roomId, roomUpdate);

    callback(roomUpdate);

    socket.to(args.roomId).emit("opponentJoined", roomUpdate);
  });

  socket.on("move", (data) => {
    socket.to(data.room).emit("move", data.move);
  });

  socket.on("disconnect", () => {
    const gameRooms = Array.from(rooms.values());

    gameRooms.forEach((room) => {
      const userInRoom = room.players.find((player) => player.id === socket.id);

      if (userInRoom) {
        if (room.players.length < 2) {
          rooms.delete(room.roomId);
          return;
        }

        socket.to(room.roomId).emit("playerDisconnected", userInRoom);
      }
    });
  });

  socket.on("closeRoom", async (data) => {
    socket.to(data.roomId).emit("closeRoom", data);

    const clientSockets = await io.in(data.roomId).fetchSockets();

    clientSockets.forEach((s) => {
      s.leave(data.roomId);
    });

    rooms.delete(data.roomId);
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Listening on *:${port}`);
});
