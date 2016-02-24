var gulp = require('gulp');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('appJS', function() {
      //gulp.src(['./client/myapp/myapp.js', './client/myapp/**/*.js'])
      return
      gulp.src(['./client/myapp/myapp.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({ prefix: '.min' }))
        .pipe(gulp.dest('./public/javascripts'))
});
