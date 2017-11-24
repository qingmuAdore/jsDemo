var async = require('async');
var db = require('../../lib/db.js');
var device = require('../../model/device.js');

let qs = 'id@1,id~=00301';
let parseString = function (qs) {
    let filterArr = ['==', '!=', '>=', '<=', '>', '<', '~='];
    let mongoArr = ['$eq', '$ne', '$gte', '$lte', '$gt', '$lt', '$regex'];
    let reg = new RegExp('[a-zA-Z\_]+');      //匹配非数字字符
    //let conditions = [];
    let conditions = {};
    qs = qs.split(',');
    let vName = '';               //变量名
    let typeFlag = '1';           //变量类型，1:string, 2:number, 默认为1, 如at@2表示at为number类型
    let mongoFlag = '';
    //qs = qs.split('@'); //["tid@1", "tid==008098022c9b", "at@", "at>1508717995100", "at<1508724704042", "hid@1", "hid~=A01122330003"]
    for (let i = 0; i < qs.length; i++) {
        let str = {};
        if (qs[i].indexOf('@') > 0) {
            typeFlag = qs[i].split('@')[1] == '' ? '1' : qs[i].split('@')[1];
            vName = qs[i].split('@')[0];
        } else {
            filterArr.forEach(function (fe, fi) {
                if (qs[i].match(new RegExp(fe))) {
                    str[mongoArr[fi]] = qs[i].split(fe)[1];
                    conditions[vName] = str;
                }
                if (i < qs.length - 2 && qs[i + 1].indexOf('@') < 0) {
                    i = i + 1;
                    filterArr.forEach(function (ffe, ffi) {
                        str[mongoArr[ffi]] = qs[i - 1].split(ffe)[1];
                        conditions[vName] = str;
                    });
                }
            });
        }
    }
    return conditions;
};
let tt = parseString(qs);

console.log(tt);

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        // device.findOne(genMatch(tid)).exec(cb);
        // device.findOne({ "id": { $eq: "0030184f1695" } }).exec(cb);
        // device.findOne({ "id" : "0030184f1695" }).exec(cb);
        // device.findOne(query).exec(cb);
        // device.findOne(tt).exec(cb);
        device.aggregate().match(tt).exec(cb);
    },
], function (err, res) {
    console.log(err, res);
    db.close();
});