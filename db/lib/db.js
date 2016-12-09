var mongoose = require('mongoose');
var url = 'mongodb://localhost/dbTest';

exports.openDB = function(callback) {
    callback = callback || function() {};

    var connection = mongoose.connection;

    connection.on('error', console.error.bind(console, 'mongodb connection error'));

    connection.once('open', function() {
        console.log('mongodb connected.');
    });

    console.log('mongodb connect ' + url);

    mongoose.connect(url, function(err) {
        if (err) {
            console.log('mongodb connect error: ' + err);
            process.exit(-1);
            return;
        }
        callback(err, null);
        console.log('mongodb connecting...');
    });
}

exports.closeDB = function(callback) {
    callback = callback || function() {};
    mongoose.disconnect(callback);
}