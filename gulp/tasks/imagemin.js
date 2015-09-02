'use strict';

var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var imagemin    = require('gulp-imagemin');
var browserSync = require('browser-sync');
var config      = require('../config');

gulp.task('imagemin', function() {

  return gulp.src(config.images.src)
  .pipe(gulpif(global.isProd, imagemin()))
  .pipe(gulp.dest(config.images.dest))
  .pipe(browserSync.stream({ once: true }));

});