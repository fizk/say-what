'use strict';

var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var sass = require('gulp-sass');
var path = require('path');
var stylemod = require('gulp-style-modules');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('copy', function () {
   return gulp.src('./bower_components/webcomponentsjs/**/*')
       .pipe(gulp.dest('./public/bower_components/webcomponentsjs'));
});

gulp.task('vulcanize', function () {
    return gulp.src(['./src/applications/*.html'])
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: false,
            inlineScripts: true
        })).on('error', console.log)
        .pipe(gulp.dest('./public/applications')).on('error', console.log);
});

gulp.task('css', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            remove: false
        }).on('error', console.log))
        .pipe(stylemod({
            filename: function (file) {
                return path.basename(file.path, path.extname(file.path)) + "-style";
            },
            moduleId: function(file) {
                return path.basename(file.path, path.extname(file.path)) + "-css";
            }
        }).on('error', console.log))
        .pipe(gulp.dest('./src'));
});

gulp.task('watch', function () {
    return gulp.watch(['!./src/**/*-style.html', './src/**/*'], ['css', 'vulcanize']);
});

gulp.task('default', ['css', 'vulcanize'], function () {
   return console.log('Done');
});
