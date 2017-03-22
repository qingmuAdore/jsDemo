var async = require('async');

async.autoInject({
    default_param: function (cb) {
        // async code to get some data 
        cb(null, 'param');
    },
    get_data: function (cb) {
        // async code to get some data 
        cb('get data error', 'data', 'converted to array');
    },
    make_folder: function (cb) {
        // async code to create a directory to store a file in 
        // this is run at the same time as getting the data 
        cb(null, 'folder');
    },
    write_file: ['default_param', 'get_data', 'make_folder', function (default_param, get_data, make_folder, cb) {
        // once there is some data and the directory exists, 
        // write the data to a file in the directory 
        cb(null, 'filename');
    }],
    email_link: ['write_file', function (results, cb) {
        // once the file is written let's email a link to it... 
        // results.write_file contains the filename returned by write_file. 
        cb(null, { 'file': results.write_file, 'email': 'user@example.com' });
    }]
}, function (err, results) {
    console.log('err = ', err);
    console.log('results = ', results);
});