const oneParamMethods = ['abs', 'ceil', 'floor', 'exp', 'log10', 'ln', 'sqrt', 'trunc'];
const twoParamMethods = ['divide', 'log', 'mod', 'pow', 'subtract'];
const multiParamMethods = ['add', 'multiply'];

class ArthmeticExpress {
    constructor() {
        //this 指向问题,需要用=>函数
        this.chain = [];
        this._addOpr = (len, ...args) => {
            if (len > args.length) throw 'The arguments lenght is not match the operate';
            args.forEach(function (arg) {
                if (typeof param !== 'string' || typeof param !== 'number') throw 'The arguments type should be string or number ';
            });
            this.chain.push({
                opr: ele,
                param: args
            });
            return this;
        }

        oneParamMethods.forEach((ele) => {
            this[ele] = (...args) => {
                var param = args[0];
                if ((param || param == 0) && (typeof param === 'string' || typeof param === 'number') && this.chain.length > 0) {
                    throw 'The operate is illegal  ';
                }
                this.chain.push({
                    opr: ele,
                    param: args
                });
                return this;
            }
        });

        twoParamMethods.forEach((ele) => {
            this[ele] = (...args) => {
                this.chain.push({
                    opr: ele,
                    param: args
                });
                return this;
            }
        });

        multiParamMethods.forEach((ele) => {
            this[ele] = (...args) => {
                this.chain.push({
                    opr: ele,
                    param: args
                });
                return this;
            }
        });
    }


    clear() {
        this.chain = [];
    }

    /**
     * 读取表达式
     * 
     * @param {String} name 
     */
    toExpress(name) {
        var express = {};
        var temp = {};
        this.chain.forEach(function (ele) {
            //第一个参数需要特别处理
            if (!Object.keys(express).length) {
                express[`$${ele.opr}`] = ele.param.length == 1 ? ele.param[0] : ele.param;
            } else {
                temp = express;
                express = {};
                express[`$${ele.opr}`] = ele.param.length ? [temp, ...ele.param] : temp;
            }
        });
        if (name) {
            temp = {};
            temp[name] = express;
            express = temp;
        }
        return express;
    }
};

let art = new ArthmeticExpress();

var express = art.abs('$one').ceil().subtract('$other').toExpress();

console.log(express);