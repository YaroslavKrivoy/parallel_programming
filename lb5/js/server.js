const http = require("http");
const getFile = require("./modules/get-file");
const logs = require("./modules/logs");
var port = 9000;


var server = http.createServer(function(request,response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
  

  	var readableStream = getFile.getFiles('index.html');
  	readableStream.pipe(response);
});


logs.warn('Alert!!!');
logs.error('Error!!!');
logs.info('Info');


server.listen(port, "127.0.0.1");
