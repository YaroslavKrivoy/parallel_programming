const http = require("http");
const getFile = require("download_image");
const logs = require("./modules/logs");
var port = 9000;


var server = http.createServer(function(request,response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
  	var readableStream = getFile.getFile('../img/logo.gif');
  	readableStream.pipe(response);
});


logs.warn('Alert!!!');
logs.error('Error!!!');
logs.info('Info');


server.listen(port, "127.0.0.1");
