const coap = require("coap");
// const app = require("./app");
const server = coap.createServer(function(s));
server.listen(() => {
    console.log("The CoAP server is running.");
});
