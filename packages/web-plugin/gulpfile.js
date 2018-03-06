'use strict';

const gulp = require("gulp");
const browserify = require("browserify");
const buffer = require("gulp-buffer");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const log = require("gulplog");

const appBundler = browserify({
  entries: ['./src/App.js'],
  transform: [
    ['babelify', {
      "presets": ['es2015', 'react']
    }
    ],
    ['browserify-css']
  ]
});

appBundler.bundle()
  .pipe(source('./src/App.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .on('error', log.error)
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist/'));

gulp.task('bundle', function() {
  return appBundler;
});


