const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let CapSchema = new Schema(
    {
        name: String
    },
    {
        capped: { size: 500 }
    }
);


module.exports = mongoose.model('Cap', CapSchema, 'cap');