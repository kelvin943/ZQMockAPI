var fs   = require("fs");
var path = __dirname + "/" + "resource/local_data/"

module.exports = function(app) {
    app.get('/project/list', function (req, res) {
        fs.readFile( path + "project_list.json", 'utf8', function (err, data) {
            // console.log( data );
            // 发送 HTTP 头部
            // HTTP 状态值: 200 : OK
            // 内容类型: application/json
            res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8',
                                'Accept': '*/*'});
            res.end( data );
        });
     })

     app.get('/project/detail', function (req, res) {
        fs.readFile( path + "detail.json", 'utf8', function (err, data) {
            // console.log( data );
            // 发送 HTTP 头部
            // HTTP 状态值: 200 : OK
            // 内容类型: application/json
            res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8',
                                'Accept': '*/*'});
            res.end( data );
        });
     })

     app.get('/group/list', function (req, res) {
        fs.readFile( path + "group_list.json", 'utf8', function (err, data) {
            // console.log( data );
            // 发送 HTTP 头部
            // HTTP 状态值: 200 : OK
            // 内容类型: application/json
            res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8',
                                'Accept': '*/*'});
            res.end( data );
        });
     })



}