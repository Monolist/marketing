'use strict';

var gulp = require('gulp');

gulp.task('copyIcon', function() {

  return gulp.src('./public/favicon.ico')
  .pipe(gulp.dest('./build/'));

});