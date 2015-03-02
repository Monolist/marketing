'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {

  gulp.watch('./public/styles/**/*.scss', ['sass']);
  gulp.watch('./public/fonts/**/*',       ['copyFonts']);
  gulp.watch(['./public/pages/**/*.hbs', './public/templates/**/*.hbs', './public/data/*.json', './public/helpers/*.js'], [
    'assemble'
  ]);

});