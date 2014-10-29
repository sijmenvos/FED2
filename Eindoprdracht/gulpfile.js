var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    ngmin       = require('gulp-ngmin'),
    cssmin      = require('gulp-minify-css'),
    stripDebug  = require('gulp-strip-debug');

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src([
    //- COMPONTENTS
    "./public/components/angular/angular.js",
    "./public/components/angular-touch/angular-touch.js",
    "./public/components/angular-ui-router/release/angular-ui-router.js",
    //- SCRIPTS
    "./public/javascripts/app.js",
    "./public/javascripts/factories.js",
    "./public/javascripts/controllers.js",
    "./public/javascripts/models.js",
    ])
    .pipe(stripDebug())
    .pipe(ngmin())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/build'));
});

gulp.task('css', function() {
  return gulp.src("./public/stylesheets/*")
    .pipe(concat('styles.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('public/build'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'css']);