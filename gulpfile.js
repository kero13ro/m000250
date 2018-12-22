var gulp = require("gulp");
// var merge = require('merge-stream');
var browserSync = require("browser-sync").create();
var plumber = require("gulp-plumber");

var pug = require('gulp-pug');
var babel = require("gulp-babel");

var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var order = require("gulp-order");

// var imagemin = require("gulp-imagemin");
// var ghPages = require("gulp-gh-pages");




gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./public",
      index: "./index.html"
    },
    reloadDebounce: 1000
  });
});

//test
gulp.task('pug', function buildHTML() {
  return gulp.src('./source/html/*.pug')
  .pipe(plumber())
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest("./public"))
  .pipe(browserSync.stream());
});



gulp.task("sass", function() {
  var plugins = [                         
    autoprefixer({ browsers: ['defaults'] })//postcss 使用的套件
  ];

  return  gulp
    .src("./source/styles/**/*.sass")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ 
      outputStyle: 'nested',
      includePaths: [
        './node_modules/bourbon/core',
      ]})
    .on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./public/styles"))
    .pipe(browserSync.reload({
      stream: true
    }));
});



gulp.task("copy-css", function () {
  // gulp
  //   .src("./source/styles/**/*.sass")
  //   .pipe(gulp.dest("./public/styles/sassBackup/"));

  gulp
    .src(["./source/styles/images/*.jpg", "./source/styles/images/*.png"])
    .pipe(gulp.dest("./public/styles/images/"));


  gulp
    .src("./source/styles/plugin/**/*")
    .pipe(gulp.dest("./public/styles/plugin/"));

});


gulp.task("babel", function () {
  gulp
    .src(["./source/scripts/ui.js","./source/scripts/pages/*.js"])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ["env"]}))
    .pipe(concat("ui.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./public/scripts"))
    .pipe(browserSync.stream());
});


gulp.task("vendorJs", function () {
  return gulp
    .src([
      "./source/scripts/plugins/*",
      "./node_modules/slick-carousel/slick/slick.min.js",
      // "./node_modules/lity/dist/lity.min.js",//與上方plugin重複，會彈跳二次
      // "./node_modules/jquery-focuspoint/js/jquery.focuspoint.min.js",
      "./node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"
    ])
    .pipe(order([
        "jquery.min.js",
        "jquery.easing.1.3.js",
        "TweenMax.min.js",
        "ScrollMagic.js",
        "**.js"
      ]))
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("./public/scripts/plugins/"));
});


gulp.task("watch", function() {
  gulp.watch("./source/**/*.pug", ["pug"]);
  gulp.watch("./source/styles/**/*.sass", ["sass"]);
  gulp.watch("./source/styles/**/*.css", ["copy-css"]);
  gulp.watch(["source/styles/images/*"], ["copy-css"]);  // did not use "./" for relative directories。https://stackoverflow.com/questions/22391527/gulps-gulp-watch-not-triggered-for-new-or-deleted-files
  gulp.watch("./source/scripts/**/*.js", ["babel"]);
  gulp.watch("./source/scripts/**/*.js", ["vendorJs"]);
});




gulp.task("default", [
  "pug",
  "sass",
  'copy-css',
  "babel",
  'vendorJs',
  "browser-sync",
  "watch"
]);





//從node_module 中複製插件的css，用於修改及複寫
// 但有時候會修改 bootstrap-reboot 導致覆蓋，不建議用指令

// gulp.task("copy-plugin-css", function () {
//   gulp.src([

//     './node_modules/lity/dist/lity.css',
//     "./node_modules/bootstrap/dist/css/bootstrap-reboot.css",
//     './node_modules/jquery-focuspoint/css/focuspoint.css',
//     "./node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css"
    
//   ]).pipe(gulp.dest("./source/styles/plugin"))

//   gulp.src([
//     './node_modules/slick-carousel/slick/**/*',
//   ]).pipe(gulp.dest("./source/styles/plugin/slick"))
// });



//在sass前面插入plugin的css，但考量到需要調整（覆蓋會累贅），因此改用複製到資料夾內、import方式


// gulp.task("sass", function() {
//   var plugins = [                         
//     autoprefixer({ browsers: ['defaults'] })//postcss 使用的套件
//   ];

//   var cssStream = gulp.src([
//     './node_modules/lity/dist/lity.css',
//     './node_modules/jquery-focuspoint/css/focuspoint.css',
//     './node_modules/bootstrap/dist/css/bootstrap-reboot.css',
//     './node_modules/bootstrap/dist/css/bootstrap-grid.css',
//   ]).pipe(concat("css.css"));

//   var sassStream =  gulp
//     .src("./source/styles/**/*.sass")
//     .pipe(plumber())
//     .pipe(sourcemaps.init())
//     .pipe(sass({ 
//       outputStyle: 'nested',
//       includePaths: [
//         './node_modules/bourbon/core',
//       ]})
//     .on("error", sass.logError))
//     .pipe(postcss(plugins))
//     .pipe(concat("sass.css"));

//   //合併外部css及sass
//   return merge(cssStream,sassStream)
//     .pipe(concat("style.css"))
//     .pipe(order(["css.css","sass.css",]))
//     .pipe(gulp.dest("./public/styles"))
//     // .pipe(sourcemaps.write("."))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// });





// gulp.task("deploy", function () {
//   return gulp.src("./public/**/*").pipe(ghPages());
// });

// //還沒測試與tinymap的差異 。實測約5%
// gulp.task("image-min", (function () {
//   return gulp
//     .src("./source/styles/images/*")
//     .pipe(imagemin([
//       imagemin.gifsicle({ interlaced: true }),
//       imagemin.jpegtran({ progressive: true }),
//       imagemin.optipng({ optimizationLevel: 5 }),
//     ])).pipe(gulp.dest("./public/styles/images"));
// }));
