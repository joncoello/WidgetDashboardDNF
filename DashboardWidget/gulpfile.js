/// <binding BeforeBuild='copy' />
const gulp = require('gulp');
const ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('copy', function () {
    
    gulp.src(
      [
          'node_modules/dashboardwidget/widget-component.ts',
      ])
      .pipe(gulp.dest('Scripts'));

    return gulp.src('scripts/**/*.ts')
        .pipe(ts(tsProject));


});
