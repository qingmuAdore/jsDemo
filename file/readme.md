### file 

> 使用ejs模板,也能支持html后缀

```
// view engine setup
app.engine('html', ejs.__express);
```

> 文件上传

- 中间键 multer

```
var multer = require('multer');
var storage = multer.diskStorage({
    //文件路径
    destination: function(req, file, cb) {
        cb(null, 'public/file');
    },
    //文件名称
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
})

```
- 网络请求

```
var upload = multer({ storage: storage });

function load(req, res, next) {
    console.log(req.file);
    console.log(req.body);
    res.send('info');
}

function multiLoad(req, res, next) {
    // req.files is array of `photos` files   
    // req.body will contain the text fields, if there were any   
    console.log(req.files);
    console.log(req.body);
    res.end("aaaaa");
}
//单文件上传
//
router.route('/singleUpload').post(upload.single('avatar'), load);

//多附件上传  
//注意上传界面中的 <input type="file" name="photos"/>中的name必须是下面代码中指定的名 
router.post('/mulUpload', upload.array('photos', 12), multiLoad);
```

- 页面

```
<!DOCTYPE html>
<html>

<head>
    <title>NodeJs文件上传</title>
    <meta charset="utf-8" />
    <script src="/javascripts/jquery.js" type="text/javascript" language="javascript"></script>
    <script type="text/javascript">
        function ajax() {
            var formData = new FormData($("#files")[0]);
            $.ajax({
                url: '/upload/singleUpload',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    console.log(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    document.getElementById("status").innerHTML = "<span style='color:#EF0000'>连接不到服务器，请检查网络！</span>";
                }
            });
        }

        function majax() {
            var formData = new FormData($("#mfiles")[0]);
            $.ajax({
                url: '/upload/mulUpload',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    console.log(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    document.getElementById("status").innerHTML = "<span style='color:#EF0000'>连接不到服务器，请检查网络！</span>";
                }
            });
        }
    </script>

</head>

<body>
    <h2>单个文件上传</h2>
    <form method="post" enctype="multipart/form-data" id="files">
        <input type="file" name="avatar" /><br/>
        <input type="text" name="aaaa" /><br/>
        <input type="text" name="bbb" /><br/>
        <input type="button" value="submit" onclick="ajax()" /><br/>
    </form>

    <h2>多文件上传</h2>
    <form method="post" enctype="multipart/form-data" id="mfiles">
        <input type="file" name="photos" /><br/>
        <input type="file" name="photos" /><br/>
        <input type="file" name="photos" /><br/>
        <input type="text" name="aaaa" /><br/>
        <input type="text" name="bbb" /><br/>
        <input type="button" value="submit" onclick="majax()" /><br/>
    </form>
</body>

</html>
```