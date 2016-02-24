var gulp = require('gulp');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var minifyCSS = require('gulp-minify-css');

gulp.task('appcss' ,function() {
    return gulp
        .src('./client/ui/myapp.css')
        .pipe(minifyCSS())
        .pipe(rename('app.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('appjs', function() {
    return gulp
        .src('./client/myapp/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify({mangle: false}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('vendorjs', function() {
    return gulp
        .src(['./client/vendors/bower_components/angular/angular.min.js',
            './client/vendors/bower_components/angular-route/angular-route.min.js',
            './client/vendors/bower_components/angular-cookies/angular-cookies.min.js',
            './client/vendors/bower_components/angular-animate/angular-animate.min.js',
            './client/vendors/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './client/vendors/bower_components/socket.io-client/socket.io.js'
        ])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./public/javascripts'));
});
