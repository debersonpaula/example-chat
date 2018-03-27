const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('connecting...');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('login', function(data){
    socket.data = {
      username: data
    }
    socket.emit('login', 'ok');
    console.log('...user logged ' + data);
  });

  socket.on('chat message', function(msg){
    const username = socket.data.username;
    io.emit('chat message', username + ': ' + msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});