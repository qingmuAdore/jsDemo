const router = require("coap-router")();

router.get("/", (req, res) => {
    writeJSON(res, {
        path: '/',
        timestamp: new Date().getTime()
    });
    res.end();
});

router.get("/push", (req, res) => {
    writeJSON(res, {
        path: '/push',
        timestamp: new Date().getTime()
    });
    res.end();
});

router.post("/push", (req, res) => {
    writeJSON(res, {
        path: '/push',
        timestamp: new Date().getTime()
    });
    res.end();
});

function writeJSON(res, json) {
    res.setOption("Content-Format", "application/json");
    res.write(JSON.stringify(json));
}

module.exports = router;
