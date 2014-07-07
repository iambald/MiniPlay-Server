var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = process.env.PORT || 5000;

function get_usertype(usertype) {
    if (usertype === 'player') return 'controller';
    if (usertype === 'controller') return 'player';
    return '';
}

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/test.js', function(req, res) {
    res.sendfile('test.js');
});

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    console.log(socket.usertype + ' disconnected from ' + socket.room);
  });
  socket.on('room', function(info){
    if(socket.room) {
        socket.leave(socket.room);
    }
    console.log(info.client + ' joining room ' + info.room);
    socket.usertype = info.client;
    socket.room = info.room;
    socket.join(info.client + ' ' + info.room);
  });

  socket.on('data', function(data) {
    var room = get_usertype(socket.usertype) + ' ' + socket.room;
    io.to(room).emit('data', data);
  });
});

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
