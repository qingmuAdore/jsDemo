/**
 * 配置文件
 */
module.exports = {
    //普通redis
    redis: {
        host: 'localhost',
        // host:'10.10.38.60',
        port: 6379,
        db: '0'
    },
    //redis 集群
    cluster: {
        host: '10.10.38.253',
        port: 7000
    }
}