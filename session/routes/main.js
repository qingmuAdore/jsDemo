var express = require('express');
var router = express.Router();
var async = require('async');

function show(request, response) {
    if (!request.session.isLogin) return response.redirect('/user/login');
    response.render('main',{
        title:'main',
        user:request.session.user
    });
}

router.route('/').get(show);

module.exports = router;