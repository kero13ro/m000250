

var wW = $(window).width();
var wH = $(window).height();
var esc = $.Event("keydown", { keyCode: 27 });



//nav 當前頁面的樣式
var currentPage = sessionStorage.getItem("nav");
var navPages = $("#nav .nav_shop a, \
                  .login, \
                  .logo");

navPages.filter("[href='" + currentPage + "']").addClass("current");

navPages.click(function () {
  var tmp = $(this).attr("href");  
  sessionStorage.setItem("nav", tmp);
});




//qa 左右滑動目錄
var left = $(".control .icon-left-thin");
var right = $(".control .icon-right-thin");
var qa__menu = $(".qa__menu .scrollbarX");

left.click(function () {
  var leftPos = qa__menu.scrollLeft();
  qa__menu.stop(true, false, true).animate({ scrollLeft: leftPos - 200 }, 800);
});
right.click(function () {
  var leftPos = qa__menu.scrollLeft();
  qa__menu.stop(true, false, true).animate({ scrollLeft: leftPos + 200 }, 800);
});




if (
  document.querySelector("#confirm") !== null ||
  document.querySelector("#complete") !== null
) {
  var childPos = $(".progress .current").position();
  var parentPos = $(".current").position();

  var scrollWidth = childPos.left - parentPos.left;
  $(".scrollbarX").scrollLeft(scrollWidth);
}