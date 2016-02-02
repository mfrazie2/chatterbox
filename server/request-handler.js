/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.
#####
You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.
#####
Maintains access to defaultCorsHeads by closure
#####
*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var All_Messages = [];

var requestHandler = function(request, response) {

  var method = request.method;
  var url = request.url; 
  var headers = request.headers;
  
  // body to hold the data chunks that come through on the request
  var body = [];
  
  if(request.method === 'GET') { // check existence of the path?
    if(request.url === '') {
      // response.statusCode = 404;
      // response.setHeader('Content-type', 'text/plain');
      response.writeHead(404, {'Content-type': 'text/plain'});
      response.end();
    } else {
      // response.statusCode = 200;
      // response.setHeader('Content-type', 'application/json');
      response.writeHead(200, {'Content-type': 'application/json'});

      // retrieve from All_Messages
      var responseMessages = {
        results: All_Messages,
        headers: headers,
        method: method,
        url: url
      };
      // response.write(JSON.stringify(responseMessages));
      console.log(JSON.stringify(responseMessages));
      response.end(JSON.stringify(responseMessages));
    }
  } else if(request.method === 'POST') { // existence of the path?
    if(request.url === '') {
      // response.statusCode = 404;
      // response.setHeader('Content-type', 'text/plain');
      response.writeHead(404, {'Content-type': 'text/plain'});

      response.end();
    } else {
      // response.statusCode = 201;
      // response.setHeader('Content-type', 'application/json');
      response.writeHead(201, {'Content-type': 'application/json'});
      // push to All_Messages
       
      request.on('error', function(err) {
        console.log(err);
      });
      request.on('data', function(chunk) {
        //console.log(chunk);
        body.push(chunk);
      });
      request.on('end', function() {
        body = body.concat(body).toString();
        All_Messages.push(body);
        console.log(All_Messages);  
      });  
      // response.on('error', function(err) {
      //   console.log(err);
      // });
      
      
      
      response.end();
    }
  }
  
  
  
  
  // event listeners for data and errors
 
  
    
  // response.statusCode = 200;
  // response.setHeader('Content-type', 'application/json');
  
  // var responseBody = {
  //   headers: headers,
  //   method: method,
  //   url: url,
  //   body: body
  // };
    
  // response.write(JSON.stringify(responseBody));
  // response.end();

/*
  if(request.method === 'GET') {
    if(request.url === '') {
      response.writeHead(404);
      response.end();
    } else {
      response.writeHead(200);
      response.end();
    }
  } else if(request.method === 'POST') {
    if(request.url === '') {

    }
  }
  
 console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;

  var headers = defaultCorsHeaders;

   headers['Content-Type'] = "text/plain";

  response.writeHead(statusCode, headers);

  
  response.end("Hello, World!");
  */
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;