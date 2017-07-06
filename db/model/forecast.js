var mongoose = require('mongoose');
var BaseSchema = require('./base.js');

var ForecastSchema = new BaseSchema({
    _id: Number,
    title: String,
    tags: [String],
    year: Number,
    subsections: [{
        subtitle: String,
        tags: [String],
        content: Object
    }]
});

module.exports = mongoose.model('Forecast', ForecastSchema, 'forecast');