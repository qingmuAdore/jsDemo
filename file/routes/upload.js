/**
 * 文件上传
 */
var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
    //文件路径
    destination: function (req, file, cb) {
        console.log(__dirname + '/../public/files');
        cb(null, __dirname + '/../public/files');
    },
    //文件名称
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

var upload = multer({ storage: storage });

//单位件上传   
//注意上传界面中的 <input type="file" name="avatar"/>中的name必须是下面代码中指定的名称  
// router.post('/singleUpload', upload.single('avatar'), function(req, res, next) {
//     // req.file is the `avatar` file   
//     // req.body will hold the text fields, if there were any   
//     console.log(req.file);
//     console.log(req.body);

//     res.end("上传成功");
// });

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

function display(req, res, next) {
    res.render('upload.html');
}

router.route('/').post(display).get(display);

var singleDeal = upload.single('avatar');

//单文件上传
//
// router.post('/singleUpload', upload.single('avatar'), load);
//带错误处理
router.post('/singleUpload', function (req, res) {
    singleDeal(req, res, function (err) {
        console.log(req.body);
        if (err) return res.send({ err: err });
        res.send('success');
    })
})

//多附件上传  
//注意上传界面中的 <input type="file" name="photos"/>中的name必须是下面代码中指定的名 
router.post('/mulUpload', upload.array('photos', 12), multiLoad);



module.exports = router;