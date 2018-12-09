

var $window = $(window);
var wW = $(window).width();
var wH = $(window).height();
var esc = $.Event("keydown", { keyCode: 27 });



//loading動畫

var main = $("main");
// $("document").ready(function () {
//   TweenLite.to(main, 0.5, { autoAlpha: 1 });
// });

$.when($.ready).then(function () {
  TweenLite.to(main, 0.5 ,{  autoAlpha: 1});

});

// $.ready.then(function () {
//   // $("main").css("opacity","1");
//   TweenLite.to($("main"), 0.3, { "opacity": 1 })
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


$(" .icon-strict, \
    .icon-love").click(function (e) {
  e.preventDefault();
})




if (  wW > 768) {
  $(".nav").append("<div class='gray'></div> \
                    <div class='fixedBar'></div>")

  var cart = $(".cart")
  $(".nav__cover").append(cart);

  var grayBlockItems = $("#navPad .logo, \
                          #navPad .favorite, \
                          #navPad .strict")
  $(".gray").append(grayBlockItems);


  var fixedBarItems1 = $(".gray > a").clone();
  var fixedBarItems2 = $(".nav__cover > a").clone();

  $(".fixedBar").append(fixedBarItems1).append(fixedBarItems2);


} else {
  $(".cart__num").insertAfter(".nav .text");
}



//scroll show fixedBar
var landingHeight = $("#navPad").height();
var fixedBar = $(".fixedBar");

$window.on("scroll", function () {
  $window.scrollTop() > landingHeight ? fixedBar.addClass("show") : fixedBar.removeClass("show");
});


//nav 會以 append 變換結構，因此在 resize 過邊界時 reload 全部頁面
var beforeWidth = $(window).width();

$window.resize(function () {
  if (beforeWidth > 768 ) {
    ($window.width() <= 768) ? reload() : "";
  } else {
    ($window.width() > 768) ? reload() : "" ;
  }  
  beforeWidth = $window.width();
  console.log("tri");
  
})

// function reload() {
//   location.reload()
// }
function reload() {
  $("main").css("opacity", "0");
  location.reload()
}





// var resizeId;

// $(window).resize(function () {
//   clearTimeout(resizeId);
//   resizeId = setTimeout(doneResizing, 1);
// });

// function doneResizing() {

// }
      

