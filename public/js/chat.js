const socket = io();

function scrollToBottom() {
  const messages = $('#message');
  const newMessage = messages.children('li:last-child');
  //Height
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', () => {
  const params = $.deparam(window.location.search);

  socket.emit('join', params, err => {
    if (err) {
      window.location.href = '/';
      alert(err);
    } else {
      console.log('no error');
    }
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected server');
});

socket.on('updateUserList', (users) => {
  const ul = $('<ul></ul>');

  users.forEach(user => {
    ul.append($('<li></li>').text(user));
  });

  $('#users').html(ul);
});

socket.on('newMessage', (message) => {
  const template = $('#messageTemplate').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: moment(message.createdAt).format('h:mm a')
  });

  $('#message').append(html);
  scrollToBottom();
})

socket.on('newLocationMessage', message => {
  const template = $('#locationMessageTemplate').html();
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: moment(message.createdAt).format('h:mm a')
  });

  $('#message').append(html);
  scrollToBottom();
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
