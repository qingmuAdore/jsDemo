var Redis = require("ioredis");
// require('underscore');
var sub = new Redis( /** 连接信息 */ );
// assign 是 sugarjs 里面的函数
// 把 db 塞到字符串里面的 {db} 里去
// var subscribeKey = "__keyevent@{db}__:expired".assign({ db: 1 });
var subscribeKey = "__keyevent@1__:expired";
// 假设 sub 是 ioredis 的对象
sub.once("connect", function() {
    // 假设我们需要选择 redis 的 db，因为实际上我们不会去污染默认的 db 0
    sub.select(1, function(err) {
        if (err) process.exit(4);
        sub.subscribe("foo", function() {
            //... 订阅频道成功
            // console.log(arguments);
        });
    });
});

var sampleOnExpired = function(channel, key) {
    // UUID:❤️func❤️params
    var body = key.split("❤️");
    if (body.length < 3) return;

    // 取出 body 第一位为 func
    var func = body[1];

    // 推出前两位，后面剩下的有可能是参数里面自带 ❤️ 而被分割，所以要拼回去
    body.shift();
    body.shift();
    var params = body.join("❤️");

    // 然后把 params 传入 func 去执行
    // func:
    //   path1/path2.func
    func = func.split(".");
    if (func.length !== 2) {
        console.error("Bad params for task:", func.join("."), "-", params);
        return;
    }

    var path = func[0];
    func = func[1];

    var mod;
    try {
        mod = require("./tasks/" + path);
    } catch (e) {
        console.error("Failed to load module", path);
        console.error(e.stack);
        return;
    }

    process.nextTick(function() {
        try {
            mod[func].apply(null, JSON.parse(params));
        } catch (e) {
            console.error("Failed to call function", path, "-", func, "-", params);
            console.error(e.stack);
        }
    });
};

// 监听从 `foo` 来的消息
sub.on("message", sampleOnExpired);



var sampleTaskMaker = function(message, func, timeout) {
    message = JSON.stringify(message);
    console.log("Received a new task:", func, message, "after " + timeout + ".");

    // 这里的 uuid 是 npm 一个包
    // 生成一个唯一 uuid 的目的是为了防止两个任务用了相同的函数和参数，那么
    // 键名可能会重复并覆盖的情况
    // uuid 的文档为 https://www.npmjs.com/package/node-uuid
    //
    // 这里的 ❤️ 是一个分隔符，冒号是分割 uuid 和后面内容的，而 ❤️ 是分割函数名
    // 和消息的
    var key = uuid.v1().replace(/-/g, "") +
        ":❤️" + func + "❤️" + message;
    var content = "";

    sub.multi()
        .set(key, content)
        .expire(key, timeout)
        .exec(function(err) {
            if (err) {
                console.error("Failed to publish EXPIRE EVENT for " + content);
                console.error(err);
                return;
            }
        });
};