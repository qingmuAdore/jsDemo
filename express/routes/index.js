var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

function session(req, res) {
    var sess = req.session
    if (sess.views) {
        sess.views++
            res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + sess.views + '</p>')
        res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        sess.views = 1
        res.end('welcome to the session demo. refresh!')
    }
}

function cookie(req, res) {
    var cook = req.cookies;
    res.send(cook.username);
}


router.route('/session').get(session);
router.route('/cookie').get(cookie);


module.exports = router;