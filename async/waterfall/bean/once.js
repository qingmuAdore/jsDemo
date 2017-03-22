function once(fn) {
    return function () {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}

var cb = function(){
    this.name = 'cb';
    console.log('callback');
}


var onceCB = once(cb);
onceCB();

