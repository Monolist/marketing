'use strict';

var gulp = require('gulp');

gulp.task('watch', ['browserSync', 'server'], function() {

  gulp.watch(config.styles.src, ['sass']);
  gulp.watch(config.fonts.src,   ['copyFonts']);
  gulp.watch(config.images.src,  ['imagemin']);
  gulp.watch(['./public/pages/**/*.hbs', './public/templates/**/*.hbs', './public/data/*.json', './public/helpers/*.js'], [
    'assemble'
  ]);

});