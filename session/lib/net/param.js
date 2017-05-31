var obj = require('../../util/obj.js');

/**
 * http method
 */
var METHOD = {
    GET: 'GET',
    POST: 'POST'
};

/**
 * req.method
 * 
 * @return param
 */
module.exports = function (req) {
    var param = req.query;
    if (req.method == METHOD.GET) {
        param = req.query;
    } else if (req.method == METHOD.POST) {
        param = obj.merge(req.query, req.body);
    }
    return param || {};
}