'use strict';

var config  = require('../config');
var http    = require('http');
var express = require('express');
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var morgan  = require('morgan');

// encrypt / decrypt
var secret  = require('../secret/secret.json');

var encrypt = require('simple-encryptor')(secret.salt);

// reviews data
var data    = require('../data');

gulp.task('server', function() {

  var server = express();

  // log all requests to the console
  server.use(morgan('dev'));
  server.use(express.static(config.dist.root));

  // set up simple api server to get reviews by based on encrypted business id
  server.get('/api/reviews/:id', function(req, res) {

    var idParam    = req.params.id;
    var id = encrypt.decrypt(idParam);

     if (typeof data[id].reviews === 'undefined') {
     res.status(404).json({status: 'error'});
     // test
     console.log('api error');
     } else {
     res.status(200).json(data[id].reviews);
     // test
     console.log('api success');
     }

   });

  // Serve index.html for all routes to leave routing up to Angular
  server.all('/*', function(req, res) {
    res.sendFile('index.html', { root: 'build' });
  });

  // Start webserver if not already running
  var s = http.createServer(server);
  s.on('error', function(err){
    if(err.code === 'EADDRINUSE'){
      gutil.log('Development server is already started at port ' + config.serverPort);
    }
    else {
      throw err;
    }
  });

  s.listen(config.serverPort);

});