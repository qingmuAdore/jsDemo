const Influx = require('influx');

module.exports = [
    {
        measurement: 'stream',
        fields: {
            value: Influx.FieldType.FLOAT
        },
        tags: [
            'id',
            'name'
        ]
    }
]