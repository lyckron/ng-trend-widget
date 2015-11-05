'use strict';
var deploy = require('../deploy_config').config;
var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');

gulp.task('deploy', ['prod'], function() {
  // all from 'build' folder
  return gulp.src('build/**/*')
    .pipe(ftp({
      host       : deploy.host,
      port       : deploy.port,
      user       : deploy.user,
      pass       : deploy.pass,
      remotePath : deploy.remotePath
    }))
    // you need to have some kind of stream after gulp-ftp to make sure it's flushed
    // this can be a gulp plugin, gulp.dest, or any kind of stream
    // here we use a passthrough stream
    .pipe(gutil.noop());

});