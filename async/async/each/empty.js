var async = require('async');


async.eachSeries([],function(item,cb){
    cb(null,item);
},function(err){
    console.log(err);
});
