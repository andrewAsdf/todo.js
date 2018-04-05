'use strict';

var gulp = require('gulp-help')(require('gulp'));

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var log = require('gulplog');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify');

gulp.task('build', 'Browserifies the ui, and puts it in the public folder', function () {
  var b = browserify({
    entries: './ui.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(minify())
        .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public'));
});