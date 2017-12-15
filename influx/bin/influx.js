const Influx = require('influx');
const options = require('../config').influx;
const schema = require('./schame');

const influx = new Influx.InfluxDB(Object.assign({}, options, { schema: schema }));

module.exports = influx;
