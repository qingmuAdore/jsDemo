var o = {};
var bValue = 38;
Object.defineProperty(o, '_b', {
    get: function () {
        console.log('get');
        return bValue;
    },
    enumerable: true,
    configurable: true
});


console.log(o._b);
o._b = 133;
console.log(o._b);
bValue = 234;
console.log(o._b);