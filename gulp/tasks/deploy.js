'use strict';

var gulp             = require('gulp');
var rename           = require('gulp-rename');
var awspublish       = require('gulp-awspublish');
var awspublishRouter = require('gulp-awspublish-router');
var dotenv           = require('dotenv');

dotenv.load();

gulp.task('deploy', ['prod'], function() {

  var publisher = awspublish.create({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    params: {
      Bucket: process.env.S3_BUCKET,
      Region: process.env.S3_REGION
    }
  });
  var oneWeekInSeconds = 60*60*24*7;
  var headers = {
    'Cache-Control': 'max-age=' + oneWeekInSeconds + ', no-transform, public'
  };

  // Assets
  return gulp.src('./build/**/*')
  .pipe(rename(function(path) {
    // Remove extension from all HTML files for cleaner routes on S3
    if ( path.basename !== 'index' && path.extname === '.html' ) {
      path.extname = '';
    }
  }))
  .pipe(awspublishRouter({
    routes: {
      // Assume all files without an extension are HTML files
      '^([^.]+)$': {
        headers: {
          'Content-Type': 'text/html'
        }
      },
      '^.+$': {
        key: '$&'
      }
    }
  }))
  .pipe(awspublish.gzip())
  .pipe(publisher.publish(headers))
  .pipe(awspublish.reporter());

});