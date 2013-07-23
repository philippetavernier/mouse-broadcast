var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');


app.listen(8080);

function handler(req, res) {
    var file = __dirname + '/public/index.html';
    fs.readFile(file, 
        function(err, data) {
            if(err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        }
    );
}


io.sockets.on('connection', function(socket) {
    socket.on('m', function(data) {
        socket.emit('relay', {msg: 'MouseX: ' + data.x + ' MouseY: ' + data.y});
    });
});