const socket = io();

socket.on('connect', () => {
  console.log('conneted to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected server');
});

socket.on('newMessage', (message) => {
  console.log(message);
})

