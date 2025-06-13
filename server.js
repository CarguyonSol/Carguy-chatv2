const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Konfiguracja CORS – zezwala na dostęp z dowolnej strony (lub wpisz konkretną domenę)
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*", // np. "https://twoja-apka.onrender.com"
    methods: ["GET", "POST"]
  }
});

// Socket.IO logika
io.on("connection", (socket) => {
  console.log("✅ Użytkownik połączony:", socket.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // wysyła do wszystkich
  });

  socket.on("disconnect", () => {
    console.log("❌ Użytkownik rozłączony:", socket.id);
  });
});

// PORT — Render wymaga użycia process.env.PORT
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Serwer czatu działa na porcie ${PORT}`);
});
