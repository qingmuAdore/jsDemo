/**
 * mongodb service
 */
var mongoose = require('mongoose');
var connection = mongoose.connection;
var url = 'mongodb://localhost/session';

if (global.Promise) {
    mongoose.Promise = global.Promise;
}

function onError() {
    console.error.bind(console, 'mongodb connection error')
}

function onOnce() {
    console.log('mongodb connected.');
}

exports.open = function (cb) {
    cb = cb || function () { };
    connection.on('error', onError);
    connection.once('open', onOnce);
    console.log('mongodb connect ' + url);
    mongoose.connect(url, function (err, res) {
        if (err) {
            console.log('mongodb connect error: ' + err);
            process.exit(-1);
            return;
        }
        cb(err, res);
        console.log('mongodb connecting...');
    });
}

exports.close = function (cb) {
    cb = cb || function () { };
    mongoose.disconnect(cb);
}