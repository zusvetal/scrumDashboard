/**
 * Created by vzusko on 9/14/2016.
 */
var gulp = require('gulp'),
    concatJS = require('gulp-concat'),
    concatCSS = require('gulp-concat-css'),
    minifyCSS = require('gulp-minify-css'),
    less= require('gulp-less'),
    minifyJS=require('gulp-uglify'),
    rename =  require('gulp-rename'),
    embedTemplates = require('gulp-angular-embed-templates');

var path = {
    src: {
        css: ['app/**/*.less', 'app/**/*.css'],
        js: 'app/**/*.js'
    },
    watch: {
        css: ['app/**/*.less', 'app/**/*.css'],
        js: ['app/**/*.js', 'app/**/*.html']
    }
}
gulp.task('css', function () {
    gulp.src(path.src.css)
        .pipe(less())
        .pipe(concatCSS('bundle.css'))
        // .pipe(minifyCSS())
        // .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('./public'))

});
gulp.task('js', function () {
    gulp.src(path.src.js)
        .pipe(embedTemplates())
        .pipe(concatJS('app.js'))
        .pipe(gulp.dest('./public'))

});
gulp.task('watch', function () {
    gulp.watch(path.watch.css, function(){
        gulp.start('css')
    });
    gulp.watch(path.watch.js, function(){
        gulp.start('js')
    })
})

