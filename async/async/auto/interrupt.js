/**
 * auto
 * 
 * @ 并行 串行混合
 * @若中途出现错误:
 *    会把该错误传给最终callback，返回已执行的结果
 */

var async = require('async');

async.auto({
    default_param: function (cb) {
        console.log('in default_param');
        // async code to get some data 
        cb(null, 'param');
    },
    get_data: function (cb) {
        console.log('in get_data');
        // async code to get some data 
        cb('get data error', 'data', 'converted to array');
    },
    make_folder: function (cb) {
        console.log('in make_folder');
        // async code to create a directory to store a file in 
        // this is run at the same time as getting the data 
        cb(null, 'folder');
    },
    write_file: ['default_param', 'get_data', 'make_folder', function (results, cb) {
        console.log('in write_file', JSON.stringify(results));
        // once there is some data and the directory exists, 
        // write the data to a file in the directory 
        cb(null, 'filename');
    }],
    email_link: ['write_file', function (results, cb) {
        console.log('in email_link', JSON.stringify(results));
        // once the file is written let's email a link to it... 
        // results.write_file contains the filename returned by write_file. 
        cb(null, { 'file': results.write_file, 'email': 'user@example.com' });
    }]
}, function (err, results) {
    console.log('err = ', err);
    console.log('results = ', results);
});