var mongoose = require('mongoose');
var url = 'mongodb://localhost/dbTest';

if (global.Promise) {
    mongoose.Promise = global.Promise;
}

exports.open = function (cb) {
    cb = cb || function () { };
    console.log('mongodb connect ' + url);
    mongoose.connect(url, { useMongoClient: true }).then(function (db) {
        console.log('mongodb connected');
        cb(null, db);
    }, function (reason) {
        console.log(reason);
        cb(reason);
    })
}

exports.close = function (cb) {
    cb = cb || function () { };
    mongoose.disconnect(cb);
}