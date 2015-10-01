var gulp = require('gulp');
var run = require('gulp-run');
var bump = require('gulp-bump');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

// Bump the version included in bower.json and package.json
gulp.task("bump-version", function () {
    return gulp.src(["./bower.json", "./package.json"])
        .pipe(bump({ type: "patch" }))
        .pipe(gulp.dest("./"));
});

// Compress JS files
gulp.task('compressjs', function() {
  return gulp.src('src/cinnamon.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
     }))
    .pipe(gulp.dest('src'));
});

// Default task group
gulp.task('default', ['compressjs']);

// Run
gulp.task('run', ['default'], function () {
    return run('npm start').exec();
});
