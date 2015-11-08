'use strict';

var gulp   = require('gulp');

gulp.task('copyIcons', function() {

  return gulp.src('./public/*.{png,ico,xml,json}')
  .pipe(gulp.dest('build/'));

});