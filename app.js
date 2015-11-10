

/*var bcrypt = require('bcryptjs');
bcrypt.hash('admin', 10, function(err, hash){
  console.log('admin', err, hash);
});*/

var express = require('express');
var app = express();
var path = require('path');
var _host = '127.0.0.1';
var port = 3000;

app.use('/example', express.static(__dirname + '/example'));
app.use('/src', express.static(__dirname + '/src'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/example/index.html'));
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://'+_host+':'+port);
});