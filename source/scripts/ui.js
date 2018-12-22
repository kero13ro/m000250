



var $window = $(window);
var wW = $(window).width();
var wH = $(window).height();
var esc = $.Event("keydown", { keyCode: 27 });

var $cover = $("#fixed-cover");

//loading動畫

var main = $("main");




// $("#customScrollbar").mCustomScrollbar({
//   theme: "dark"
// });

// $("document").ready(function () {
//   TweenLite.to(main, 0.5, { autoAlpha: 1 });
// });

$.when($.ready).then(function () {
  TweenLite.to(main, 0.5 ,{  autoAlpha: 1});
  TweenMax.to("#svg2", 3, { morphSVG: "#svg1", ease: Elastic.easeOut.config(1, 1), })
  // TweenMax.to("#svg2", 1, { morphSVG: "#svg1"})

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


// $(" .icon-strict, \
//     .icon-love").click(function (e) {
//   e.preventDefault();
// })




if (  wW > 768) {
  $("#nav").append("<div class='grayBar'><div class='grayInner'></div></div> \
                    <div class='fixedBar'><div class='fixedInner'></div></div>");

  var cart = $(".nav__cart");
  $(".nav__cover").append(cart);

  var grayBlockItems = $("#nav .nav__logo, \
                          #nav .nav__favorite, \
                          #nav .nav__strict");
  $(".grayInner").append(grayBlockItems);


  var fixedBarItems1 = $(".grayInner > a").clone();
  var fixedBarItems2 = $(".nav__cover > a").clone();

  $(".fixedInner")
    .append(fixedBarItems1)
    .append(fixedBarItems2);
  $(".fixedInner .nav__logo h1").remove();

} else {
  $(".cart__num").insertAfter("#nav .icon-cart");

}



//scroll show fixedBar
var landingHeight = $(".navPad").height();
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
});


function reload() {
  // $("main").css("opacity", "0");
  location.reload()
}





if (wW <= 768) {
  var menuTL = new TimelineMax({ paused: true, reversed: true, yoyo: true });
  var menu__cover = $(".nav__cover");
  // var cover_list = $(".nav__cover a");
  // var toggle = $(".nav__toggle");
  // var burger1 = toggle.find(".one");
  // var burger2 = toggle.find(".two");
  // var burger3 = toggle.find(".three");

  menuTL
    .to(menu__cover, 0.2, { "display": "flex", autoAlpha: 1 },0.2);
    // .staggerFrom(cover_list, 0.4, { autoAlpha: 0, x: 30, ease: Power2.easeOut }, 0.1, 0.3)
    

  $(".nav__toggle").click(function () {
    menuTL.reversed() ? menuTL.play() : menuTL.reverse();
  });
}




// if (wW <= 500) {
//   $(".nav__main").hover(function () {
    
//     var inner = $(this).find(".inner .main");

//     var other = $(".inner .main").not(inner);

//     // var tiptool = TimelineMax({pause: true});
//     // tiptool.to(inner, 0.3, { "display": "block", autoAlpha: 1});

//     TweenLite.to(other, 0.3, { "display": "none", autoAlpha: 0 });
//     TweenLite.to(inner, 0.3, { "display": "block", autoAlpha: 1 });
    
//   });
// }




// var resizeId;

// $(window).resize(function () {
//   clearTimeout(resizeId);
//   resizeId = setTimeout(doneResizing, 1);
// });

// function doneResizing() {

// }


// catalog mobile dropdwon
if (wW <= 1100) {
  $(".icon-double-right").click(function () {

    var dropdwon = $(this).next(".dropdwon");
    dropdwon.fadeToggle();

    $cover.addClass("show").click(function () {
      dropdwon.fadeOut();
      $cover.off().removeClass("show");
    });
  });
} 






$(function () {  
  // TweenMax.to("#svg2", 3, { morphSVG: "#svg1", ease: Elastic.easeOut.config(1, 0.75), })
});


$(".slick-show").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  // fade: true,
  asNavFor: ".slick-nav"
});

