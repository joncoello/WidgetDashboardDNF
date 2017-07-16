/// <binding BeforeBuild='default' />
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const gulpSequence = require('gulp-sequence');
const argv = require('yargs').argv
const rename = require('gulp-rename');
const concat = require('gulp-concat');

gulp.task('copy', function () {

    var configFile = 'config-dev';
    if (argv.prod) {
        configFile = 'config-prod';
    };
    gulp.src(
      [
          'scripts/' + configFile + '.ts',
      ])
      .pipe(rename('config.ts'))
      .pipe(gulp.dest('scripts'));

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

gulp.task('concat', function () {
    return gulp.src(['./scripts/config.js', './scripts/main.js'])
      .pipe(concat('script.js'))
      .pipe(gulp.dest('./scripts/'));
});

gulp.task('default', gulpSequence('copy', 'transpile', 'concat'));