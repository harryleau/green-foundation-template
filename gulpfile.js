const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const wait = require("gulp-wait");

// compile sass
gulp.task("sass", function() {
  return gulp
    .src(["src/sass/main.scss"])
    .pipe(wait(250))
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// watch sass and server
gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./dist"
  });

  gulp.watch(["src/sass/*.scss", "src/sass/*/*.scss"], ["sass"]);
  gulp.watch(["dist/*.html", "dist/*/*.html"]).on("change", browserSync.reload);
});

gulp.task("default", ["sass", "serve"]);
