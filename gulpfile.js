const 
    gulp = require('gulp'),
    uglify = require('gulp-uglify-cli'),
    concat = require('gulp-concat'),
    argv = require('yargs').argv,
    exec = require('child_process').exec;


gulp.task('run', ['build', 'watch'], function (cb) {
    let env = argv.dev ? 'dev' : 'start';
    exec(`npm run ${env}`, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('build', ['build:js']);
gulp.task('build:js', function(cb) {
    var layoutBundle = gulp.src(['public/js/src/*.js'])
        .pipe(concat('layout.bundle.js'));
    var libBundle = gulp.src([
        'public/js/lib/jquery/*.js', 
        'public/js/lib/tether/*.js',
        'public/js/lib/*.js'
        ])
        .pipe(concat('lib.bundle.js'));
    if (!argv.dev) {
        layoutBundle = layoutBundle.pipe(uglify());
        libBundle = libBundle.pipe(uglify());
    }
        
    layoutBundle.pipe(gulp.dest('public/js/dist'));
    libBundle.pipe(gulp.dest('public/js/dist'));
});
gulp.task('watch', function() {
    gulp.watch('public/js/src/*.js', ['build:js']);
});