/**
 * mapReduce 函数来选取已发布的文章(status:"active")，
 * 并通过user_name分组，计算每个用户的文章数
 */

/*
```
map {Function}  映射函数 (生成键值对序列,作为 reduce 函数参数)。

reduce {Function} 统计函数，reduce函数的任务就是将key-values变成key-value，也就是把values数组变成一个单一的值value

out {Object, default: {inline:1}}  统计结果存放集合 (不指定则使用临时集合,在客户端断开后自动删除)。

query {Object}  一个筛选条件，只有满足条件的文档才会调用map函数。（query。limit，sort可以随意组合）

sort {Object}  和limit结合的sort排序参数（也是在发往map函数前给文档排序），可以优化分组机制

limit {Number}  发往map函数的文档数量的上限（要是没有limit，单独使用sort的用处不大）

finalize {Function} out.reduce模式用到
```

out 以下四种情形:

```
{inline:1} 
直接返回结果数组

{replace: 'collectionName'} 
把结果添加到该 表中{collectionName},其结果替换原先的表内容

{reduce: 'collectionName'} 
把结果添加到该 表中{collectionName},若含检测 finalize方法,其value值取 函数的返回值

{merge: 'collectionName'} 
把结果添加到该 表中{collectionName},如果有新内容将覆盖旧内容
```

*/

var async = require('async');
var db = require('../../lib/db.js');
var article = require('../../model/article.js');

function exit() {
    async.parallel([
        function (cb) {
            article.removeAll(cb);
        },
    ], function (err) {
        db.close();
    });
}

async.waterfall([
    function (cb) {
        db.open(cb);
    },
    function (arg, cb) {
        var doc = [{
            text: "content 01",
            author: "mark",
            status: "active"
        }, {
            text: "content 02",
            author: "mark",
            status: "active"
        }, {
            text: "content 03",
            author: "mark",
            status: "disabled"
        }, {
            text: "content 04",
            author: "runoob",
            status: "disabled"
        }, {
            text: "content 05",
            author: "runoob",
            status: "disabled"
        }, {
            text: "content 06",
            author: "runoob",
            status: "active"
        }, {
            text: "content 07",
            author: "pauly",
            status: "active"
        }, {
            text: "content 08",
            author: "pauly",
            status: "active"
        }];
        article.add(doc, cb);
    },
    function (arg, cb) {
        console.log(arg);
        var o = {
            map: function () { emit(this.author, this.text); },
            reduce: function (key, values) { return values.join('|'); },
            query: { status: "active" },
            // function: function (k, v) {
            //     return { key: k, kkk: 'fasfasdf' };
            // },
            // out: { replace: 'replaceResultCollections' },
            // out: { reduce: 'reduceResultCollections' },
            // out: { merge: 'mergeResultCollections' },
        };
        article.mapReduce(o, cb);
    }
], function (err, res) {
    /*
[ { _id: 'mark', value: 'content 01|content 02' },
  { _id: 'pauly', value: 'content 07|content 08' },
  { _id: 'runoob', value: 'content 06' } ]
   */
    console.log(res);
    exit();
});