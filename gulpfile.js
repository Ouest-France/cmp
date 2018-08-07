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
    , fs              = require('fs')
    , minify          = require('html-minifier').minify
    ;

// Variables de chemins
var source = './src'; // dossier de travail
var destination = './dist'; // dossier à livrer
var build = './build'; // dossier de compilation

scsslist =
    [
        [source + '/scss/main.scss', 'sipa-cmp.min.css']
    ]
;
jslist =
    [
        [source + '/js/cmp.js', 'sipa-cmp.min.js'], // nom du fichier référencé dans cmp.stub.js
        [source + '/js/cmp.stub.js', 'sipa-cmp.stub.min.js']
    ]
;

gulp.task('make-sass', ['clean'], function () {
    return es.merge(scsslist.map(function(a) {
        return gulp.src(a[0])
            .pipe(plumber(function(e){log.error('Erreur lors de la compilation SASS !', e);}))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(sourcemaps.write())
            .pipe(rename(a[1]))
            .pipe(cssnano({zindex: false}))
            .pipe(gulp.dest(build + '/css/min'));
    }));
});
function htmlmin(html){
    return minify(html, {collapseWhitespace: true});
}
gulp.task('compile-js', ['clean-js', 'make-sass', 'clean'], function () {
    var CMPCONSENTSRING = fs.readFileSync(source + '/js/cmp.consentstring.js', "utf8");
    var CMPTHROTTLE = fs.readFileSync(source + '/js/cmp.throttle.js', "utf8");
    var CMPCSS = fs.readFileSync(build + '/css/min/sipa-cmp.min.css', "utf8");
    var CMPHTML = htmlmin(fs.readFileSync(source + '/template/cmp.html', "utf8"));
    var CMPTEXT = htmlmin(fs.readFileSync(source + '/template/cmp_text.html', "utf8"));

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
            .pipe(replace('##CMPCONSENTSRING##', CMPCONSENTSRING))
            .pipe(replace('##CMPTHROTTLE##', CMPTHROTTLE))
            .pipe(replace('##CMPCSS##', CMPCSS))
            .pipe(replace('##CMPHTML##', CMPHTML))
            .pipe(replace('##CMPTEXT##', CMPTEXT))
            .pipe(replace('https://sipaof.mgr.consensu.org/sipacmp/sipa-cmp.min.js', 'https://sipaof.mgr.consensu.org/'+(process.env.FTP_ENV || 'sipacmp')+'/sipa-cmp.min.js'))
            .pipe(rename(a[1]))
            .pipe(gulp.dest(build +"/js/dev"))
            .pipe(plumber(function(e){log.error('Erreur lors de la minification JS!', e);}))
            .pipe(uglify())
            .pipe(gulp.dest(build +"/js/min"));
    }));
});

gulp.task("documentation", ['html', 'oueststrap', 'clean']);
gulp.task("html", ['clean'], function() {
    return gulp.src(['./docs/**/*.html'])
        .pipe(replace('../build/js/dev', process.env.FTP_ENV ? 'js' : '../build/js'))
        .pipe(gulp.dest(destination + '/'));
});
gulp.task("oueststrap", ['clean'], function() {
    return gulp.src(['./docs/**/*', '!./docs/**/*.html'])
        .pipe(gulp.dest(destination + '/'));
});
gulp.task("make-js-dev", ['compile-js', 'clean-js', 'clean'], function() {
    return gulp.src([build + '/js/dev/**/*'])
        .pipe(gulp.dest(destination + '/js'));
});
gulp.task("make-js-prod", ['compile-js', 'clean-js', 'clean'], function() {
    return gulp.src([build + '/js/min/**/*'])
        .pipe(gulp.dest(destination + '/js'));
});

gulp.task("clean-js", function() {
    return del([
        destination + '/**/*.js'
    ]);
});
gulp.task("clean", ["clean-js"], function(){
    return del([
        build + '/*',
        destination + '/*',
    ]);
});


//
// Commandes utiles ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
gulp.task("watch", function() {
    gulp.start('make-dev-assets');
    watch( [
            source + '/scss/**/*.scss',
            source + '/js/**/*.js',
        ], function(){
        gulp.start('make-dev-assets');

    });
});

gulp.task("make-dev-assets", ["clean", "make-sass", "make-js-dev", "documentation"]);
gulp.task("make-prod-assets", ["clean", "make-sass", "make-js-prod", "documentation"]);
gulp.task("default", ["clean", "make-prod-assets"]);
gulp.task("build-dev", ["clean", "make-dev-assets"]);
