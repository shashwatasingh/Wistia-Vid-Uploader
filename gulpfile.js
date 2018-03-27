var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  src = 'app/';

gulp.task('js', function() {
  gulp.src(src + 'js/**/*');
});

gulp.task('html', function() {
  gulp.src(src + '*.html');
});

gulp.task('css', function() {
  gulp.src(src + 'css/*.css');
});

gulp.task('watch', function() {
  gulp.watch(src + 'js/**/*', ['js']);
  gulp.watch(src + 'css/*.css', ['css']);
  gulp.watch([src + '*.html',
    src + 'views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src(src)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
