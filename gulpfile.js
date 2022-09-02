'use strict';

// Require our Gulp Plugins
const gulp        = require('gulp'),
      sourcemaps  = require('gulp-sourcemaps'),
      source      = require('vinyl-source-stream'),
      buffer      = require('vinyl-buffer'),
      browserify  = require('browserify'),
      notify      = require('gulp-notify'),
      babel       = require('babelify'),
      sass        = require('gulp-sass')(require('sass')),
      sassImport  = require('sass-module-importer'),
      watch       = require('gulp-watch'),
      browserSync = require('browser-sync').create();

// Function to handle errors.
// Prevents Gulp from stopping.
var handleError = function(err) {
  notify.onError("Doh! Check iTerm for details!")(err);
  console.log(' <error> ------------------------ ');
  console.log(err.message);
  console.log(' </error> ----------------------- ');
  this.emit('end');
}

// Converts SASS into CSS
function gulpSass(cb) {
  return gulp.src('./src/scss/main.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({ importer: sassImport() }).on('error', handleError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/css'));
};

// Converts ES2015+ to ES5 & Supports Modules
function browserifyMe () {
  return browserify('./src/js/main.js', {debug: true})
    .transform(babel)
    .bundle()
    .on('error', handleError)
    .pipe(source('./bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/js'));
};

function watchSass () {
  return watch('./src/sass/**/*.scss', gulpSass);
}

function watchJS() {
  return watch(['./src/js/**/*.js', './package.json'], browserifyMe);
}

function watchCode() {
  return watch('./app/**/**', () => { browserSync.reload(); });
}

// Watches our .scss & .js files for change
exports.watch = gulp.series(
  gulpSass,
  gulp.parallel(
    watchSass,
    watchJS,
    watchCode
  )
);

// Runs a simple browser sync server
function server() {
  return browserSync.init({
    server: "./app",
    port: 8080,
    // open: false,
    notify: false
  });
};

// Builds our app
exports.build = gulp.series(
  gulpSass,
  browserifyMe
)

// Starts the development process
exports.start = gulp.series(
  gulpSass,
  browserifyMe,
  server,
  gulp.parallel(watchSass,
    watchJS,
    watchCode),

)
