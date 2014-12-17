var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var gulpConcat = require('gulp-concat');
var clean = require('gulp-clean');
var async = require('async');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence').use(gulp);


gulp.runSync = function (tasks, cb) {
  var sync = tasks.map(function (t) {
    if (Array.isArray(t)) {
      return gulp.run.bind.apply(gulp.run, [gulp].concat(t));
    }
    return gulp.run.bind(gulp, t);
  });
  async.series(sync, cb);
  return gulp;
};

gulp.task('sass', function () {
  return gulp.src('./client/scss/*.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./client/dist'));
});

gulp.task('js', function () {
  gulp.src([
      // angular-file-upload-shim.min.js must be place before angular.min.js
      './client/lib/lodash/dist/lodash.js',
      './client/lib/ng-file-upload/angular-file-upload-shim.js',
      './client/lib/moment/min/moment.js',
      './client/lib/angular/angular.js',
      './client/lib/ng-file-upload/angular-file-upload.js',
      './client/lib/angular-momentjs/angular-momentjs.js',
      './client/lib/angular-ui-router/release/angular-ui-router.js',
      './client/lib/ngFx/dist/ngFx.js',
      './client/app/app.js',
      './client/app/loading/loading.js',
      './client/app/login/login.js',
      './client/app/signUp/signUp.js',
      './client/app/photo/photo.js',
      './client/app/prompts/create_prompt.js',
      './client/app/prompts/prompts.js',
      './client/app/prompts/prompt.js',
      './client/app/suggestions/suggestions.js',
      './client/app/suggestions/suggestions_prompts.js',
      './client/app/services/services.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(gulpConcat('main.js'))
    .pipe(sourcemaps.write())
    // .pipe(uglify()) // Takes a long time
    .pipe(gulp.dest('./client/dist/'));
});



gulp.task('cordoba-build', function () {
  gulp.src(['./client/**/*'])
    .pipe(gulp.dest('./cordoba/www/'));
});

gulp.task('cordoba-clean', function () {
  return gulp.src('./cordoba/www/')
    .pipe(clean({
      force: true
    }));
});

gulp.task('default', ['js', 'sass']);
gulp.task('cordoba', function (cb) {
  return runSequence('cordoba-clean', 'cordoba-build', cb);
});

gulp.task('watch', ['js', 'sass'], function () {
  gulp.watch('./client/scss/**/*.scss', ['sass']);
  gulp.watch('./client/**/*.js', ['js']);
});

gulp.task('cordoba-watch', ['js', 'sass', 'cordoba'], function () {
  gulp.watch('./client/scss/**/*.scss', function () {
    return runSequence('sass', 'cordoba');
  });
  gulp.watch('./client/**/*.js', function () {
    return runSequence('js', 'cordoba');
  });
});