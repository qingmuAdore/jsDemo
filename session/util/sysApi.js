/**
 * the system api
 */

/**
 * format 
 * 
 * var info = "http://{0}/{1}".format("www.cmpp.com", "index.html");
 * //=> info = "http://www.cmpp.com/index.html";
 */
String.prototype.format = function() {
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++) {
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    }
    return s;
};


/**
 * 全局替换
 * 
 * @reallyDo (String | RegExp)代表被替换的字符串
 * @replaceWidth (String)代表替换的字符串
 * @ignoreCase (Boolean)为是否忽略大小写
 *  
    eg:
    var a = "xxxXxxx";

    console.log(a.replaceAll("x", 'a')); //输出 aaaXaaa
    console.log(a.replaceAll("x", "a", true)); //输出 aaaaaaa
 */
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}


/**
 * the o'type 
 * 
 *  return {String Number Boolean Array Object Null Undefined}
 * eg:
 *  type(1) : Number
 */
exports.type = function(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    //开始的索引值8到倒数第一位 [object Function] --->结果为 Function
    return Object.prototype.toString.call(o).slice(8, -1);
}