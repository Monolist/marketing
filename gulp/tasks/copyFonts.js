'use strict';

var gulp = require('gulp');

gulp.task('copyFonts', function() {

  return gulp.src('./public/fonts/**/*')
  .pipe(gulp.dest('./build/fonts/'));

});