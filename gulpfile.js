'use strict';

var gulp = require('gulp-help')(require('gulp'));

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var log = require('gulplog');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify');
var globby = require('globby');
var through = require('through2');
var watch = require('gulp-watch');

function createBrowserifyStream () {
	var bundledStream = through();
	bundledStream
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(minify())
		.on('error', log.error)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public'));

	globby('./ui/*.js').then(entries => {
		var b = browserify({
			entries: entries,
			debug: true
		});

		b.bundle().pipe(bundledStream)
	})

}

gulp.task('build', 'Browserify the ui, and put it in the public folder', function () {
	return createBrowserifyStream ()
});

gulp.task('stream', 'Do the build on changing a file', function () {
    // Endless stream mode
	var uiFilesStream = watch('./ui/*.js', { ignoreInitial: false })
	uiFilesStream.on('data', (chunk) => {
		createBrowserifyStream ();
	})
	return uiFilesStream
});