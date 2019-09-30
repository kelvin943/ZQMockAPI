var fs   = require("fs");
var path = __dirname + "/" + "resource/local_data/"
//添加的新用户数据
var newUser = {
    "user4" : {
       "id": 4,
       "name" : "mohit",
       "password" : "password4",
       "profession" : "teacher"
    }
}
var resultModel = {
    "msg": "OK",
    "code": "200",
}

module.exports = function(app) {
    app.get('/users/list', function (req, res) {
        fs.readFile( path + "users.json", 'utf8', function (err, data) {
            // console.log( data );
            // 发送 HTTP 头部
            // HTTP 状态值: 200 : OK
            // 内容类型: text/plain
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end( data );
        });
     })
    app.get('/addUser', function (req, res) {
         // 读取已存在的数据
         fs.readFile( path + "users.json", 'utf8', function (err, data) {
             //将读取到内容转化 JSON 对象再操作
             var data = JSON.parse( data );
             var listUser = data.list;
             listUser.push(newUser.user4)
             listUser.push(newUser.user4)
             listUser.push(newUser.user4)
             listUser.push(newUser.user4)
             // console.log( data );
             // 发送 HTTP 头部 
             // HTTP 状态值: 200 : OK
             // 内容类型: text/plain
             res.writeHead(200, {'Content-Type': 'text/plain'});
             //将 json 对象转换 json 字符串输入
             res.end(JSON.stringify( data ));
         });
    })
    // 查询用户信息 (放到前边会拦截其他请求)
    app.get('/user/:id', function (req, res) {
         // 首先我们读取已存在的用户
         fs.readFile( path + "users.json", 'utf8', function (err, data) {
             //将读取到内容转化 JSON 对象在操作
             var data = JSON.parse( data );
             var listUser = data.list;
             var userId =  req.params.id
             var resultUser;
             listUser.some((element,i)=> {
                 if (element.id == userId){
                     resultUser = element;
                     //跳出循环
                     return true;
                 }
             });
             var result =  {...resultModel};
             if (resultUser == undefined) {
                 result.data = 'null'
             }else {
                 result.data = resultUser
             }
             result  =  JSON.stringify( result )
             // console.log( data );
             // 发送 HTTP 头部 
             // HTTP 状态值: 200 : OK
             // 内容类型: text/plain
             res.writeHead(200, {'Content-Type': 'text/plain'});
             res.end( result );
         });
    }) 
    app.post('/user', function (req, res) {
         // 读取已存在的数据
         fs.readFile( path + "users.json", function (err, data) {
             //将读取到内容转化 JSON 对象再操作
             var data = JSON.parse( data );
             var listUser = data.list;
             var user;
             user.id         = req.body.id;
             user.name       = req.body.name;
             user.password   = req.body.password;
             user.profession = req.body.profession;
     
             listUser.push(user)
             // console.log( data );
             // 发送 HTTP 头部 
             // HTTP 状态值: 200 : OK
             // 内容类型: text/plain
             res.writeHead(200, {'Content-Type': 'text/plain'});
             //将 json 对象转换 json 字符串输入
             res.end(JSON.stringify( data ));
         });
    })
}

