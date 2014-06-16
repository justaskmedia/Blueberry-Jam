var gulp = require('gulp'),
   jshint = require('gulp-jshint');
   concat = require('gulp-concat'),
   sass = require('gulp-sass'),
   prefix = require('gulp-autoprefixer'),
   browserSync = require('browser-sync'),
   imagemin = require('gulp-imagemin'),
   pngcrush = require('imagemin-pngcrush'),
   uglify = require('gulp-uglify');

gulp.task('js', function () {
   return gulp.src('assets/dev/js/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('production.js'))
      .pipe(gulp.dest('assets/prod/js'))
      .pipe(browserSync.reload({stream:true}));
});

var optionsAutoprefixer = {
  map: true,
  from: 'asset',
  to: 'assets/.min.css'
};


gulp.task('sass', function () {
    gulp.src('assets/dev/sass/**/*.scss')
        .pipe(sass())
        .pipe(prefix('last 2 version', 'ie 8', 'ie 9', optionsAutoprefixer))
        .pipe(gulp.dest('assets/prod/css/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function () {
   var files = [
      '**/*.html',
      'assets/dev/sass/**/*.scss',
      'assets/dev/img/**/*.png',
      'assets/dev/js/**/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
});



gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("assets/dev/sass/**/*.scss", ['sass']);

    return gulp.src('assets/dev/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('assets/prod/img'));
});