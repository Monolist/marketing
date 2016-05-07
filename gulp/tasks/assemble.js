'use strict';

var gulp         = require('gulp');
var assemble     = require('assemble');
var gulpif       = require('gulp-if');
var htmlmin      = require('gulp-htmlmin');
var extname      = require('gulp-extname');
var browserSync  = require('browser-sync');
var hbEngine     = require('engine-handlebars');
var handleErrors = require('../util/handle-errors');

var app = assemble();

app.engine('*', hbEngine);
app.create('pages', { engine: '*' });

app.task('load', function(cb) {
  app.partials('./public/templates/partials/**/*.hbs');
  app.layouts('./public/templates/layouts/**/*.hbs');
  app.data('./public/data/**/*.json');
  app.pages('./public/pages/**/*.hbs');
  cb();
});

gulp.task('assemble', function() {

  app.build('load', () => {});

  // Run assemble on static pages
  return app.toStream('pages')
    .pipe(app.renderFile())
    .on('error', handleErrors)
    .pipe(gulpif(global.isProd, htmlmin()))
    .pipe(extname())
    .pipe(app.dest('./build/'))
    .pipe(browserSync.stream());
  // return gulp.src('./public/pages/**/*.hbs')
  // .pipe(assemble({
  //   data:      './public/data/**/*.json',
  //   helpers:   './public/helpers/**/*.js',
  //   partials:  './public/templates/partials/**/*.hbs',
  //   layoutdir: './public/templates/layouts/'
  // }))
  // .pipe(gulp.dest('./build/'))
  // .pipe(browserSync.stream({ once: true }));

});
