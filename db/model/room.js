var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Mixed = Schema.Types.Mixed;
var BaseSchema = require('./base.js');

var RoomSchema = new BaseSchema({
    name: String,
    scope: {
        // coordinates: [[{ type: Number }]],
        // coordinates: [[Number]],
        coordinates: [],
        type: {
            type: String,
            default: 'Polygon'
        },
        // coordinates: [mongoose.Schema.Types.Mixed],
        // index: '2dsphere'// { type: '2dsphere', sparse: true }
    },
  
});

// RoomSchema.index({ coordinates: '2dsphere' });
RoomSchema.index({ scope: '2dsphere' });

module.exports = mongoose.model('Room', RoomSchema, 'room');