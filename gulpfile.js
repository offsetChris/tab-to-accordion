// Gulp JS file. Compiles sass and javascript plugins, watches changes, moves to build
// inculde Gulp
var gulp = require('gulp');
// include SASS compiler
var sass = require('gulp-sass');
// include file concatination (future js enhancement?)
var concat = require('gulp-concat');
// include replace
var replace = require('gulp-replace');

var input = 'sass/**/*.scss';
var output = 'build/css';

var jsFiles = 'js-plugins/*.js';
var jsDest = 'build/js';

var sassOptions = {
	errLogtoConsole: true,
	outputStyle: 'expanded'
}

// SASS compiler
gulp.task('sass', function(){
	return gulp.src(input)
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(replace('{timestamp}', (new Date()).toString().substr(4,17)))
		.pipe(gulp.dest(output));
});

// SASS watch compiles sass on save of scss file.
gulp.task('sass-watch', function(){
	return gulp.watch(input, ['sass'])
	.on('change', function(event){
		console.log('file ' + event.path + ' was ' + event.type + ', compiling css...');
	});
});

// JS Plugin compiler. This will compile in the order of the files in folder
gulp.task('scripts', function(){
	return gulp.src(jsFiles)
		.pipe(replace('{timestamp}', (new Date()).toString().substr(4,17)))
		.pipe(concat('main.js'))
		.pipe(gulp.dest(jsDest));
});

// JS watch compiles on save of JS plugin file.
gulp.task('js-watch', function(){
	return gulp.watch(jsFiles, ['scripts'])
	.on('change', function(event){
		console.log('js file '+event.path+' was '+event.type+ ', compiling js...');
	});
});		

// Default gulp, starts watch scripts
gulp.task('default', ['sass', 'sass-watch', 'scripts', 'js-watch'], function() {
	console.log('Sass and scripts compiled, watch scripts activated!');
});
