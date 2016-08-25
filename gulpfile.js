var gulp = require('gulp'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename')
  jade = require('gulp-jade'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  refresh = require('gulp-livereload'),
  jshint = require('gulp-jshint');

var transform = require('vinyl-transform');
var out_source = process.env.OUT || 'dist/';
var source = 'src/';
console.log('Building client to "%s" path', out_source);

var paths = {
  source: source,
  styles: source + 'less/*.less',
  fonts: source + 'fonts/**/*',
  scripts: [
    source + 'js/index.js',
    source + 'js/**/module.js',
    source + 'js/**/*.js'
  ],
  views: source + 'views/*.jade',
  index: source + 'index.jade',
  partials: source + 'partials/**/*.jade',
  libs: [
    source + 'libs/**/jquery.min.js',
    source + 'libs/**/*.js',
    source + 'libs/*.js'
  ],
  images: source + 'images/**/*',
  misc: source + 'misc/**/*',
  out: {
    source: out_source,
    styles: out_source + 'styles',
    fonts: out_source + 'styles/fonts',
    images: out_source + 'images',
    app: out_source + 'js',
    app_filename: 'main.js',
    views: out_source + 'views',
    libs_filename: 'libs.js',
    components: out_source + 'components'
  }
}

//
// Custom less styles
// ------------------------------------
//
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sourcemaps.init({
      // loadMaps: true,
      debug: true,
      includeContent: false,
      sourceRoot: '/less'
    }))
    .pipe(less()).on('error', console.log)
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./maps/'))
    .pipe(gulp.dest(paths.out.styles))
});

//
// Fonts
// ------------------------------------
//
gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.out.fonts))
});

//
// Scripts
// ------------------------------------
//
gulp.task('scripts', function() {
  return gulp.src(paths.scripts, { base: 'js' })
    .pipe(jshint())
    .pipe(sourcemaps.init({
      // loadMaps: true,
      debug: true,
      includeContent: false,
      sourceRoot: '/js'
    }))
    .pipe(concat(paths.out.app_filename))
    .pipe(uglify().on('error', console.log))
    .pipe(sourcemaps.write('./maps/'))
    .pipe(gulp.dest(paths.out.app))
});

//
// Library's
// ------------------------------------
//
gulp.task('libs', function() {
  return gulp.src(paths.libs)
    .pipe(concat(paths.out.libs_filename))
    .pipe(gulp.dest(paths.out.app))
});

//
// Misc file's
// ------------------------------------
//
gulp.task('misc', function() {
  return gulp.src(paths.misc)
    .pipe(gulp.dest(paths.out.source))
});

//
// Views
// ------------------------------------
//
gulp.task('views', function() {
  return gulp.src(paths.views)
    .pipe(jade({
      locals: {}
    }))
    .on('error', console.log)
    .pipe(gulp.dest(paths.out.views))
});

//
// images
// ------------------------------------
//
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.out.images))
});

//
// index
// ------------------------------------
//
gulp.task('index', function() {
  return gulp.src(paths.index)
    .pipe(jade({
      locals: {}
    }))
    .on('error', console.log)
    .pipe(gulp.dest(paths.out.source))
});

// ------------------------------------

gulp.task('build', [
  'styles',
  'fonts',
  'scripts',
  'index',
  // 'views',
  'libs',
  'misc',
  'images'
]);

gulp.task('default', ['build'], function() {
  gulp.start('watch');
});

gulp.task('watch', function() {
  require('./www');

  refresh.listen();

  gulp.watch(source + 'less/**/*.less', ['styles']);
  gulp.watch(paths.index, ['index']);
  // gulp.watch(paths.views, ['views']);
  gulp.watch(paths.partials, ['index', 'views']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});
