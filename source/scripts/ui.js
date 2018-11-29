

var $window = $(window);
var wW = $(window).width();
var wH = $(window).height();
var esc = $.Event("keydown", { keyCode: 27 });


$("document").ready(function () {


  //scroll fix navbar
  var $nav = $("#nav");
  var navH = $nav.height() + $nav.find(".nav__shift").height();

  function check_nav_fix() {
    var window_top_position = $window.scrollTop();
    
    if (window_top_position > navH) {
      $nav.addClass("fixed-js");
    } else {
      $nav.removeClass("fixed-js");
    }
  }

  $window.on("scroll resize", check_nav_fix);
  check_nav_fix();

});



//loading動畫測試
// $.when($.ready).then(function () {
//   $("main").css("opacity","1");
// });

// $.ready.then(function () {
//   $("main").css("opacity","1");
// });


