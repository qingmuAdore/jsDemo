const Influx = require('influx');
const influx = require('../bin/influx');
let querys = [
    `select * from stream where time > now() -2m and "id" = ${Influx.escape.stringLit("0030184f1677")} and "name" = ${Influx.escape.stringLit("temperature")} limit 1`,
    `select * from stream where time > now() -1m  limit 12`
];

influx.query(querys).then(results => {
    console.log(results)
});