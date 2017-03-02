"use strict"

var    gulp = require('gulp'),
     uglify = require('gulp-uglify'),
     concat = require("gulp-concat"),
       sass = require('gulp-sass'),
     rename = require("gulp-rename"),
 sourcemaps = require('gulp-sourcemaps'),
   imagemin = require('gulp-imagemin'),
        del = require("del"),
runSequence = require('run-sequence'),
     serve  = require("gulp-connect"); 


//Concat the scripts
gulp.task("scripts", function () {
    return gulp.src("js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat("all.min.js"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/scripts"));
    });  


//compile css
gulp.task('styles', function () {
    return gulp.src('sass/global.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename("all.min.css"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('dist/styles'));
});

//compile images
gulp.task("images", function () {
   return gulp.src("images/*")
   .pipe(imagemin())
   .pipe(gulp.dest("dist/content"));
    
}); 
 
//deletes the compiled files in the folder.
gulp.task("clean", function () {
    return del([
            "dist/content",
            "dist/scripts",
            "dist/styles"])

});

//watch for changes
gulp.task("watch", function(event) {
  gulp.watch("js/**/*.js", ['scripts']);       
});

//As a developer, I should be able to run the gulp command at the command line to run the “build” task.
gulp.task("build", function () {
runSequence('clean', 'scripts', 'styles', 'images');
});


//Sets the default task to build.
gulp.task('default', ['build']);

//Starts a server on port 3000
gulp.task('serve', function() {
    serve.server({
  livereload: true,
        port: 3000
    });

});


