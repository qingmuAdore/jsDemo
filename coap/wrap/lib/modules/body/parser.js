const cbor = require('./lib/cbor');

module.exports = bodyParse;
/**
 * 
 * @param {Object} opts  
 *          opts.strict Boolean    default true
 *          opts.encoding String   default 'utf8'
 */
function bodyParse(opts = {}) {
    opts.encoding = opts.encoding || 'utf8';
    opts.strict = opts.strict !== false;
    return async function (ctx, next) {
        var type = ctx.headers['Content-Format'] || ctx.headers['Content-Type'];
        var fnName = typeis(type);
        try {
            ctx.request.body = decipher[fnName](ctx.req.payload, opts);
        } catch (err) {
            err.status = '4.00';
            err.body = ctx.req.payload.toString(opts.encoding);
            throw err;
        }
        await next();
    }
}

function typeis(type) {
    let name;
    switch (type) {
        case 'application/json':
            name = 'json';
            break;
        case 'application/cbor':
            name = 'cbor';
            break;
        default:
            name = 'any';
            break;
    }
    return name;
}


var decipher = {
    any(content, opts) {
    },
    json(content, opts) {
        var strictJSONReg = /^[\x20\x09\x0a\x0d]*(\[|\{)/;
        var strict = opts.strict;
        if (!strict) return content ? JSON.parse(content) : content;
        // strict mode always return object
        if (!content) return {};
        // strict JSON test
        if (!strictJSONReg.test(content)) {
            throw new Error('invalid JSON, only supports object and array');
        }
        return JSON.parse(content);
    },
    cbor(content, opts) {
        return cbor.decode(content);
    }
}
