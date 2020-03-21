const fs = require("fs");

module.exports.getFiles = function(fileName){
	var parts = fileName.split('.');
	var ext = parts.pop();
	var readableStream = null;
	if(ext == 'html'){
		readableStream = fs.createReadStream("../" + fileName, "utf8");
	}
	else{
		readableStream = fs.createReadStream("../img/" + fileName); 
	}
	return readableStream;
}
	