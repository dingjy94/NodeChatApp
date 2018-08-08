const socket = io();

socket.on('connect', () => {
  console.log('conneted to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected server');
});

socket.on('newMessage', (message) => {
  console.log(message);
  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#message').append(li);
})

$('#messageForm').on('submit', e => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, () => {

  });
});
