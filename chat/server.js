const express = require('express');
const path = require('path');

let app = express();

app.set("view engine", "hbs");

app.use('/public/css',express.static(path.join(__dirname, 'public/css')));
app.use('/public/js',express.static(path.join(__dirname, 'public/js')));

app.get('/',(req, res) => {
    res.render('index.hbs');
});

let server = app.listen(3000);

const io = require('socket.io')(server);

io.set('log level', 1);

io.sockets.on('connection', (socket) => {

    let ID = (socket.id).toString().substr(0, 5);
    let time = (new Date).toLocaleTimeString();

    socket.json.send({'event': 'connected', 'name': ID, 'time': time});

    socket.broadcast.json.send({'event': 'userJoined', 'name': ID, 'time': time});

    socket.on('message', function (msg) {
        let time = (new Date).toLocaleTimeString();

        socket.json.send({'event': 'messageSent', 'name': ID, 'text': msg, 'time': time});

        socket.broadcast.json.send({'event': 'messageReceived', 'name': ID, 'text': msg, 'time': time})
    });

    socket.on('disconnect', function() {
        let time = (new Date).toLocaleTimeString();
        io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
    });
});

