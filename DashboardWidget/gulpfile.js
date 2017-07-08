/// <binding BeforeBuild='copy' />
const gulp = require('gulp');

gulp.task('copy', function () {
    
    return gulp.src(
      [
          'node_modules/dashboardwidget/widget-component.ts',
      ])
      .pipe(gulp.dest('Scripts'));

});