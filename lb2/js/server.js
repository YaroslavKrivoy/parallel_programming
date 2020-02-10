var http = require('http');
var url = require('url');
var port = 9000;

var server = http.createServer(function(request,response){

});

server.on('request', function(request,response){
	var code = response.statusCode;
	var message = "Hello from Node.js от Yaroslav!";
	response.setHeader("Content-Type", "text/html; charset=utf-8;");
	response.setHeader("statusCode", code);
	response.setHeader("message", "Hello from Node.js from Yaroslav");
    response.write("Статус ответа: " + code.toString() + "<br>" + message);
    response.end();
});

server.on('request', function(request,response){
	switch(request.url){
		case '/' : 
			console.log(request.method);
			console.log(request.url);
			console.log(response.statusCode);
			break;
		case '/stop' :
				server.close();
	}
	

});

server.on('close', function(){
	console.log('The end');
});

server.on('connection', function(socket){
	console.log('Connecting...');
});

server.on('listening', function(){
	console.log('Номер порта: ' + port);
});


server.listen(port, "127.0.0.1");