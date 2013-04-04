/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var queryString = require("querystring");
var messageLog = [];


var handleRequest = function(request, response) {
	console.log("Serving request type " + request.method + " for url " + request.url);
		if (request.url === 'http://127.0.0.1:8080/classes/room1'){
			if(request.method === 'GET'){
				response.writeHead(200, defaultCorsHeaders);
				response.end(JSON.stringify(messageLog));
			}
			if(request.method === 'POST'){
				response.writeHead(302, {'Content-Type': 'text/plain'});
				request.on('data', function(data) {
					messageLog.push(queryString.parse(data));
				});
					response.end("\n");
			}
		} else if(request.url === '/classes/messages'){
					if(request.method === 'GET'){
						response.writeHead(200, defaultCorsHeaders);
					  response.end(JSON.stringify(messageLog));
					}
					if(request.method === 'POST'){
						var message = messageLog[0];
						request.setEncoding();
						response.writeHead(302, defaultCorsHeaders);
						request.on('data', function(data){
							console.log(data);
							messageLog.push(data);
					});
				}
		}	else {
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.end('404 yo!');
		}
};

exports.handleRequest = handleRequest;

var defaultCorsHeaders = {
	'Content-Type': 'application/json',
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};