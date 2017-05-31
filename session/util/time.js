/** index  toInt */
function offset(index) {
    var v = parseInt(index, 10);
    v = Number.isNaN(v) ? 0 : v;
    return v;
}

/**
 * the month days 
 */
function days(year, month) {
    var date = new Date(year, month, 0);
    // console.log(date.toLocaleString());
    return date.getDate();
}


exports.day = function(index) {
    var date = new Date();
    index = offset(index) + date.getDate();
    var list = [];
    var count = 24 + 1;
    date.setDate(index);
    for (var i = 0; i < count; i++) {
        date.setHours(i);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        // console.log(date.toLocaleString());
        list.push(date.getTime());
    }
    return list;
}

/**
 * week
 * 
 * the day is first day 
 */
exports.week = function(index) {
    index = offset(index) * 7;
    var count = 7 + 1;
    var list = [];
    for (var i = 0; i < count; i++) {
        var date = new Date();
        date.setDate(index + date.getDate() + i);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        // console.log(date.toLocaleString());
        list.push(date.getTime());
    }
    return list;
}

/**
 * the monday is first day of the week 
 */
exports.naturalWeek = function(index) {
    index = offset(index) * 7;
    var day = new Date().getDay() || 7;
    var count = 7 + 1;
    var list = [];
    for (var i = 0; i < count; i++) {
        var date = new Date();
        date.setDate(index + date.getDate() + i + 1 - day);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        // console.log(date.toLocaleString());
        list.push(date.getTime());
    }
    return list;
}

exports.month = function(index) {
    var date = new Date();
    index = offset(index);
    var list = [];
    var count = days(date.getFullYear(), date.getMonth() + index + 1) + 1;
    // console.log(index + ' ' + count);
    for (var i = 0; i < count; i++) {
        var date = new Date();
        date.setMonth(index + date.getMonth());
        date.setDate(i + 1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        // console.log(date.toLocaleString());
        list.push(date.getTime());
    }
    return list;
}

exports.year = function(index) {
    var date = new Date();
    index = offset(index) + date.getFullYear();
    var list = [];
    var count = 12 + 1;
    for (var i = 0; i < count; i++) {
        // can over the date range()
        date.setFullYear(index);
        date.setMonth(i);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        // console.log(date.toLocaleString());
        list.push(date.getTime());
    }
    return list;
}

function prefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

/**
 * 日期到天的字符串
 */
exports.dayString = function() {
    var date = new Date();
    return date.getFullYear()　 + prefixInteger(date.getMonth() + 1, 2) + prefixInteger(date.getDate(), 2);
}