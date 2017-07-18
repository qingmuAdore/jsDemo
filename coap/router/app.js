const app = require("coap-router")();

app.get("/.well-known/core", (req, res) => {
    res.setOption("Content-Format", "application/link-format");
    res.end('["</user>","</user/login>"]');
});

app.use("/", require("./routes/info.js"));
app.use("/user", require("./routes/user.js"));



module.exports = app;