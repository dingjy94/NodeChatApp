require('./config/config');

const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '/../public');
const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  socket.on('connect', () => {
    console.log('user conneted');
  });

  socket.on('createMessage', (message) => {
    console.log(message);

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', (req, res) => {
  res.render(`index.html`);
});

server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});