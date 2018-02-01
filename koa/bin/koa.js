'use strict'

const path = require('path');
const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser')();
const session = require('koa-session');
const kStatic = require('koa-static');
const views = require('koa-views');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
// router 
const index = require('../routes/index');

onerror(app);
// logger
app.use(convert(logger()));

// middlewares
app.use(kStatic(path.join(__dirname, '/../public')))
app.use(views(__dirname + '/../views', { map: { html: 'ejs' } }));
app.use(convert(bodyparser));

app.use(async function (ctx, next) {   // ctx.args 记录请求的参数
    ctx.args = {};
    Object.assign(ctx.args, ctx.query, ctx.request.body);
    await next();
});

app.use(async function (ctx, next) {    // ctx.contentLength 记录内容长度
    ctx.contentLength = ctx.request.length;
    await next();
});

app.use(index.routes(), index.allowedMethods());

// error handler
app.use(async function (ctx, next) {
    ctx.status = ctx.status || 500;
    ctx.body = {
        message: ctx.message,
        status: ctx.status,
        error: {}
    };
});

module.exports = app;