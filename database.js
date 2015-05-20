'use strict';
var mongoose            = require('mongoose');

var database = function () {
    var conn = null,

        init = function (config, seedData) {
            mongoose.connect('mongodb://' + config.host + '/' + config.database);
            conn = mongoose.connection;
            conn.on('error', console.error.bind(console, 'connection error:'));
            conn.once('open', function() {
                console.log('db connection open');

              /*  if (seedData) {
                    console.log('Initializing Data');
                    dataInitializer.initializeUserData();
                    dataInitializer.initializeProductData();
                } */

            });
            return conn;
        },

        close = function() {
            if (conn) {
                conn.close(function () {
                    console.log('Mongoose default connection disconnected through app termination');
                    process.exit(0);
                });
            }
        }

    return {
        init:  init,
        close: close
    };

}();

module.exports = database;
