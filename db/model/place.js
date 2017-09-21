var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseSchema = require('./base.js');

var PlaceSchema = new BaseSchema({
    name: String,
    location: {
        coordinates: [Number],
        type: {
            type: String,
            default: 'Point'
        },
    },
});

PlaceSchema.index({ location: '2dsphere' });


module.exports = mongoose.model('Place', PlaceSchema, 'place');