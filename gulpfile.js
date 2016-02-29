"use strict";

var gulp = require("gulp"),
    fs = require("fs"),
    path = require("path"),
    inject = require("gulp-inject"),
    concat = require("gulp-concat"),
    sass = require("gulp-sass"),
    typescript = require("gulp-typescript"),
    watch = require("gulp-watch"),
    es = require("event-stream");

var componentDirectory = "Client/Components/";
function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task("ts", function () {
        return gulp.src(["Client/Scripts/**/*.ts", "Client/Components/**/*.ts", "typings/browser.d.ts"]).pipe(typescript({ sortOutput: true, target: "es5" })).pipe(concat("application.js")).pipe(gulp.dest("wwwroot/"));
});

gulp.task("js", function () {
    return gulp.src([
        "node_modules/webcomponents.js/webcomponents.js",
        "node_modules/es6-promise/dist/es6-promise.js",
        "Client/Scripts/**/*.js"
    ]).pipe(concat("libraries.js")).pipe(gulp.dest("wwwroot/"));
});

gulp.task("css", function () {
    return gulp.src(["Client/Styles/**/*.scss"]).pipe(sass()).pipe(concat("styles.css")).pipe(gulp.dest("wwwroot/"));
});

gulp.task("fonts", function () {
    return gulp.src(["Client/Fonts/*"]).pipe(gulp.dest("wwwroot/Fonts/"));
});

gulp.task("images", function () {
    return gulp.src(["Client/Images/*"]).pipe(gulp.dest("wwwroot/Images/"));
})

gulp.task("languages", function() {
    return gulp.src(["Client/Scripts/Data/Languages/*.json"]).pipe(gulp.dest("wwwroot/Languages/"));
});

gulp.task("html", function() {
   var folders = getFolders(componentDirectory);
   var tasks = folders.map(function(folder) {
       return gulp.src(path.join(componentDirectory, folder, "*.html"))
       .pipe(inject(gulp.src(path.join(componentDirectory, folder, '*.scss')).pipe(sass()),
           {
                starttag: '<!-- inject:css -->',
                transform: function (filePath, file) {
                    // return file contents as string 
                    return "<style>\n" + file.contents.toString('utf8') + "\n</style>";
                }
            }
       ));
   });
   return gulp.src("Client/index.html").pipe(inject(es.merge(tasks).pipe(concat("components.html")), {
                starttag: '<!-- inject:html -->',
                transform: function (filePath, file) {
                    // return file contents as string 
                    return file.contents.toString('utf8');
                }
            })).pipe(gulp.dest("wwwroot/"));
});

gulp.task("watch", function () {
    watch(["Client/Components/**/*.ts", "Client/Scripts/**/*.ts"], function (events, done) {
        gulp.start("ts");
    });
    watch(["Client/index.html", "Client/Components/**/*.html", "Client/Components/**/*.scss"], function (events, done) {
        gulp.start("html");
    });
    watch(["Client/Styles/**/*.scss"], function (events, done) {
        gulp.start("css");
        gulp.start("html");
    });
});

gulp.task("default", ["ts", "js", "css", "fonts", "images", "languages", "html"]);
