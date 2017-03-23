var async = require('async');
/**
 * autoInject
 * 
 * 混合时,参数列表 较auto 略有差异
 * 
 *  write_file: ['get_data', 'make_folder', function(results, callback) {}]
 *  write_file: function(get_data, make_folder, callback){}
 * 
 * @ 并行 串行混合
 */
async.autoInject({
    get_data: function (callback) {
        // async code to get some data
        callback(null, 'data', 'converted to array');
    },
    make_folder: function (callback) {
        // async code to create a directory to store a file in
        // this is run at the same time as getting the data
        callback(null);
    },
    write_file: function (get_data, make_folder, callback) {
        // once there is some data and the directory exists,
        // write the data to a file in the directory
        console.log(get_data);
        console.log(make_folder);
        callback(null, 'filename');
    },
    email_link: function (write_file, callback) {
        // once the file is written let's email a link to it...
        // write_file contains the filename returned by write_file.
        callback(null, { 'file': write_file, 'email': 'user@example.com' });
    }
}, function (err, results) {
    console.log('err = ', err);
    console.log('results = ', results);
});