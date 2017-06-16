var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var ArticleSchema = new BaseSchema({
    text: String, //内容
    author: String, //作者
    status: String, //状态
});

module.exports = mongoose.model('Article', ArticleSchema, 'article');