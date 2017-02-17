function request(method, url, data, cb) {
    $.ajax({
        type: method,
        url: url,
        data: data,
        traditional: true,
        beforeSend: function() {

        },
        success: function(data) {
            cb(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            var err = 'Error:' + XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText;
            cb(err);
        },
        complete: function() {

        }
    });
}