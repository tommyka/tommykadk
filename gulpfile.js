var gulp = require('gulp');
var typescript = require('gulp-typescript');
var less = require('gulp-less');
var browser = require('browser-sync');

var tsProject = typescript.createProject('tsconfig.json');

var ts_main = "src/script/main.ts";
var ts_output = "dist/assets/scripts/";

var less_src = "src/style/*.less";
var less_output = "dist/assets/css/";

gulp.task('browsersync', function(){
	browser({
		server: {
			baseDir: "./dist/"
		}
	});
});


gulp.task('compile-ts', function(){
	console.log("compile typescirp");
	var ts = gulp.src(ts_main)
		.pipe(typescript(tsProject));

	ts.js.pipe(gulp.dest(ts_output));
});

gulp.task('less',function(){
	gulp.src(less_src)
		.pipe(less())
		.on('error', function(err){ console.log(err.message); })
		.pipe(gulp.dest(less_output));
});

gulp.task('html', function(){
	gulp.src('src/html/*.html', {base:'src/html'})
		.pipe(gulp.dest('dist/'));
});

gulp.task('assets', function(){
	gulp.src('src/assets/**/*.*', {base:'src'})
		.pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
	gulp.watch(['src/script/**/*.ts'],['compile-ts', 'reload']);
	gulp.watch(['src/style/**/*.less'], ['less', 'reload']);
	gulp.watch(['src/html/*.html'], ['html', 'reload']);
	gulp.watch(['src/assets/**/*.*'], ['assets', 'reload']);
});

gulp.task('reload', function(){
	browser.reload();
});


gulp.task('default', ['less', 'assets', 'compile-ts', 'html', 'browsersync', 'watch']);