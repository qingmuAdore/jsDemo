/**
 *@important 
 * 
 * 将全局Promise变量赋值,为了处理 bluebird 封装(如:mongoose,redis)的Promise化方法
 */
const config = require('./config/config');
const koa = require('./bin/koa');

console.log('PORT:', config.koa.port);

koa.listen(config.koa);