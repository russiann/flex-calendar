var gulp    = require('gulp'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    minify  = require('gulp-minify-css');
    dest    = gulp.dest;

gulp.task('uglify', function () {
  return gulp.src('src/flex-calendar.js')
  .pipe(dest('dist/'))
  .pipe(uglify())
  .pipe(rename({extname: '.min.js'}))
  .pipe(dest('dist/'));
});

gulp.task('minify-css', function () {
  return gulp.src('src/flex-calendar.css')
  .pipe(dest('dist/'))
  .pipe(minify())
  .pipe(rename({extname: '.min.css'}))
  .pipe(dest('dist/'));
});

gulp.task('default', ['uglify', 'minify-css']);
