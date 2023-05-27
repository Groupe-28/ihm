const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set up event handlers for Socket.io
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle 'message' event
  socket.on('message', (data) => {
    console.log('Received message:', data);
    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Handle 'disconnect' event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const baseLat = 46.77101294963064; // Base latitude
const baseLng = 1.4196969350476492; // Base longitude

const emitCoordinates = () => {
  const lat = baseLat + getRandomOffset();
  const lng = baseLng + getRandomOffset();
  io.emit('coordinates', { lat, lng });
};

const getRandomOffset = () => (Math.random() - 0.5) * 0.0018;
setInterval(emitCoordinates, 2000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    });

// Start the server
const port = 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


