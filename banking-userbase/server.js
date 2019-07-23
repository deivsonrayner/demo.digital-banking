'use strict';
//require('appmetrics-dash').attach();
//require('appmetrics-prometheus').attach();
const mongoose = require('mongoose');
//require('dotenv').config({silent: true, path: `${__dirname}/.env`});

var server = require('./app');
var port = 8080;

console.log(`Running on ${process.env.BASE_PATH}:${port}, connecting to ${process.env.MONGO_URL}`)

mongoose.connect(process.env.MONGO_URL, function (ignore, connection) {
    connection.onOpen();
    server.listen(port, function () {
        console.log('Server running on port: %d', port);
    });
});
