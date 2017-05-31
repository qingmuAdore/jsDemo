module.exports = function (request, response) {
    return function (err, res) {
        deal(request, response, err, res);
    }
}

function deal(request, response, err, res) {
    response.send({ err: err, res: res });
}