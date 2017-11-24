const redis = require('redis'),
    RedisClient = redis.RedisClient;
const config = require('../config').redis;
const bluebird = require('bluebird');

//方法 promise化 后缀 Async
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(config);

async function taskSlice() {
    await client.lpushAsync(['mylist', ...['one', 'two', 'three', 'four']]);
    await client.ltrimAsync('mylist', 1, -1);
    var result = await client.lrangeAsync(['mylist', 0, 10]);
    console.log(result);
    // await client.del('mylist');
}


async function taskChain() {
    await client.lpushAsync(['mylist', ...['one', 'two', 'three', 'four']]);
    await client.ltrimAsync('mylist', 1, -1);
    var result = await client.lrangeAsync(['mylist', 0, 10]);
    console.log(result);
    await client.del('mylist');
}

// taskSlice();


/**
 * lpush 限制存储数量
 * 
 * @param {String} key  key值 
 * @param {Object} options 
 * @param {Array} options.value   内容
 * @param {Array} options.filter  过滤keys(条件 key.indexOf(keys.element) 则存储不限制)
 * @param {Number} options.limit  限制存储条数
 * 
 */
RedisClient.prototype.lpushLimitAsync = function (key, { value = [], filter = [], limit = 1000 }) {

    if (!this.lpushAsync) this.lpushAsync = bluebird.promisify(this.lpush);
    if (!this.ltrimAsync) this.ltrimAsync = bluebird.promisify(this.ltrim);

    var inner = filter.some(function (ele) {
        return key.indexOf(ele) != -1;
    });

    return (inner) ?
        this.lpushAsync([key, ...value]) :
        bluebird.all([
            this.lpushAsync([key, ...value]),
            this.ltrimAsync(key, 0, limit)
        ]);
}
//ok
// client.lpushLimitAsync('mylist',{
//     value:['one', 'two', 'three', 'four'],
//     filter:['my'],
//     limit:2
// });



for (let i = 0; i < 100000; i++) {
    client.lpushLimitAsync('ts', {
        value: [i + '-one', i + '-two', i + '-three', i + '-four'],
        limit: 20
    });
}
