'use strict';

var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', ['browserSync'], function() {

  gulp.watch(config.styles.src,  ['sass']);
  gulp.watch(config.fonts.src,   ['copyFonts']);
  gulp.watch(config.images.src,  ['imagemin']);
  gulp.watch(['./public/pages/**/*.hbs', './public/templates/**/*.hbs', './public/data/*.json', './public/helpers/*.js'], [
    'assemble'
  ]);

});