/**
 * 字符串 常用处理
 */
function Regular() {
}

// 判断输入是否是一个由 0-9 / A-Z / a-z 组成的字符串
Regular.prototype.isAlphaNumber = function (str) {
    var result = str.match(/^[a-zA-Z0-9]+$/);
    if (result == null)
        return false;
    return true;
}

// 判断输入是否是一个 数字字符串
Regular.prototype.isNumberStr = function (str) {
    var result = str.match(/^[0-9]+$/);
    if (result == null)
        return false;
    return true;
}

//判断是否是 saeID 
Regular.prototype.isSAEId = function (str) {
    var result = str.match(/^\d{2}-\d{4}-\d{5}$/);
    if (result == null)
        return false;
    return true;
}


// 判断输入是否是一个数字--(数字包含小数)--
Regular.prototype.isNumber = function (str) {
    return !isNaN(str);
}

// 判断输入是否是有效的长日期格式 - "YYYY-MM-DD HH:MM:SS" || "YYYY/MM/DD HH:MM:SS"
Regular.prototype.isDatetime = function (str) {
    var result = str.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
    if (result == null) return false;
    var d = new Date(result[1], result[3] - 1, result[4], result[5], result[6], result[7]);
    return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4] && d.getHours() == result[5] && d.getMinutes() == result[6] && d.getSeconds() == result[7]);
}

// 检查是否为 YYYY-MM-DD || YYYY/MM/DD 的日期格式
Regular.prototype.isDate = function (str) {
    var result = str.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (result == null) return false;
    var d = new Date(result[1], result[3] - 1, result[4]);
    return (d.getFullYear() == result[1] && d.getMonth() + 1 == result[3] && d.getDate() == result[4]);
}


// 判断输入是否是有效的电子邮件
Regular.prototype.isEmail = function (str) {
    var result = str.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
    if (result == null) return false;
    return true;
}

// 判断是否为手机号码 
Regular.prototype.isMobile = function (str) {
    if (str && str.length == 11) {
        var phoneReg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
        var result = str.match(phoneReg);
        if (result == null) return false;
        return true;
    }
    return false;
}

//匹配国内电话号码(0511-4405222 或 021-87888822)
Regular.prototype.isTelephone = function (str) {
    var result = str.match(/\d{3}-\d{8}|\d{4}-\d{7}/);
    if (result == null) return false;
    return true;
}

//匹配中国邮政编码(6位)
Regular.prototype.isPostCode = function (str) {
    var result = str.match(/[1-9]\d{5}(?!\d)/);
    if (result == null) return false;
    return true;
}


// 去除字符串的首尾的空格
Regular.prototype.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}


// 返回字符串的实际长度, 一个汉字算2个长度
Regular.prototype.strlen = function (str) {
    return str.replace(/[^\x00-\xff]/g, "**").length;
}


module.exports = new Regular();