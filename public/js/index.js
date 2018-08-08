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

  const messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, () => {
    messageTextBox.val('');
  });
});

const locationButton = $('#sendLocation');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not support by your browser');
  }
  
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(position => {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    locationButton.removeAttr('disabled').text('Send location');
    alert('unable to fetch your location');
  })
});
