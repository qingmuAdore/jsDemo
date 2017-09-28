var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Mixed = Schema.Types.Mixed;
var BaseSchema = require('./base.js');

var RoomSchema = new BaseSchema({
    name: String,
    scope: {
        coordinates: [],
        type: {
            type: String,
            default: 'Polygon'
        },
    }
});

RoomSchema.index({ "scope": '2dsphere' });
// RoomSchema.index({ "scope.coordinates": '2dsphere' }); //Error

module.exports = mongoose.model('Room', RoomSchema, 'room');