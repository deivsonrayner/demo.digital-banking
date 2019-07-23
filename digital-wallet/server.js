'use strict';
//require('appmetrics-dash').attach();
//require('appmetrics-prometheus').attach();

var server = require('./app');
var port = 8080;



server.listen(port, function () {
    console.log(`Running on ${port}, connecting to IBM Blockchain Platform !`)
});