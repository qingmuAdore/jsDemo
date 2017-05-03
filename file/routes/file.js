/**
 * 图片数据读取
 */
var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var router = express.Router();


function display(req, res, next) {
    res.render('upImg.html');
}

function apply(req, res) {
    var cacheFolder = 'public/file';
    if (!fs.existsSync(cacheFolder)) {
        fs.mkdirSync(cacheFolder);
    }
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = cacheFolder; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.type = true;
    var displayUrl;
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        var extName = ''; //后缀名
        switch (files.upload.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length === 0) {
            res.send({
                code: 202,
                msg: '只支持png和jpg格式图片'
            });
            return;
        } else {
            var avatarName = '/' + Date.now() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            displayUrl = avatarName;
            // fs.renameSync(files.upload.path, newPath); //重命名
            // var buf = fs.readFileSync(files.upload.path);
            // fs.writeFileSync(newPath);
            res.send({
                code: 200,
                avatarName: avatarName
            });
        }
    });
}

router.route('/').post(display).get(display);
router.route('/apply').post(apply);

module.exports = router;