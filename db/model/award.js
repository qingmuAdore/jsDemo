var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var AwardSchema = new BaseSchema({
    name: String, //名称
    total: Number, //总额(单位:分)
    num: Number, //个数
    lower: Number, //金额下限
    upper: Number, //金额上限
    divide: [{ //分裂红 render:是否领取 money:金额 (单位:分)
        render: Boolean,
        money: Number
    }],
    wish: String, //祝福语
});

var award = AwardSchema.statics;

award.getQuery = function(param) {
    return { name: param };
}

module.exports = mongoose.model('Award', AwardSchema, 'award');