/**
 * 配置文件
 */
module.exports = {
    //普通redis
    redis: {
        host: 'localhost',
        port: 6379,
        db: '1'
    },
    //redis 集群
    cluster: {
        host: '10.10.38.253',
        port: 7000
    }
}