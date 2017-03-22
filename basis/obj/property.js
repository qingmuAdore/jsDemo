/**
 * 复制属性的特征
 * 
 * 给Object.prototype 添加一个不可枚举的extend()方法
 * 这个方法继承自调用它的对象,将作为参数传入的对象的属性一一复制
 * 除了值之外,也复制属性的所有特征,除非在目标对象中存在同名属性,
 * 参数对象的所有自有属性(包括不可枚举属性) 也会一一复制
 */
Object.defineProperty(Object.prototype, "extend", {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function (o) {
        var names = Object.getOwnPropertyNames(o);
        for (var i = 0; i < names.length; i++) {
            if (names[i] in this) continue;
            var desc = Object.getOwnPropertyDescriptor(o, names[i]);
            Object.defineProperty(this, names[i], desc);
        }
    }
});

/**
 * 定义p, 属性含有特征
 */
var p = Object.defineProperties({}, {
    x: { value: 1, writable: true, enumerable: true, configurable: true },
    y: { value: 1, writable: true, enumerable: true, configurable: true },
    r: {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: true,
        configurable: true
    }
});

p.x = 6;
p.y = 8;
console.log(p.r); //10

var q = {
    show: function () {
        for (var k in this) {
            console.log("key:" + k + ' value:' + this[k]);
        }
    }
};
q.extend(p);
q.show();

