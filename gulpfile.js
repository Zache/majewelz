var gulp = require('gulp'),
	babelify = require('babelify'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	gutil = require('gulp-util'),
	tape = require('gulp-tape'),
	reporter = require('gulp-tap-min');

var paths = {
	webroot: 'wwwroot',
	appEntry: './Application.jsx',
	scripts: './wwwroot/scripts/',
	css: './wwwroot/css/'
}

gulp.task('test', function() {
	return gulp.src('./test/*.js')
		.pipe(tape({
			tapeOpts: { objectMode: true },
			reporter: reporter()
		}));
});

gulp.task('scripts', function () {
	bundle(false);
});

gulp.task('styles', function () {
	gulp.src(['./style/*.scss'])
		.pipe(sass({}))
		.pipe(gulp.dest(paths.css));
});

gulp.task('watch', function () {
	bundle(true);
	//gulp.watch('./application/**/*.js*', ['test']);, there are some issues with gulp-tape and watch :(
	gulp.watch('./test/*.js', ['test']);
	gulp.watch('./style/*', ['styles']);
});

function bundle(watch) {
	var bundler = browserify({
		entries: paths.appEntry,
		debug: true,
		fullPaths: true,
		cache: {}, packageCache: {}
	});
	bundler.transform(babelify);
	
	var rebundle = function() {
		gutil.log('Building bundle', (new Date()).toString());
		bundler.bundle()
			.on('error', gutil.log)
			.pipe(source(paths.appEntry))
			.pipe(rename('application.js'))
			.pipe(gulp.dest(paths.scripts));
	}
	
	if (watch) {
		bundler = watchify(bundler);
		bundler.on('update', rebundle);
	}

	rebundle();
}
