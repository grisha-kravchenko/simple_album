const gulp = require('gulp');
const processHtml = require('./index');
const config = require('./config.json');

// Gulp task to process HTML files
gulp.task('process-html', function () {
  return gulp.src(config.src + '/*.html') // Source HTML files
    .pipe(processHtml()) // Replace custom tags
    .pipe(gulp.dest(config.dist)); // Destination folder
});

gulp.task('default', gulp.series('process-html'));