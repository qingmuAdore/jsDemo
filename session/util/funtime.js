/**
 *  方法执行时间 
 */
module.exports = function(fn, args, cb) {
    cb = cb || function() {}
    var start = new Date().getTime();
    var res = fn.call(this, args);
    var ts = new Date().getTime() - start;
    cb(res, ts);
}