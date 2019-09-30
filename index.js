var express = require('express');
var app  = express();
var user = require('./user');

var server = app.listen(8081, function () {
    //var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://127.0.0.1:%s", port)
  })

// module.exports = app
user(app);