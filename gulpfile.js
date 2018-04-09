'use strict';

const gulp = require('gulp-help')(require('gulp'));

const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const log = require('gulplog');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const globby = require('globby');
const through = require('through2');
const watch = require('gulp-watch');

const comment = require('./comment.js');
const concat = require('./concat.js');

function createBrowserifyStream () {
	let bundledStream = through();
	bundledStream
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(minify())
		.on('error', log.error)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public'));

	globby('./ui/*.js').then(entries => {
		let b = browserify({
			entries: entries,
			debug: true
		});

		b.bundle().pipe(bundledStream);
	});

}

gulp.task('build', 'Browserify the ui, and put it in the public folder', function () {
	return createBrowserifyStream ();
});

gulp.task('stream', 'Do the build on changing a file', function () {
    // Endless stream mode
	let uiFilesStream = watch('./ui/*.js', { ignoreInitial: false });
	uiFilesStream.on('data', chunk => {
		createBrowserifyStream ();
	});
	return uiFilesStream;
});

gulp.task('szevasz', 'Merges files with an added comment on top of each one', function () {
	return gulp.src('./ui/*.js')
	.pipe(comment('szevasz!!'))
	.pipe(concat('concat.js'))
	.pipe(gulp.dest('./szevasz'));
});