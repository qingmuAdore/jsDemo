const async = require('async');
const db = require('../../lib/db');
const cap = require('../../model/cap');

function gen(len = 100) {
    let docs = [];
    while (len--) {
        docs.push({ name: new Date().getTime() + '__' + len });
    }
    return docs;
}

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (conn, cb) {
        let docs = gen();
        cap.create(docs, cb);
    }
], function (err, res) {
    console.log(res);
    db.close();
});