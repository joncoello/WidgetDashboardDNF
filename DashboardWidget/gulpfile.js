/// <binding BeforeBuild='default' />
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const gulpSequence = require('gulp-sequence');

gulp.task('copy', function () {
    return gulp.src(
      [
          'node_modules/dashboardwidget/widget-component.ts',
      ])
      .pipe(gulp.dest('Scripts'));
});

gulp.task('transpile', function () {
    return tsProject.src()
        .pipe(tsProject());
});

gulp.task('default', gulpSequence('copy', 'transpile'));