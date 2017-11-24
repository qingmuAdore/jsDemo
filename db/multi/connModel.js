const mongoose = require('mongoose');
mongoose.Promise = Promise;

let authorDB = mongoose.createConnection('mongodb://localhost/author');
let oprDB = mongoose.createConnection('mongodb://localhost/opr');

let UserSchema = new mongoose.Schema({
    name: String,
    pwd: String
}, { collection: 'user' });

let OrderSchema = new mongoose.Schema({
    id: String,
    goods: String
}, { collection: 'order' });


let user = authorDB.model('User', UserSchema);
let order = oprDB.model('Order', OrderSchema);

user.create({ name: 'pauly', pwd: '123456' });
order.create({ id: 'order_01', goods: 'apple' });