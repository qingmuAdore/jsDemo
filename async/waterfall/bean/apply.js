/**
 *  apply 
 *  
 * apply 引入环境(类似继承),附上参数
 */
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

var say = function (deal, arg) {
    this.welcome = "Welcome!";
    apply(deal, this, arg);
}

var done = function () {
    console.log(this.welcome + " " + arguments[0]);
}

say(done, ['pauly', 'keil', 'waili']);