/** 版本方案 给链接资源地址补上版本参数 */

const gulp = require('gulp'),
    rev = require('gulp-rev'),
    clean = require('gulp-clean'),
    version = require('gulp-version-number');


//定义css、js源文件路径,manifest导出路径等
const paths = {
    css: { src: 'src/public/css/*.css', dist: 'dist/public/css/', rev: 'rev/public/css/' },
    js: { src: 'src/public/js/*.js', dist: 'dist/public/js/', rev: 'rev/public/js/' },
    commmon: { manifest: 'rev/public/**/*.json' },
    html: { src: 'src/views/*.html', dist: 'dist/views/' }
};

const versionConfig = {
    value: '%TS%',
    append: {
        'key': 'v',
        'to': ['css', 'js'],
    },
};

//清空文件夹,避免资源冗余
gulp.task('clean', function () {
    return gulp.src(['rev', 'dist'], { read: false })
        .pipe(clean());
});

gulp.task('css', function () {
    return gulp.src(paths.css.src)
        .pipe(gulp.dest(paths.css.dist));
});

gulp.task('js', function () {
    return gulp.src(paths.js.src)
        .pipe(gulp.dest(paths.js.dist));
});

gulp.task('html', function () {
    return gulp.src(paths.html.src)
        .pipe(version(versionConfig))
        .pipe(gulp.dest(paths.html.dist));
});

gulp.task('default', ['clean', 'css', 'js', 'html']);

