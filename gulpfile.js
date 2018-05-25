var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cache = require('gulp-cache');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var path = require('path');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var paths = {
  html: '*.html',
  scssSource: './src/scss/**/*.scss',
  cssDest: './dest/assets/css/',
  // jquery first (it won't be repeated)
  jsSource: ['./src/js/vendor/jquery-2.1.4.min.js', './src/js/**/*.js'],
  jsDest: './dest/assets/js/',
  svgSource: './src/images/svg/*.svg'
};

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('css', function(){
  gulp.src(paths.scssSource)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer('last 4 versions'))
    .pipe(gulp.dest(paths.cssDest))
    .pipe(browserSync.reload({ stream : true }))
});

gulp.task('js', function(){
  return gulp.src(paths.jsSource)
	 .pipe(plumber())
	 .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
	 .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.jsDest))
    .pipe(browserSync.reload({ stream : true }))
});

gulp.task('svgstore', function () {
  var svgs = gulp
    .src(paths.svgSource, { base: 'src/svg' })
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgstore({ inlineSvg: true }));

  function fileContents (filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src(paths.html)
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/scss/**/*.scss", ['css']);
  gulp.watch("src/js/**/*.js", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
});
