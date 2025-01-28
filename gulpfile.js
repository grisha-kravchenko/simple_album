const gulp = require('gulp');
const processHtml = require('./index');

// Gulp task to process HTML files
gulp.task('process-html', function () {
  return gulp.src('src/*.html') // Source HTML files
    .pipe(processHtml()) // Replace custom tags
    .pipe(gulp.dest('dist')); // Destination folder
});

gulp.task('default', gulp.series('process-html'));