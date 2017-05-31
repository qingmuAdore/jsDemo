var express = require('express');
var router = express.Router();
var async = require('async');
var param = require('../lib/net/param.js');
var cbNet = require('../lib/net/cb.js');
var user = require('../model/user.js');

function gLogin(request, response) {
    response.render('login', {
        title: 'login'
    })
}

function login(request, response) {
    var p = param(request);
    user.findOne({ account: p.account, pwd: p.pwd }, function (err, u) {
        if (!err && !u) err = 'Account Or Password is Wrong';
        if (!err) {
            request.session.isLogin = true;
            request.session.user = u._doc;
        }
        cbNet(request, response).call(this, err, u);
    });
}

function gReg(request, response) {
    response.render('register', {
        title: 'register'
    })
}

function reg(request, response) {
    var p = param(request);
    async.waterfall([
        function (cb) {
            user.findOne({ account: p.account }, function (err, u) {
                if (!err && u) err = 'Account has registered Again';
                cb(err, u);
            });
        },
        function (u, cb) {
            user.add(p, cb);
        }
    ], cbNet(request, response));
}

router.route('/login').get(gLogin).post(login);

router.route('/reg').get(gReg).post(reg);

module.exports = router;