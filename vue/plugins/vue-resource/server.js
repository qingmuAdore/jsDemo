const Koa = require('koa');
const router = require('koa-router')();
const api = require('koa-router')();
const cors = require('koa-cors');
const app = new Koa();

function createCustomer(customerId, companyName, contactName, phone) {
    return {
        customerId: customerId,
        companyName: companyName,
        contactName: contactName, 
        phone: phone
    };
}

api.get('/customers', async function (ctx) {
    ctx.body = [
        createCustomer(1, 'company1', 'contact1', '123456-01'),
        createCustomer(2, 'company2', 'contact2', '123456-02'),
        createCustomer(3, 'company3', 'contact3', '123456-03'),
        createCustomer(4, 'company4', 'contact4', '123456-04'),
        createCustomer(5, 'company5', 'contact5', '123456-05'),
    ];
});

router.use('/api', api.routes(), api.allowedMethods());



app.use(cors());
app.use(router.routes(), router.allowedMethods());

app.listen(8080);