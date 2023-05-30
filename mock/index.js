const io = require('socket.io-client');

const socket = io('http://localhost:8000/logs');

// Set up event handlers for Socket.io
socket.on('allLogs', (data) => console.log(data));

socket.emit('getAllLogs', 'Hello from client');
socket.emit('createLog', {
    title: 'Hello from client',
    content: 'Hello from client',
});

