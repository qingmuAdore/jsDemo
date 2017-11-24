/**
 * @author pzhang
 * @version v1.0.0
 */

const mongoose = require('mongoose');
const glob = require("glob");
const path = require('path');
mongoose.Promise = Promise;


/**
 * 
 * @param {String} url 数据库地址
 * @param {Object} options 配置
 * @param {Function} done 执行方法(回调行数)
 * 
 */
exports.open = function (url, options = {}, done) {
    done = done || function () { };
    options = Object.assign({
        useMongoClient: true,
        autoReconnect: true,
        poolSize: 5,
        keepAlive: true,
        connectTimeoutMS: 30000
    }, options);
    console.log('mongodb connect ' + url);
    let conn = mongoose.createConnection(url, options);
    conn.on('error', (err) => {
        console.error(url, 'error event:', err);
        throw err;
    });
    conn.on('close', (res) => console.log(url, 'close event'));
    conn.on('open', (res) => console.log(url, 'open event'));
    conn.on('connect', (res) => console.log(url, 'connect:event'));
    return conn;
}

exports.close = function (conn, done) {
    done = done || function () { };
    if (conn) conn.close(done);
}