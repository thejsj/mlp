var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task('sass', function () {
  return gulp.src('./client/scss/*.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./client/css'));
});

gulp.task('watch', function () {
  gulp.watch('./client/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass']);