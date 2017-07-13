/// <binding BeforeBuild='default' />
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const gulpSequence = require('gulp-sequence');

gulp.task('copy', function () {
    gulp.src(
      [
            'node_modules/dashboardwidget/widget-component.ts',
            'Scripts/*.*'
      ])
        .pipe(gulp.dest('Scripts'));

   
    gulp.src(
        [
            'node_modules/font-awesome/fonts/*.*'
        ])
        .pipe(gulp.dest('fonts'));

    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery-ui-dist/jquery-ui.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/font-awesome/css/font-awesome.css',
        'node_modules/lodash/dist/lodash.min.js',
        'node_modules/gridstack/dist/gridstack.min.css',
        'node_modules/gridstack/dist/gridstack.all.js'
    ]).pipe(gulp.dest('.'));
});

gulp.task('transpile', function () {
    return tsProject.src()
        .pipe(tsProject());
});

gulp.task('default', gulpSequence('copy', 'transpile'));