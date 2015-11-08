'use strict';

var url         = require('url');
var browserSync = require('browser-sync');
var gulp        = require('gulp');
var config      = require('../config');

gulp.task('browserSync', function() {

  var ASSET_EXTENSIONS = ['js', 'css', 'png', 'jpg', 'jpeg', 'gif'];

  browserSync.init({
    server: {
      baseDir: config.dist.root,
      middleware: function(req, res, next) {
        var fileHrefArray = url.parse(req.url).href.split('.');
        var fileExtension = fileHrefArray[fileHrefArray.length - 1];

        if ( ASSET_EXTENSIONS.indexOf(fileExtension) === -1 ) {
          req.url = req.url !== '/' && req.url.indexOf('html') === -1 ? req.url + '.html' : req.url;
        }

        return next();
      }
    },
    port: config.browserPort,
    ui: {
      port: config.UIPort
    },
    ghostMode: {
      links: false
    }
  });

});