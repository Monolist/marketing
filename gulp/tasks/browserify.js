'use strict';

var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var streamify    = require('gulp-streamify');
var rename       = require('gulp-rename');
var watchify     = require('watchify');
var browserify   = require('browserify');
var babelify     = require('babelify');
var browserSync  = require('browser-sync');
var sourcemaps   = require('gulp-sourcemaps');
var buffer       = require('vinyl-buffer');
var uglify       = require('gulp-uglify');
var handleErrors = require('../util/handle-errors');
var config       = require('../config');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file, watch) {

  var bundler = browserify({
    entries: config.browserify.entries,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  if ( watch ) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      rebundle();
      gutil.log('Rebundle...');
    });
  }

  bundler.transform(babelify);

  function rebundle() {
    var stream = bundler.bundle();
    var createSourcemap = !global.isProd && config.browserify.sourcemap;

    return stream.on('error', handleErrors)
    .pipe(source(file))
    .pipe(gulpif(createSourcemap, buffer()))
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    .pipe(gulpif(global.isProd, streamify(uglify({
      compress: { drop_console: true }
    }))))
    .pipe(streamify(rename({
      basename: 'main',
      suffix: '.min'
    })))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.stream({ once: true }));
  }

  return rebundle();

}

gulp.task('browserify', function() {

  // Only run watchify if NOT production
  return buildScript('main.js', !global.isProd);

});