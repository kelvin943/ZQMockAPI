var express = require('express');
var app  = express();

var user = require('./user');
var project  = require('./project')

var server = app.listen(8881, function () {
    //var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://127.0.0.1:%s", port)
  })

user(app);
project(app);