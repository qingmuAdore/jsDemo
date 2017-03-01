var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseSchema = require('./base.js');

var PlaceSchema = new Schema({//new BaseSchema({
    name: String, //名称
    lac: {
        type: { type: String },
        coordinates: []
    }
});

PlaceSchema.index({ loc: '2dsphere' });
var place = PlaceSchema.statics;

place.getQuery = function (param) {
    return { name: param };
}

module.exports = mongoose.model('Place', PlaceSchema, 'place');