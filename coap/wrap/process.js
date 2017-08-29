/**
 * 
缺陷,待完善
路由模块解析不成功,如下两者情形:
1. /    + /any
2. /any + /

如下示例,路径
/register     失败
/beacon       失败
/beacon/push  成功

 */

var CoAP = require('./lib/application');
var router = require('./lib/modules/router/router')();
var user = require('./lib/modules/router/router')();
var beacon = require('./lib/modules/router/router')();
var app = new CoAP();

app.use(async function (ctx, next) {
    await next();
});

user.post('/register', async function (ctx) {
    ctx.status = '2.01';
    ctx.body = 'URL /register ';
});



beacon.post('/', async function (ctx) {
    ctx.status = '2.01';
    ctx.body = 'URL /beacon/ ';
});

beacon.post('/push', async function (ctx) {
    ctx.status = '2.01';
    ctx.body = 'URL /beacon/push ';
});

router.use('/', user.routes(), user.allowedMethods());
router.use('/beacon', beacon.routes(), beacon.allowedMethods());

app.use(router.routes(), router.allowedMethods());

app.listen({ port: 3000 });