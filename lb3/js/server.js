var http = require('http');
var Emmiter = require('events');
var port = 8888;
var users = [], msgs = [];

var server = http.createServer(function(request,response){

});

var logger = new Emmiter();

logger.on('message', function(msg){
	console.log('New message:' + msg);
	msgs[msgs.length] = msg;
});

logger.on('login', function(name){
	console.log('New user:' + name);
	users[users.length] = name;
});

logger.on('getUsers', function(){
	console.log('Logger users: ');
	for (var i = 0; i < users.length; i++) {
		console.log(users[i]);
	}
});

logger.on('getMsgs', function(){
	console.log('Messages: ');
	for (var i = 0; i < msgs.length; i++) {
		console.log(msgs[i]);
	}
});

logger.emit('message', 'Hello, world!');
logger.emit('login', 'Yaroslav');
logger.emit('message', 'Veni, vidi, vici');
logger.emit('login', 'Cezar');

logger.emit('getUsers');
logger.emit('getMsgs');

server.listen(port, "127.0.0.1");