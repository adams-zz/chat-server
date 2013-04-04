var globals = require('./globals');
var fs = require('fs');

var returnMessages = function(request, response){
		response.writeHead(200, globals.defaultCorsHeaders);
		response.end(JSON.stringify(globals.messageLog));
};

var postMessages = function(request, response){
		request.setEncoding();
		response.writeHead(302, globals.defaultCorsHeaders);
		request.on('data', function(data){
			globals.messageLog.push(data);
			fs.writeFile('log.txt', globals.messageLog);
		});
};

var serveFile = function(request, response){
			response.writeHead(200, {'Content-Type': 'text/html'});
			fs.createReadStream(__dirname + '/index.html').pipe(response);
			// read.pipe(fs.readFileSync('index.html', 'utf-8'));
};


exports.returnMessages = returnMessages;
exports.postMessages = postMessages;
exports.serveFile = serveFile;