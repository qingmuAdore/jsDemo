/**
 * combine obj we purpose: retain the o's field and combine the n'filed,if
 * the old/new object has the same field,use the new object field
 * 
 * @o old object
 * @n new object
 * 
 * @return new obj
 */
exports.combine = function (o, n) {
    if (typeof o != 'object') {
        throw 'not object type';
    }
    var obj = {};
    for (var f in o) {
        obj[f] = o[f];
    }
    if (typeof n === 'object') {
        for (var f in n) {
            obj[f] = n[f];
        }
    }
    return obj;
}

/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'foo',name:'a'}
 *       , b = { bar: 'bar',name:'b' };
 *
 *     merge(a, b);
 *     // => { foo: 'foo', bar: 'bar',name:'b' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api public
 */
exports.merge = function (a, b) {
    if (a && b) {
        for (var key in b) {
            a[key] = b[key];
        }
    }
    return a;
};

/**
 * trim the empty field
 * 
 * var a = {name:'pauly',age:null,work:'engineer'};
 * trim(a);
 * //=> {name:'pauly',work:'engineer'};
 * 
 */
exports.trim = function (o) {
    var obj = o || {};
    if (typeof obj === 'object') {
        for (var f in obj) {
            if (obj[f] == null) {
                //delete obj.f ;// don't work 
                delete obj[f];
            }
        }
    }
    return obj;
}


/**
 * compare:lObj is equal rObj?
 */
exports.compare = function (l, r) {
    // If both x and y are null or undefined and exactly the same 
    if (l === r) {
        return true;
    }

    // If they are not strictly equal, they both need to be Objects 
    if (!(l instanceof Object) || !(r instanceof Object)) {
        return false;
    }

    //They must have the exact same prototype chain,the closest we can do is
    //test the constructor. 
    if (l.constructor !== r.constructor) {
        return false;
    }

    for (var p in l) {
        //Inherited properties were tested using x.constructor === y.constructor
        if (l.hasOwnProperty(p)) {
            // Allows comparing x[ p ] and y[ p ] when set to undefined 
            if (!r.hasOwnProperty(p)) {
                return false;
            }

            // If they have the same strict value or identity then they are equal 
            if (l[p] === r[p]) {
                continue;
            }

            // Numbers, Strings, Functions, Booleans must be strictly equal 
            if (typeof (l[p]) !== "object") {
                return false;
            }

            // Objects and Arrays must be tested recursively 
            if (!Object.equals(l[p], r[p])) {
                return false;
            }
        }
    }

    for (p in r) {
        // allows x[ p ] to be set to undefined 
        if (r.hasOwnProperty(p) && !l.hasOwnProperty(p)) {
            return false;
        }
    }
    return true;
};

/**
 * property
 * 
 * 属性
 */
exports.property = function (obj) {
    obj = obj || {};
    Object.defineProperties(obj, {
        lenField: {
            enumerable: false,
            get: function () {
                var len = 0;
                for (var i in this) {
                    if (typeof this[i] != 'function')++len;
                }
                return len;
            }
        },
        lenFun: {
            enumerable: false,
            get: function () {
                var len = 0;
                for (var i in this) {
                    if (typeof this[i] == 'function')++len;
                }
                return len;
            }
        },
        lenAll: {
            enumerable: false,
            get: function () {
                var len = 0;
                for (var i in this) {
                    ++len;
                }
                return len;
            }
        },
    });
    return obj;
}
