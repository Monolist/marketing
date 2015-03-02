'use strict';

var gulp     = require('gulp');
var assemble = require('gulp-assemble');

gulp.task('assemble', function() {

  // Run assemble on static pages
  return gulp.src('./public/pages/**/*.hbs')
  .pipe(assemble({
    data:      './public/data/**/*.json',
    helpers:   './public/helpers/**/*.js',
    partials:  './public/templates/partials/**/*.hbs',
    layoutdir: './public/templates/layouts/'
  }))
  .pipe(gulp.dest('./build/'));

});