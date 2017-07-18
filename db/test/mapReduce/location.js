/*
计算: tag 轨迹

获取位置变更的结果集
*/

var async = require('async');
var lodash = require('lodash');
var db = require('../../lib/db.js');
var location = require('../../model/location.js');

var cTagId = '11001';

function exit() {
    async.parallel([
        function (cb) {
            location.removeAll(cb);
        },
    ], function (err) {
        db.close();
    });
}

function generateDocs(len) {
    len = len || 1000;
    var docs = [];
    for (var i = 0; i < len; i++) {
        var l = Math.ceil(Math.random() * 10);
        var r = Math.ceil(Math.random() * 10);
        var doc = {
            tag_id: cTagId,
            position: {
                coordinates: [l, r]
            },
            timestamp: i + 1
        }
        docs.push(doc);
    }
    return docs;
}

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        location.add(generateDocs(200), cb);
    },
    function (arg, cb) {
        console.log(arg);
        var o = {
            map: function () { emit(this.tag_id, this.position.coordinates) },//{ timestamp: this.timestamp, coordinates: this.position.coordinates }); },
            reduce: function (key, values) {
                return { key: key, values: values };
                // var vt = [];
                // var len = values.length;
                // values.forEach(function (ele, index) {
                //     if (index == 0) {
                //         vt.push(ele);
                //     } else if (index < len) {
                //         var other = vt[vt.length - 1];
                //         if (ele.coordinates.toString() != other.coordinates.toString()) {
                //             vt.push(ele);
                //         }
                //     }
                // });
                // return { tid: key, vt: vt }
            },
            query: { tag_id: cTagId },
            sort: { timestamp: 1 },
            // function: function (k, v) {
            //     return { key: k, kkk: 'fasfasdf' };
            // },
            // out: { replace: 'replaceResultCollections' },
            // out: { reduce: 'reduceResultCollections' },
            // out: { merge: 'mergeResultCollections' },
        };
        location.mapReduce(o, cb);
    }
], function (err, res) {
    console.log(res);
    exit();
});