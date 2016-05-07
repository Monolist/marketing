'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var rename       = require('gulp-rename');
var browserSync  = require('browser-sync');
var handleErrors = require('../util/handle-errors');
var config       = require('../config');

gulp.task('sass', function() {

  return gulp.src(config.styles.src)
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({
    sourceComments: global.isProd ? 'none' : 'map',
    sourceMap: 'sass',
    outputStyle: global.isProd ? 'compressed' : 'nested',
  }))
  .on('error', handleErrors)
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(config.styles.dest))
  .pipe(browserSync.stream());

});
