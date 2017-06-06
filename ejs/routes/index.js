var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

//对象显示
router.get('/home', function (req, res) {
    res.render('home', {
        title: 'home',
        user: {
            name: 'pauly',
            age: 10
        }
    });
});

//ifelse
router.get('/ifelse', function (req, res) {
    res.render('ifelse', {
        title: 'home',
        user: null
    });
});

//数组
function list(req, res) {
    res.render('list', {
        title: 'list',
        users: [
            { name: 'tj' },
            { name: 'mape' },
            { name: 'guillermo' }
        ]
    });
}

//自定义分隔符
function delimiter(req, res) {
    res.render('delimiter', {
        title: 'delimiter',
        users: [
            'geddy', 'neil', 'alex'
        ],
        delimiter: '?',
    });
}

function ergodic(req, res) {
    res.render('ergodic', {
        title:'ergodic',
        person: {
            name: 'pauly',
            age: 10
        },
        users: [
            { name: 'tj' },
            { name: 'mape' },
            { name: 'guillermo' }
        ]
    });
};


function select(req, res) {
    res.render('select', {
        title: 'select',
        users: [
            { name: 'tj' },
            { name: 'mape' },
            { name: 'guillermo' }
        ]
    });
}

router.route('/list').get(list);
router.route('/delimiter').get(delimiter);
router.route('/select').get(select);
router.route('/ergodic').get(ergodic);

module.exports = router;