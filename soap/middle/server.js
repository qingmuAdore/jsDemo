var soap = require('express-soap');
var fs = require('fs');
var express = require('express');

var app = new express();

app.route('/mathWS').post(soap.soap({
    services: {
        math: {
            SMath: {
                add: function (args, cb, headers, req) {
                    console.log(args);
                    return Number(args.x) + Number(args.y);
                },
                sub: function (args, cb, headers, req) {
                    console.log(args);
                    return Number(args.x) - Number(args.y);
                },
            }
        }
    },
    wsdl: fs.readFileSync(__dirname + '/math.wsdl', 'utf8')
}));

// app.use('/mathWS', soap.soap({
//     services: {
//         math: {
//             SMath: {
//                 add: function (args, cb, headers, req) {
//                     console.log(args);
//                     return Number(args.x) + Number(args.y);
//                 },
//                 sub: function (args, cb, headers, req) {
//                     console.log(args);
//                     return Number(args.x) - Number(args.y);
//                 },
//             }
//         }
//     },
//     wsdl: fs.readFileSync(__dirname + '/math.wsdl', 'utf8')
// }));

app.use('/flightlyWS', soap.soap({
    services: {
        Flightly: {
            FlightlySoap: {
                buyTicket: function (args, cb, headers, req) {
                    console.log('SOAP `buyTicket` request from ' + req.connection.remoteAddress);
                    // return uuid.v4();
                    return args.Price * args.seats;
                },
                traveldocuments: function (args, cb, headers, req) {
                    console.log('SOAP `traveldocuments` request from ' + req.connection.remoteAddress);
                    return {
                        ArrayOfOrder: [
                            {
                                Order: {
                                    date: 'JUL 10 2016',
                                    accountId: '00001',
                                    Destination: 'SAN',
                                    seats: 1,
                                    Price: 99.00,
                                    confirmationId: 123456789
                                }
                            }
                        ]
                    };
                }
            }
        }
    },
    wsdl: fs.readFileSync(__dirname + '/flightly.wsdl', 'utf8')
}));

app.listen(9999);