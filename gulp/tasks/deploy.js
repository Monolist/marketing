'use strict';

var gulp       = require('gulp');
var awspublish = require('gulp-awspublish');
var dotenv     = require('dotenv');

dotenv.load();

gulp.task('deploy', ['prod'], function() {

  var publisher = awspublish.create({
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET,
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION
  });
  var oneWeekInSeconds = 60*60*24*7;
  var headers = {
    'Cache-Control': 'max-age=' + oneWeekInSeconds + ', no-transform, public'
  };

  // Assets
  return gulp.src('./build/**/*')
  .pipe(awspublish.gzip())
  .pipe(publisher.publish(headers))
  .pipe(awspublish.reporter());

});