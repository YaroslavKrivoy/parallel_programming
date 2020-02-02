const http = require("http");
const fs = require("fs");

http.createServer(function(request,response){
	var code = response.statusCode;
	var message = "Привет от Ярослава!";
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write("Статус ответа: " + code.toString() + "<br>" + message);
    fs.readFile("../index.html", "utf8", 
            function(error,data){
                if(error) throw error;
                response.write(data,"utf8");
                response.end();
	});
     
}).listen(8080, "127.0.0.1",function(){
    console.log("Сервер начал прослушивание запросов на порту 8080");
});
