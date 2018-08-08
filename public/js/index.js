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

socket.on('newLocationMessage', message => {
  console.log(message);
  const li = $('<li></li>');
  const a = $('<a target="_blank">My Current Location</a>');

  li.text(`${message.from}:`);
  a.attr('href', message.url) ;
  li.append(a);
  $('#message').append(li);
});

$('#messageForm').on('submit', e => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, () => {

  });
});

const locationButton = $('#sendLocation');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not support by your browser');
  }

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    alert('unable to fetch your location');
  })
});
