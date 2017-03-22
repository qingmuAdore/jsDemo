/**
 * async 

 */
var async = function () {
    this.results = [];
}

/**
 * internal function
 */
async.prototype._dealFn = function (len, cbFn) {
    return function (data) {
        this.results.push(data);
        if (this.results.length == len) {
            cbFn(this.results);
        }
    }.bind(this);
}

/*
 * @arrFn  [Function]
 * @cbFn   callback
 */
async.prototype.parall = function (arrFn, cbFn) {
    if (!(arrFn && arrFn.length)) return;
    arrFn.forEach(function (fn) {
        fn(this._dealFn(arrFn.length, cbFn));
    }, this);
}

module.exports = new async();
