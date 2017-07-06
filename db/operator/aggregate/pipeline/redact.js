/**
 * $redact
 * 
 * mongoose 未实现该管道接口
 * 
 根据文档本身存储的信息限制文档的内容

 系统变量:
$$DESCEND  返回包含当前document级别的所有字段，并且会继续判字段包含内嵌文档，内嵌文档的字段也会去判断是否符合条件
$$PRUNE	   返回不包含当前文档或者内嵌文档级别的所有字段，不会继续检测此级别的其他字段，即使这些字段的内嵌文档持有相同的访问级别
$$KEEP	   返回包含当前文档或内嵌文档级别的所有字段，不再继续检测此级别的其他字段，即使这些字段的内嵌文档中持有不同的访问级别
 */
var async = require('async');
var db = require('../../../lib/db.js');
var forecast = require('../../../model/forecast.js');



function exit() {
    async.parallel([
        function (cb) {
            forecast.removeAll(cb);
        }
    ], function (err) {
        db.closeDB();
    });
}

async.waterfall([
    function (cb) {
        db.openDB(cb);
    },
    function (arg, cb) {
        var docs = [
            {
                _id: 1,
                title: "123 Department Report",
                tags: ["G", "STLW"],
                year: 2014,
                subsections: [
                    {
                        subtitle: "Section 1: Overview",
                        tags: ["SI", "G"],
                        content: "Section 1: This is the content of section 1."
                    },
                    {
                        subtitle: "Section 2: Analysis",
                        tags: ["STLW"],
                        content: "Section 2: This is the content of section 2."
                    },
                    {
                        subtitle: "Section 3: Budgeting",
                        tags: ["TK"],
                        content: {
                            text: "Section 3: This is the content of section3.",
                            tags: ["HCS"]
                        }
                    }
                ]
            }
        ]
        forecast.add(docs, cb);
    },
], function (err, res) {
    console.log(JSON.stringify(res));
    exit();
});