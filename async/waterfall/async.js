var FUNC_ERROR_TEXT = 'Expected a function';
var nativeMax = Math.max;
var isArray = Array.isArray;
function noop() { }
function once(fn) {
    return function () {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}
function onlyOnce(fn) {
    return function () {
        if (fn === null) throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}
function apply(func, thisArg, args) {
    var length = args.length;
    switch (length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
}

function rest(func, start) {
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
    return function () {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
            array[index] = args[start + index];
        }
        switch (start) {
            case 0: return func.call(this, array);
            case 1: return func.call(this, args[0], array);
            case 2: return func.call(this, args[0], args[1], array);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
            otherArgs[index] = args[index];
        }
        otherArgs[start] = array;
        return apply(func, this, otherArgs);
    };
}

/**
 * Array.concat
 * 
 *[1,2,3].concat([4,5])  ====> [1,2,3,4,5]
 */
function waterfall(tasks, cb) {
    cb = once(cb || noop);
    if (!isArray(tasks)) return cb(new Error('First argument to waterfall must be an array of functions'));
    if (!tasks.length) return cb();
    var taskIndex = 0;
    function nextTask(args) {
        // complete 
        if (taskIndex === tasks.length) {
            // callback
            return cb.apply(null, [null].concat(args));
        }
        var taskCallback = onlyOnce(rest(function (err, args) {
            // err interrupt
            if (err) {
                //callback
                return cb.apply(null, [err].concat(args));
            }
            //next task
            nextTask(args);
        }));
        args.push(taskCallback);
        var task = tasks[taskIndex++];
        //run 
        task.apply(null, args);  
    }
    nextTask([]);
}

exports.waterfall = waterfall;