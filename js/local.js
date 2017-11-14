// var http = require('http');

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World!');
// }).listen(8080);

var jsonfile = require('jsonfile');

var file = 'data/users.json';
var obj = {name: 'JP'};

jsonfile.writeFile(file, obj, function(err){console.error(err);});
// jsonfile.readFile(file, function(err, obj){console.dir(obj)});
