var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseSchema = require('./base.js');

var PlaceSchema = new BaseSchema({
    name: String,
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number],
    }
});

// PlaceSchema.index({ coordinates: '2d' });
PlaceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Place', PlaceSchema, 'place');