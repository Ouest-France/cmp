var   gulp            = require("gulp")
    , del             = require("del")
    , include         = require("gulp-include")
    , rename          = require("gulp-rename")
    , uglify          = require("gulp-uglify")
    , sass            = require("gulp-sass")
    , watch           = require("gulp-watch")
    , sourcemaps      = require('gulp-sourcemaps')
    , plumber         = require('gulp-plumber')
    , cssnano         = require('gulp-cssnano')
    , replace         = require('gulp-replace')
    , log             = require('fancy-log')
    , es              = require('event-stream')
    ;

// Variables de chemins
var source = './src/assets'; // dossier de travail
var destination = './dist'; // dossier à livrer
var build = './build'; // dossier de compilation
var static = '../server/src/main/resources/static/'; // dossier de compilation

scsslist =
    [
        [source + '/scss/main-algolia.scss', 'main-algolia.min.css']
    ]
;
jslist =
    [
        [source + '/js/app.js', 'app-algolia.min.js']
    ]
;

gulp.task('make-sass', ['clean-css', 'clean'], function () {
    return es.merge(scsslist.map(function(a) {
        return gulp.src(a[0])
            .pipe(plumber(function(e){log.error('Erreur lors de la compilation SASS !', e);}))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(sourcemaps.write())
            .pipe(rename(a[1]))
            .pipe(gulp.dest(build + '/css/dev'))
            .pipe(cssnano({zindex: false}))
            .pipe(gulp.dest(build + '/css/min'));
    }));
});
gulp.task('compile-js', ['clean-js', 'clean'], function () {
    return es.merge(jslist.map(function(a) {
        return gulp.src(a[0])
            .pipe(plumber(function(e){log.error('Erreur lors de la compression JS!', e);}))
            .pipe(include({
                    extensions: "js",
                    hardFail: true,
                    includePaths: [
                      source + "/js"
                    ]
                }))
                .on('error', console.log)
            .pipe(rename(a[1]))
            .pipe(gulp.dest(build +"/js/dev"))
            .pipe(plumber(function(e){log.error('Erreur lors de la minification JS!', e);}))
            .pipe(uglify())
            .pipe(gulp.dest(build +"/js/min"));
    }));
});
gulp.task('move-dev-assets', ['make-dev-assets', 'clean'], function () {
    return gulp.src([destination + '/**/*'])
        .pipe(gulp.dest(static + '/'));
});

gulp.task("make-css-dev", ["make-sass"], function() {
    return gulp.src([build + '/css/dev/**/*'])
        .pipe(gulp.dest(destination + '/css'));
});
gulp.task("make-css-prod", ["make-sass"], function() {
    return gulp.src([build + '/css/min/**/*'])
        .pipe(gulp.dest(destination + '/css'));
});
gulp.task("make-js-dev", ['compile-js', 'clean-js', 'clean'], function() {
    return gulp.src([build + '/js/dev/**/*'])
        .pipe(gulp.dest(destination + '/js'));
});
gulp.task("make-js-prod", ['compile-js', 'clean-js', 'clean'], function() {
    return gulp.src([build + '/js/min/**/*'])
        .pipe(gulp.dest(destination + '/js'));
});

gulp.task("clean-css", function() {
    return del([
        destination + '/**/*.css'
    ]);
});
gulp.task("clean-js", function() {
    return del([
        destination + '/**/*.js'
    ]);
});
gulp.task("clean", ["clean-js", "clean-css"], function(){
    return del([
        build + '/**/*'
    ]);
});


//
// Commandes utiles ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
gulp.task("watch", function() {
    gulp.start('move-dev-assets');
    watch( [
            source + '/scss/**/*.scss',
            source + '/js/**/*.js',
        ], function(){
        gulp.start('move-dev-assets');

    });
});

gulp.task("make-dev-assets", ["clean", "make-sass", "make-css-dev", "make-js-dev"]);
gulp.task("make-prod-assets", ["clean", "make-sass", "make-css-prod", "make-js-prod"]);
gulp.task("default", ["clean", "make-prod-assets"]);
gulp.task("build-dev", ["clean", "make-dev-assets", "move-dev-assets"]);
