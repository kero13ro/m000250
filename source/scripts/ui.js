

var $window = $(window);
var wW = $(window).width();
var wH = $(window).height();
var esc = $.Event("keydown", { keyCode: 27 });


//scroll fix navbar

function check_nav_fix() {
  var $nav = $("#nav");
  // var navH = $nav.height() + $nav.find(".nav__shift").height();
  var navH = $nav.height();
  var window_top_position = $window.scrollTop();
  
  if (window_top_position > navH) {
    $nav.addClass("fixed-js");
  } else {
    $nav.removeClass("fixed-js");
  }
  // $("#navPad").css("height", navH+"px");
}

$window.on("scroll resize", check_nav_fix);


check_nav_fix();


$("document").ready(function () {


});



//loading動畫測試
// $.when($.ready).then(function () {
//   $("main").css("opacity","1");
// });

// $.ready.then(function () {
//   $("main").css("opacity","1");
// });



var alert_tl = new TimelineMax();

$(".js-password").click(function () {
  alert_tl
    .set(".alert", { "display": "none" })
    .set("#alert-password", { "display": "flex" })
    .from("#alert-password", 0.3, {autoAlpha: 0 });
});



$(".js-account").click(function () {

  alert_tl
    .set(".alert", { "display": "none" })
    .set("#alert-account", { "display": "flex" })
    .from("#alert-account", 0.3, {autoAlpha: 0 });
});