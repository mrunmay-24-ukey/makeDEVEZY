const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const snippetRoutes = require('./routes/snippetRoutes');
const envVariableRoutes = require('./routes/envVariableRoutes');
const docRoutes = require('./routes/documentationRoutes');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server, { cors: { origin: '*' } }); // Attach Socket.io to the server

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/snippets', snippetRoutes);
app.use('/api/env', envVariableRoutes);
app.use('/api/documentation', docRoutes);

// Socket.io for real-time collaboration
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  let currentRoom = null;
  let currentUser = null;

  socket.on('join', ({ roomId, userName }) => {
    if (currentRoom) {
      socket.leave(currentRoom);
      rooms.get(currentRoom).delete(currentUser);
      io.to(currentRoom).emit('userJoined', Array.from(rooms.get(currentRoom)));
    }

    currentRoom = roomId;
    currentUser = userName;

    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }

    rooms.get(roomId).add(userName);

    io.to(roomId).emit('userJoined', Array.from(rooms.get(currentRoom)));
    console.log('User joined the room:', roomId);
  });

  socket.on('codeChange', ({ roomId, code }) => {
    socket.to(roomId).emit('codeUpdate', code);
  });

  socket.on('leaveRoom', () => {
    if (currentRoom && currentUser) {
      rooms.get(currentRoom).delete(currentUser);
      io.to(currentRoom).emit('userJoined', Array.from(rooms.get(currentRoom)));

      socket.leave(currentRoom);
      currentRoom = null;
      currentUser = null;
    }
  });

  socket.on('typing', ({ roomId, userName }) => {
    socket.to(roomId).emit('userTyping', userName);
  });

  socket.on('languageChange', ({ roomId, language }) => {
    io.to(roomId).emit('languageUpdate', language);
  });

  socket.on('disconnect', () => {
    if (currentRoom && currentUser) {
      rooms.get(currentRoom).delete(currentUser);
      io.to(currentRoom).emit('userJoined', Array.from(rooms.get(currentRoom)));
    }
    console.log('User disconnected');
  });

  socket.on('compileCode' , async ({code , roomId , language , version}) => {
    if(rooms.has(roomId)){
      const room = rooms.get(roomId);
      const response = await axios.post('https://emkc.org/api/v2/piston/execute' , {
        language,
        version,
        files:[
          {
            content : code ,

          }
        ]
      })

      room.output = response.data.run.output;
      io.to(roomId).emit('codeResponse' , response.data)
    }
  })

});

// Define PORT
const PORT = process.env.PORT || 6000;

// Serve Frontend from `frontend/dist`
const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
/* 
app.use(express.static(frontendPath)); */

/* app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
}); */

// Use server.listen instead of app.listen
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
