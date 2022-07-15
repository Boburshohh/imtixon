const { task, src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const rename = require("gulp-rename");

task("clear", function () {
    return del("./build");

});

task("css", function (cb) {
    return src("./src/sass/**/main.scss").pipe(sourcemaps.init())
        .pipe(sass()).pipe(sourcemaps.write("./map")).pipe(dest("./build/css"));
    cb();
});
task("css:min", function (cb) {
    return src("./src/sass/**/main.scss").pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle:"compressed"
        })).pipe(rename("main.min.css")).pipe(sourcemaps.write("./map")).pipe(dest("./build/css"));
    cb();
});
task("html", function (cb) {
    return src("./src/*.html").pipe(dest("./build/"));
    cb();
});

task("js", function (cb) {
    return src("./src/js/**/*.js").pipe(dest("./build/js/"));
    cb();
});
task("image", function (cb) {
    return src("./src/img/**/*.*").pipe(dest("./build/img"));
    cb();
});
task("sass", function (cb) {
    return src("./src/sass/**/*.scss").pipe(dest("./build/scss"));
    cb();
});

task("watch", function () {
    watch("./src/*.html", parallel("html"));
    watch("./src/img/**/*.*", parallel("image"));
    watch("./src/js/**/*.js", parallel("js"));
    watch("./src/sass/**/*.scss", parallel("css"));
    watch("./src/sass/**/*.scss", parallel("css:min"));
    watch("./src/sass/**/*.scss", parallel("sass"));

});
task("default", series(
    parallel("clear"),
    parallel("html"),
    parallel("watch", "sass", "css","css:min", "image", "js")
));