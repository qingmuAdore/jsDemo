var async = require('async');
var db = require('../../lib/db.js');
var user = require('../../model/user.js');
var area = require('../../model/area.js');
var dataType = require('../../model/dataType.js');
var camera = require('../../model/camera.js');

var _datastream, _user, _area;

function removeAll(cb) {
    async.parallel([
        function(cb) {
            user.removeAll(cb);
        },
        function(cb) {
            dataType.removeAll(cb);
        },
        function(cb) {
            camera.removeAll(cb);
        }
    ], cb);
}

async.waterfall([
    function(cb) {
        db.openDB(cb);
    },
    function(arg, cb) {
        var doc = {
            name: 'pauly',
            age: '28',
            work: 'softEngineer'
        };
        user.add(doc, cb);
    },
    function(arg, cb) {
        _user = arg._doc._id;
        var doc = {
            name: 'cmpp',
            description: 'description cmpp'
        };
        area.add(doc, cb);
    },
    function(arg, cb) {
        _area = arg._doc._id;
        var docs = [{
            name: 'name1',
            type: 'type1'
        }, {
            name: 'name2',
            type: 'type2'
        }]
        dataType.add(docs, cb);
    },
    function(arg, cb) {
        _datastream = [{
            stream: 'stream1',
            tp: arg[0]._doc._id
        }, {
            stream: 'stream2',
            tp: arg[1]._doc._id
        }];
        var docs = [{
                name: 'camera1',
                datastream: _datastream,
                user: _user,
                area: _area,
                point: { x: 12, y: 15 },
            },
            {
                name: 'camera2',
                datastream: _datastream,
                user: _user,
                area: _area,
                point: { x: 13, y: 16 },
            },
            {
                name: 'camera3',
                datastream: _datastream,
                user: _user,
                area: _area,
                point: { x: 14, y: 15 },
            },
            {
                name: 'camera4',
                datastream: _datastream,
                user: _user,
                area: _area,
                point: { x: 15, y: 16 },
            }
        ];
        camera.add(docs, cb);
    },
    function(arg, cb) {
        var query = {
            user: _user
        };
        var project = {
            datastream: 1,
            user: 1,
            area: 1,
            add: { $add: ["$point.x", "$point.y"] }
        };
        var lookup = [{
            from: 'user',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
        }, {
            from: 'area',
            localField: 'area',
            foreignField: '_id',
            as: 'area'
        }];
        camera.aggregate().match(query).lookup(lookup[0]).lookup(lookup[1]).project(project).exec(cb);
    },
    function(arg, cb) {
        // console.log(arg);
        console.log(JSON.stringify(arg));
        removeAll(cb);
    }
], function(err, res) {
    db.closeDB();
});