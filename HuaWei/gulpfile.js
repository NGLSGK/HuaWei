/*
    创建gulp任务
    CommonJS规范
*/
const gulp  = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

//压缩js文件
const uglify = require('gulp-uglify');

//压缩css文件
const minifyCSS = require('gulp-minify-css');

//临时服务器
const connect= require('gulp-connect');


//测试
gulp.task('hello', function(){
    console.log('hello world')
})

//拷贝html文件
gulp.task('html', function(){
    return gulp.src('*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
})

//拷贝图片
gulp.task('images', function(){
    return gulp.src('img/**/*')
    .pipe(gulp.dest('dist/img'))
    .pipe(connect.reload());
})

//拷贝js框架文件
gulp.task('js', function(){
    return gulp.src(['*.js', '!gulpfile.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
})

//拷贝数据
gulp.task('data', function(){
    return gulp.src(['json/*.json', 'xml/*.xml'])
    .pipe(gulp.dest('dist/data'))
    .pipe(connect.reload());
})

//拷贝js文件
gulp.task('scripts', function(){
    return gulp.src('javascript/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
})

//压缩首页css
gulp.task('indexSass', function(){
    return gulp.src('stylesheet/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})

//压缩公共样式文件文件
gulp.task('top', function(){
    return gulp.src('stylesheet/top.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('top.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})
gulp.task('footer', function(){
    return gulp.src('stylesheet/footer.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('footer.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})
gulp.task('reset', function(){
    return gulp.src('stylesheet/reset.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('reset.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})
gulp.task('iconfont', function(){
    return gulp.src('stylesheet/iconfont.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(rename('iconfont.min.css'))
    .pipe(gulp.dest('dist/css'));
})


//一次执行多个任务
gulp.task('build', ['html', 'images', 'js', 'data', 'scripts', 'indexSass', 'top', 'footer', 'reset', 'iconfont'], function(){
    console.log('项目建立成功')
})

//监听
gulp.task('watch', function(){
    gulp.watch('*.html', ['html']);
    gulp.watch('img/**/*', ['images']);
    gulp.watch(['*.js'], ['js']);
    gulp.watch(['javascript/*.js'], ['scripts']);
    gulp.watch(['xml/*.xml', 'json/*.json'], ['data']);
    gulp.watch('stylesheet/reset.scss', ['reset']);
    gulp.watch('stylesheet/top.scss', ['top']);
    gulp.watch('stylesheet/index.scss', ['indexSass']);


    gulp.watch('stylesheet/footer.scss', ['footer']);
})


//启动一个临时服务器
gulp.task('server', function(){
    connect.server({
        root: 'dist',
        port: 8888,
        livereload: true
    })
})

//同时启动监听和服务器
gulp.task('default', ['watch', 'server']);