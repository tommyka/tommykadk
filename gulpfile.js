var gulp = require('gulp');
var path = require('path');
var fs = require("fs");
var through = require('through2')
var typescript = require('gulp-typescript');
var less = require('gulp-less');
var browser = require('browser-sync');



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
	var tsProject = typescript.createProject('tsconfig.json');
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

var trimrex = /\.[^/.]+$/;

gulp.task('content-images', function(){
	return gulp.src(['content/**/*.jpg','content/**/*.png', 'content/**/*.gif'], {base:"content"})
		.pipe(gulp.dest("dist/content"));
});

gulp.task('content', function(){
	var projects = [];
	var lastfile = null;

	var spaceCleaner = /\s/g;

	return gulp.src(['content/**/*.json'], {})
		.pipe(through.obj(function(chunk, encoding, callback){
			//readfile
			var json = JSON.parse(chunk.contents.toString());
			var filename = path.basename(chunk.path);
			var filenameNoExt = filename.replace(trimrex, "");
			var folder = chunk.path.replace(filename, '');

			var files = fs.readdirSync(folder);
			files.splice(files.indexOf(filename), 1);
			if(!json.gallery){
				json.gallery = [];
			}

			var id = json.title.toLowerCase().replace(spaceCleaner, '-').replace(/å/g,'a').replace(/æ/g,'ae').replace(/ø/g, 'o');
			json.id = id;
			for (var i = 0; i < files.length; i++) {
				var f = files[i];
				var frel = path.join(path.relative(chunk.cwd, folder),f).replace(/\\/g, "/");

				if(f != filename){
					if(filenameNoExt.toLowerCase() == f.replace(trimrex, "").toLowerCase()){
						json.image = frel;
					}else{
						json.gallery.push(frel);
					}
				}
			};

			projects.push (json);

			lastfile = chunk;

			//empty callback omits file
			callback();
		}, function(callback){
			//flush / end stream
			var clone = lastfile.clone({contents:false});
			clone.path = path.join(lastfile.base, "content/data.json");

			clone.contents = new Buffer(JSON.stringify(projects));
			this.push(clone);

			callback();
		}))
		.pipe(gulp.dest("dist/"));
});



gulp.task('watch', function(){
	gulp.watch(['src/script/**/*.ts'],['compile-ts', 'reload']);
	gulp.watch(['src/style/**/*.less'], ['less', 'reload']);
	gulp.watch(['src/html/*.html'], ['html', 'reload']);
	gulp.watch(['src/assets/**/*.*'], ['assets', 'reload']);
	gulp.watch(['content/**/*.*'], ['content', 'content-images', 'reload']);
});

gulp.task('reload', function(){
	browser.reload();
});


gulp.task('default', ['content', 'content-images','less', 'assets', 'compile-ts', 'html', 'browsersync', 'watch']);