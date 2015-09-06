'use strict';

var config  = require('../config');
var http    = require('http');
var express = require('express');
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var morgan  = require('morgan');

gulp.task('server', function() {

  var server = express();

  // log all requests to the console
  server.use(morgan('dev'));
  server.use(express.static(config.dist.root));

  server.all('/*', function(req, res) {
    var fileName = req.path.indexOf('html') === -1 ? req.path + '.html' : req.path;
    res.sendFile(fileName, { root: 'build' });
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