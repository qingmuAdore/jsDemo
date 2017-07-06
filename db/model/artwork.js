var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var ArtworkSchema = new BaseSchema({
    _id: Number,
    title: String,
    artist: String,
    year: Number,
    price: Number,
    tags: [String]
});

module.exports = mongoose.model('Artwork', ArtworkSchema, 'artwork');