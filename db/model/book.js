var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var BookSchema = new BaseSchema({
    _id: Number,
    title: String,
    isbn: Number,
    author: { last: String, first: String },
    writer:String,
    copies: Number,
    lastModified: Date,
});

module.exports = mongoose.model('Book', BookSchema, 'book');