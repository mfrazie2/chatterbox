var messages = [ ];
var _messageID = 1;


var routes = {
  "/classes/chatterbox": true,
  "/classes/messages": true,
  "/classes/room1": true,
  "/log": true,
  "/classes/room": true,
  "/send": true
};

var methods = {
  GET: function (req, res) {
    sendResponse(res, {results: messages});
  },
  POST: function (req, res) {
    collectData(req, function(message) {
      message._id = _messageID++;
      messages.push(message);
      sendResponse(res, {messageID: message._id}, 201);
    });
  },
  OPTIONS: function (req, res) {
    sendResponse(res, "");
  }
};

function sendResponse(res, data, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, defaultCorsHeaders);
  res.end(JSON.stringify(data));
}

function collectData(req, callback) {
  var message = '';
  req.on('data', function (d) {
    message += d;
  });
  req.on('end', function () {
    callback(JSON.parse(message));
  });
}

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "Content-Type": "application/json",
  "access-control-max-age": 10
};

exports.requestHandler = function(request, response) {
  var action = methods[request.method];
  var route = routes[request.url];
  if (action && route) {
    action(request, response);
  } else {
    sendResponse(response, "Not Found", 404);
  }
};
