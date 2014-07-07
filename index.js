var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.send('<h1>Hello world</h1>');
});

http.listen(80, function() {
  console.log('listening on *:80');
});

io.on('connection', function(socket) {

});
