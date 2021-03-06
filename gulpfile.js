"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');
const babel = require('gulp-babel');

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/img/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.jpg")
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/*.svg")
    //    .pipe(svgstore({
    //      inlineSvg: true
    //    }))
    //    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("minify", function () {
  return gulp.src("build/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"));
});

gulp.task('default', () =>
    gulp.src('source/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('build/js'))
);

gulp.task("compress", function () {
  return gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html", "compress", "minify"));
gulp.task("start", gulp.series("build", "server"));
