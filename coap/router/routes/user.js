const router = require("coap-router")();

router.get("/", (req, res) => {
    writeJSON(res, {
        path: '/user',
        timestamp: new Date().getTime()
    });
    res.end();
});

router.post('/login', (req, res) => {
    res.statusCode = "2.01";
    writeJSON(res, {
        path: '/user/login',
        uid: '0sfta9910',
        token: 'userToken'
    });
    res.end();
});

function writeJSON(res, json) {
    res.setOption("Content-Format", "application/json");
    res.write(JSON.stringify(json));
}

module.exports = router;
