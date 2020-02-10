const fs = require("fs");
const http = require("http");
var Emmiter = require('events');
var port = 9000;

var event = new Emmiter();


var server = http.createServer(function(request,response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
  	var readableStream = fs.createReadStream("../img/logo.gif");
  	readableStream.pipe(response);
});

//var text = fs.readFileSync("../index.html", "utf8");
/**
event.on('data', function(data){
	process.stdout.write(data + "\n");
});

event.emit('data', text);
**/

/**
var readableStream = fs.createReadStream("../index.html", "utf8");

readableStream.pipe(process.stdout);
**/



server.listen(port, "127.0.0.1");
