'use strict';

var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');

gulp.task('copy', function () {
   return gulp.src('./bower_components/**/*')
       .pipe(gulp.dest('./public/bower_components'));
});

gulp.task('vulcanize', function () {
    return gulp.src(['./src/applications/*.html'])
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: false,
            inlineScripts: false
        })).on('error', console.log)
        .pipe(gulp.dest('./public/applications')).on('error', console.log);
});

gulp.task('watch', function () {
    return gulp.watch('./src/**/*', ['vulcanize']);
});

gulp.task('default', function () {
   return console.log(this);
});