$(".slick-nav").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: ".slick-show",
  dots: false,
  arrows: false
  // centerMode: true,
  // focusOnSelect: true
});


$(function () {
  $("[data-user-tab]").click(function () {
    
    var $this = $(this);

    if (!$this.hasClass("active")) {
      $this.siblings("a").removeClass("active");
      $this.addClass("active");
    }

    var dataTab = $this.attr("data-user-tab");
    var target = $("#" + dataTab);

    target.siblings(".tab-pane").hide();
    target.fadeIn();
  })
  


  if (wW < 768 ) {
    $(".user-menu .toggle-nav").click(function() {
      var target = $(this).next(".toggle-cover");
      target.stop(true, false, true).slideToggle(200);

      $cover.addClass("show").click(function() {
        target.stop(true, false, true).slideUp(200);
        $cover.off().removeClass("show");
      });
    });
  }


  //表格部分內文過長，RWD 插入斷行
  if (document.querySelector("[data-abbr='type1']") !== null && wW < 900) {

    $(" [data-abbr] td:nth-child(1)").each(function () {
      var str = $(this).text();
      var output = str.substr(0, 5) + "<br/>" + str.substr(5);
      $(this).html(output);
    });

    
    $(" [data-abbr] th:nth-child(2), \
        [data-abbr] td:nth-child(2) ").each(function () {      
      var str = $(this).text();
      var index = str.indexOf("/");
      var output = str.slice(0, index -1) + "<br>" + str.slice(index+1);      
      $(this).html(output);
    });

    $(" [data-abbr] td:nth-child(5)").each(function () {      
      var str = $(this).text();
      var output;
      if (str.length >= 7) {
        output = str.substr(0, 4) + "<br/>" + str.substr(4);
      } 
      $(this).html(output);
    });

    $(" [data-abbr] td:nth-child(7)").each(function () {      
      var str = $(this).text();
      var index = str.indexOf("-");
      if (index !== -1) {
        var output = str.slice(0, index) + "<br>" + str.slice(index+1);      
        $(this).html(output);
      }
    });
  }


  if (document.querySelector("[data-abbr='type2']") !== null && wW < 900) {

    $("[data-abbr] td:nth-child(1) \
      ,[data-abbr] td:nth-child(2) ").each(function () {
      var str = $(this).text();
      $(this).html(str.substr(0, 5) + "<br/>" + str.substr(5));
    });

    
    $(" [data-abbr] th:nth-child(3), \
        [data-abbr] td:nth-child(3) ").each(function () {      
      var str = $(this).html();
      var index = str.indexOf("/");
      $(this).html(str.slice(0, index - 1) + "<br>" + str.slice(index + 1));
    });
  }

  if (document.querySelector("[data-abbr='type3']") !== null && wW < 900) {
    $("[data-abbr] td:nth-child(2)").each(function () {
      var str = $(this).html();
      var index = str.indexOf("(");
      if (index !== -1) {
        $(this).html(str.slice(0, index - 1) + "<br>" + str.slice(index));
      }
    });

  }


  if (document.querySelector("[data-abbr='type4']") !== null && wW < 360) {
    $("table.column th").each(function() {
      var str = $(this).text();
      if (str.length >= 7) {
        $(this).html(str.substr(0, 4) + "<br/>" + str.substr(4));
      } else if (str.length >= 5) {
        $(this).html(str.substr(0, 2) + "<br/>" + str.substr(2));
      }
    });
  }



  var fqAns = $(".faq-main").find("li");
  fqAns.click(function () {
    $(this).siblings(".active").removeClass("active");
    $(this).siblings("li").find(".ans").slideUp();

    $(this).addClass("active");
    $(this).find(".ans").slideDown();
  
  });



  //index right dashboard
  $(".nav__cart").click(()=>{
    $("#dashboard").addClass("expend");

    $("#dashboard .icon-right").click(() => {
      $("#dashboard").removeClass("expend");
      $cover.off().removeClass("show");
    });

    $cover.addClass("show").click(function () {
      $("#dashboard").removeClass("expend");
      $cover.off().removeClass("show");
    });



  });

});// $(function ) end