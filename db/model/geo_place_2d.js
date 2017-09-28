var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseSchema = require('./base.js');

var Place2dSchema = new BaseSchema({
    name: String,
    location: {
        coordinates: [Number],
        type: {
            type: String,
            default: 'Point'
        },
    },
});

// Place2dSchema.index({ 'location': '2d' }); // Error
Place2dSchema.index({ 'location.coordinates': '2d' });

module.exports = mongoose.model('Place2d', Place2dSchema, 'place2d');