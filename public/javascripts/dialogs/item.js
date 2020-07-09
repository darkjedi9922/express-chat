var socket = io();

socket.on('new message', function(data) {
    console.log(data);
    var authorLogin = '<b>' + data.authorLogin + ': </b>';
    var messageText = '<span>' + data.text + '</span>';
    $('#messages').append('<li class="list-group-item">' + authorLogin + messageText + '</li>')
});