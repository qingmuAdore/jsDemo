/**更名方案 静态资源文件名补上hash值标识 */

//引入gulp和gulp插件
const gulp = require('gulp'),
    rev = require('gulp-rev'),
    clean = require('gulp-clean'),
    sequence = require('run-sequence');
revCollector = require('gulp-rev-collector');

//定义css、js源文件路径,manifest导出路径等
const paths = {
    css: { src: 'src/public/css/*.css', dist: 'dist/public/css/', rev: 'rev/public/css/' },
    js: { src: 'src/public/js/*.js', dist: 'dist/public/js/', rev: 'rev/public/js/' },
    commmon: { manifest: 'rev/public/**/*.json' },
    html: { src: 'src/views/*.html', dist: 'dist/views/' }
};

//清空文件夹,避免资源冗余
gulp.task('clean', function () {
    return gulp.src(['rev', 'dist'], { read: false })
        .pipe(clean());
});

gulp.task('css', function () {
    return gulp.src(paths.css.src)
        .pipe(rev())
        .pipe(gulp.dest(paths.css.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest(paths.css.rev));
});

gulp.task('js', function () {
    return gulp.src(paths.js.src)
        .pipe(rev())
        .pipe(gulp.dest(paths.js.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest(paths.js.rev));
});

gulp.task('html', function () {
    return gulp.src([paths.commmon.manifest, paths.html.src])
        .pipe(revCollector({
            replaceReved: true, //replaceReved标识, 用来说明模板中已经被替换的文件是否还能再被替换,默认是false
            dirReplacements: {  //标识目录替换的集合, 因为gulp-rev创建的manifest文件不包含任何目录信息
                // 'css': paths.css.dist,
                // 'js': paths.js.dist,
                // 'cdn/': function (manifest_value) {
                //     return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                // }
            }
        }))
        .pipe(gulp.dest(paths.html.dist));
});

gulp.task('default', function (done) {
    sequence(['css', 'js'], ['html'], done);
});