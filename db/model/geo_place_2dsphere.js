var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BaseSchema = require('./base.js');

var Place2dsphereSchema = new BaseSchema({
    name: String,
    location: {
        coordinates: [Number],
        type: {
            type: String,
            default: 'Point'
        },
    },
});

Place2dsphereSchema.index({ 'location': '2dsphere' });
// Place2dsphereSchema.index({ 'location.coordinates': '2dsphere' }); //Error

module.exports = mongoose.model('Place2dsphere', Place2dsphereSchema, 'place2dsphere');