/**
 * 全局替换
 * 
 * @reallyDo (String | RegExp)代表被替换的字符串
 * @replaceWidth (String)代表替换的字符串
 * @ignoreCase (Boolean)为是否忽略大小写
 */
String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}

/**
 * judge res is exist
 * 
 * @res is not array, judge res isn't empty
 * @res is array,judge res has child 
 */
exports.hasValue = function (res) {
    if (res instanceof Array) {
        return res.length > 0;
    }
    return res != null;
}

/**
 * key value
 */
exports.kv = function (key, value) {
    var o = {};
    var value = value || {};
    if (key == null) {
        throw "key is null";
    }
    if (typeof key != 'string') {
        key = key.toString();
    }
    o[key] = value;
    return o;
}

/**
 * value is empty
 */
exports.isEmpty = function (value) {
    if (value == null || typeof value === 'undefined') {
        return true;
    }
    return (typeof value === 'string' && value.length == 0) ||
        (Array.isArray(value) && value.length === 0) ||
        (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
}

exports.compare = function (p1, p2) {
    var type1 = typeof p1;
    var type2 = typeof p2;
    if ((typeof p1) != (typeof p2)) throw 'cannot compare : type is different';
    if (type1 == 'number') return p1 - p2;
    if (type1 == 'string') return p1.localeCompare(p2);
    throw 'cannot support ' + type1 + ' format';
}

exports.timestamp = function () {
    return new Date().getTime();
}

/**
 * parse str to object
 * 
 * @throwErr:default true
 * 
 */
exports.parse = function (jstr, throwErr) {
    var json = null;
    if (typeof jstr === 'object') {
        json = jstr;
    } else if (typeof jstr === 'string') {
        try {
            json = JSON.parse(jstr);
        } catch (error) {
            if (typeof throwErr == 'undefined') {
                throwErr = true;
            }
            if (throwErr) throw 'cannot parse the string:' + jstr;
            json = {};
        }
    }
    return json;
}

/**
 * jstr  object to str
 * 
 *@ throwErr:default true
 */
exports.jstr = function (doc, throwErr) {
    var jstr = null;
    if (typeof doc === 'string') {
        jstr = doc;
    } else if (typeof doc === 'object') {
        try {
            jstr = JSON.stringify(doc);
        } catch (error) {
            if (typeof throwErr == 'undefined') {
                throwErr = true;
            }
            if (throwErr) throw 'cannot stringify the document';
            jstr = doc.toString();
        }
    }
    return jstr;
}

/**
 * 字符串插入 指定字符串
 * 
 * @str 目标字符串
 * @replace 插入字符串
 * @length 插入间隔
 */
exports.insertAll = function (str, replace, length) {
    // var re = new RegExp("\\d{1," + length + "}", "g");
    var reg = new RegExp("(\\S{" + length + "})", "g");
    var ma = str.match(reg);
    return ma.join(replace);
}


// 转字符串 
exports.toString = function (obj) {
    obj = obj || "";
    return obj.toString();
}

exports.toInt = function (str) {
    var v = parseInt(str, 10);
    v = Number.isNaN(v) ? 0 : v;
    return v;
}

exports.toNumber = function (str) {
    return Number(str);
}


exports.RangeType = RangeType = {
    DEFAULT: 0,
    UPPER: 1,
    LOWER: 2,
    NUMBER: 3,
    UPPER_NUMBER: 4,
    LOWER_NUMBER: 5,
    UPPER_LOWER_NUMBER: 6,
    CUSTOM: 7,
}


/**
 * random string, default length is 24
 * 
 * @len: length
 * @type: the range of string 
 * @chars: the custom range
 */
exports.random = function (len, type, chars) {
    len = len || 24;
    type = type || RangeType.DEFAULT;
    var $chars = '';
    switch (type) {
        case RangeType.UPPER:
            $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case RangeType.LOWER:
            $chars = 'abcdefhijklmnopqrstuvwxyz';
            break;
        case RangeType.NUMBER:
            $chars = '0123456789';
            break;
        case RangeType.UPPER_NUMBER:
            $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            break;
        case RangeType.LOWER_NUMBER:
            $chars = 'abcdefhijklmnopqrstuvwxyz0123456789';
            break;
        case RangeType.CUSTOM:
            $chars = chars;
            break;
        default:
            $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijklmnopqrstuvwxyz0123456789';
            break;
    }
    var maxPos = $chars.length;
    var res = '';
    for (var i = 0; i < len; i++) {
        res += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return res;
}