$(function() {
    var email = "rememberthebaldness@gmail.com";
    var socket = io('http://miniplay.herokuapp.com/');
    socket.on('connect', function() {
        socket.emit('room', {client : 'controller', room : email});
    });

    socket.on('data', function(data) {
        console.log(data.current_time);
    });

    $('button').on('click', function() {
        socket.emit('data', {action : 'send_command', type : 'play'});
    });
});
