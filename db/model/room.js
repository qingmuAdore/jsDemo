var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new mongoose.Schema({
    name: String,
    scope: {
        type: [[Number]],
        index: {
            type: '2d',
            sparse: true
        }
    }
});

module.exports = mongoose.model('Goods', RoomSchema, 'goods');