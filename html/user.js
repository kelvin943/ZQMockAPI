
var express = require('express');
var app  = express();
var fs   = require("fs");
var local_data_path = process.cwd() + "/resource/local_data/"
var upload_path = process.cwd() + "/upload_resource/"
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use('/public', express.static('public'));
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname  + "/index.html" );
})
app.post('/user/add', urlencodedParser, function (req, res) {
   // 接受 post 传参
   var add_user = {
       "name":req.body.name,
       "password":req.body.password,
       "profession":req.body.profession,
       "department":req.body.department,
   };

   fs.readFile( local_data_path + "users.json", 'utf8', function (err, data) {
    //将读取到内容转化 JSON 对象再操作
    var data = JSON.parse( data );
    var listUser = data.list;
    listUser.push(add_user)
    // console.log( data );
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    res.writeHead(200, {'Content-Type': 'text/plain'});
    //将 json 对象转换 json 字符串输入
    res.end(JSON.stringify( data ));
   });
})

app.get('/upload.html', function (req, res) {
    res.sendFile( __dirname  + "/upload.html" );
})
var multer  = require('multer');

app.use('/public', express.static('public'));
app.use( urlencodedParser );
app.use(multer({ dest: '/tmp/'}).array('image'));

app.post('/file_upload', function (req, res) {
 
    console.log(req.files[0]);  // 上传的文件信息
    var des_file = upload_path + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
         fs.writeFile(des_file, data, function (err) {
          if( err ){
               console.log( err );
               response = {
                message:'File uploaded failed', 
                errInfo: err.data
               };
          }else{
                response = {
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
               };
           }
           console.log( response );
           res.end( JSON.stringify( response ) );
        });
    });
 })



var server = app.listen(8081, function () {
    //var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://127.0.0.1:%s", port)
})



