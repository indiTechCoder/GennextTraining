var gulp = require('gulp'),
	gutil = require('util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minHTML = require('gulp-htmlmin'),
	minJson = require('gulp-jsonminify'),
	concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css');

var env,
    jsSources,
    htmlSources,
    jsonSources,
    ouputDir;


var env = process.env.NODE_ENV || 'development';


if (env==='production') {
	outputDir = 'public/build/production/';
	sassStyle = 'compressed';
} else {
	outputDir = 'public/build/development/';
	sassStyle = 'expanded';
}

jsSources = [
	'public/lib/js/angular.min.js',
	'public/lib/js/angular-route.min.js',
	'public/lib/js/angular-resource.min.js',
	'public/lib/js/angular-cookies.min.js',
	'public/lib/js/angular-storage.js',
	'public/lib/js/module/bootstrap.js',
	'public/module/module.js',
	'public/route/route.js',
	'public/controller/mainController.js',
	'public/controller/YouTubeController.js',
	'public/controller/authController.js',
	'public/factory/authentication.service.js',
	'public/factory/AuthResolver.js',
	'public/factory/localstorage.js',
	'public/factory/Mainfactory.js',
	'public/factory/user.service.js'
];


gulp.task('js', function() {
	gulp.src(jsSources)
	  .pipe(concat('script.js'))
	  .pipe(browserify())
	  .pipe(gulpif(env === 'production', uglify()))
	  .pipe(gulp.dest( outputDir + 'js'))
	  .pipe(connect.reload())
});

/* I need to replace gulp-compass as I cannot get it to work properly*/
gulp.task('minify-css', function() {
  return gulp.src('public/lib/css/*.css')
    .pipe(concat('main.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest( outputDir + 'css'));
});

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js']);
	gulp.watch('public/lib/css/*.css', ['minify-css']);
});

gulp.task('default', [ 'js', 'minify-css','watch','connect']);

gulp.task('connect', function() {
	connect.server({
		root: 'public/builds/development',
		livereload: true
	});
});




