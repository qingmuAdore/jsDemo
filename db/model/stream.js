var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StreamSchema = new Schema({
    did: String,
    sname: String,
    stream: Number,
    timestamp: Number
});

module.exports = mongoose.model('Stream', StreamSchema, 'stream');