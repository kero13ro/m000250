"use strict";

var $window = $(window);
var wW = $(window).width();
var wH = $(window).height();
// var esc = $.Event("keydown", { keyCode: 27 });

var $cover = $("#fixed-cover");

if (wW > 768) {
  $(".mCustomScrollbar_index").mCustomScrollbar({
    theme: "dark-thick"
  });
}

var main = $("main");

$.when($.ready).then(function () {
  var mainTL = new TimelineLite().to(main, 0.6, { autoAlpha: 1, ease: Power0.easeNone });
});

if (wW > 768 && document.querySelector(".index_landing") !== null) {
  var manL = $(".index_landing .man-f");
  var manR = $(".index_landing .man-m");
  var plus1 = $(".index_landing .plus-1");
  var plus2 = $(".index_landing .plus-2");
  var plus3 = $(".index_landing .plus-3");
  var plus4 = $(".index_landing .plus-4");

  var love = $(".index_landing .love");
  var strict = $(".index_landing .strict");

  var nav__logo = $(".nav__logo");

  var indexTL = new TimelineMax().call(function () {
    nav__logo.addClass("show");
  }).from(manL, 1, { x: "+=40", autoAlpha: 0 }, 0.3).from(manR, 1, { x: "-=40", autoAlpha: 0 }, 0.6).from([plus1, plus2, plus3, plus4], 1, { autoAlpha: 0 }, 0.5).from(love, 1, { autoAlpha: 0 }, 0.5).from(strict, 1, { autoAlpha: 0 }, 0.5);

  var landingBgc = $(".index_landing");
}

if (document.querySelector(".index_landing") !== null) {

  var itemBlocks = $(".division .block");
  var controller_index = new ScrollMagic.Controller();
  var scrollTL_index = new TimelineLite().staggerFrom(itemBlocks, 0.8, { autoAlpha: 0, y: 10 }, 0.1);

  var index_item_scroll = new ScrollMagic.Scene({
    triggerElement: ".division",
    triggerHook: 0.9,
    reverse: false
  }).setTween(scrollTL_index).addTo(controller_index);

  // var blueCir = $(".tips .multi .circle:first-child");
  // var orangeCir = $(".tips .multi .circle:last-child");
  // var searchbar = $(".index_search .searchbar");

  // var divisionTitle = $(".division .title");

  // var searchbar_TL = new TimelineMax();
  // blueCir.one('mouseover', function () {
  //   searchbar_TL
  //     .to(searchbar, 0.3, { transform: "scale(1.02)" })
  //     .to(searchbar, 0.3, { transform: "scale(1)" });
  // });  
}

if (document.querySelector("footer") !== null) {
  var controller_footer = new ScrollMagic.Controller();
  var scrollTL = new TimelineLite().to("#svg2", 2.6, { morphSVG: "#svg1", ease: Elastic.easeOut.config(1, 1) });

  var s2_scroll = new ScrollMagic.Scene({
    triggerElement: "footer",
    triggerHook: 0.9,
    reverse: false
  }).setTween(scrollTL).addTo(controller_footer);
}

var alert_tl = new TimelineMax();

$(".js-password").click(function () {
  alert_tl.set(".alert", { "display": "none" }).set("#alert-password", { "display": "flex" }).from("#alert-password", 0.3, { autoAlpha: 0 });
});

$(".js-account").click(function () {
  alert_tl.set(".alert", { "display": "none" }).set("#alert-account", { "display": "flex" }).from("#alert-account", 0.3, { autoAlpha: 0 });
});

if (wW > 768) {
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

  $(".fixedInner").append(fixedBarItems1).append(fixedBarItems2);
  $(".fixedInner .nav__logo h1").remove();
} else {
  $(".cart__num").insertAfter("#nav .icon-cart");
}

//scroll show fixedBar
if (wW > 768) {
  var landingHeight = $(".navPad").height();
  var fixedBar = $(".fixedBar");
  var searchBar = $(".nav__search");

  $window.on("scroll", function () {
    if ($window.scrollTop() > landingHeight) {
      fixedBar.addClass("show");
      searchBar.addClass("fixedType");
    } else {
      fixedBar.removeClass("show");
      searchBar.removeClass("fixedType");
    }
  });
}

//nav 會以 append 變換結構，因此在 resize 過邊界時 reload 全部頁面
$window.resize(function () {
  if (wW > 768) {
    $window.width() <= 768 ? reload() : "";
  } else {
    $window.width() > 768 ? reload() : "";
  }
});

function reload() {
  TweenLite.set($("main"), { autoAlpha: 0 });
  location.reload();
}

if (wW <= 768 && document.querySelector("#nav") !== null) {

  var menuTL = new TimelineMax({ paused: true, reversed: true, yoyo: true });
  var menu__cover = $(".nav__cover");
  var bgcBefore = $(".nav__bgc .before");
  var bgcAfter = $(".nav__bgc .after");
  var chars = new SplitText($(".nav__cover > a"), { type: "words,chars" }).chars;
  var nav_external = $(".nav__external");
  for (var i = 0; i < chars.length; i++) {
    i % 2 === 0 ? chars[i].classList.add("s") : chars[i].classList.add("l");
  }

  var chars_s = $(".nav__cover .s");
  var chars_l = $(".nav__cover .l");
  var chars_odd = $(".nav__cover > a:nth-child(odd)");
  var chars_even = $(".nav__cover > a:nth-child(even)");

  var toggle = $(".nav__toggle");
  var burger1 = toggle.find(".one");
  var burger2 = toggle.find(".two");
  var burger3 = toggle.find(".three");
  var menu__logo = menu__cover.find(".menu__logo");

  menuTL.set(menu__cover, { visibility: "visible" }).staggerFrom(bgcBefore, 0.8, { width: "0%", ease: Power3.easeInOut }, 0.08).staggerFrom(bgcAfter, 0.8, { width: "0%", ease: Power3.easeInOut }, 0.08, 0).addLabel("chars", "-=0.6").from(chars_s, 1, { autoAlpha: 0 }, "chars").from(chars_l, 1, { autoAlpha: 0 }, "chars").from(chars_s, 1, { transform: "scale(1.5) rotateY(-180deg)" }, "chars").from(chars_l, 1, { transform: "scale(0.5) rotateY(180deg)" }, "chars").from(chars_odd, 1, { x: 60, ease: Power1.easeInOut }, "chars").from(chars_even, 1, { x: -60, ease: Power1.easeInOut }, "chars").from(menu__logo, 1, { x: 60, autoAlpha: 0, ease: Power1.easeInOut }, "chars+=0.3").from(nav_external, 1, { x: 60, autoAlpha: 0, ease: Power1.easeInOut }, "chars+=0.2").to([burger1, burger2, burger3], 0.3, { backgroundColor: "#fff" }, 0).to(burger3, 0.3, { y: -6 }, 0).to(burger1, 0.3, { y: 6 }, 0).to([burger1, burger2], 0.8, { rotation: 235, ease: Power2.easeInOut }, 0.3).to([burger1, burger2], 0.2, { rotation: "-=10", ease: Power3.easeOut }, 1.2).to(burger3, 0.8, { rotation: 325, ease: Power2.easeInOut }, 0.3).to(burger3, 0.2, { rotation: "-=10", ease: Power3.easeOut }, 1.2);

  $(".nav__toggle").click(function () {
    menuTL.reversed() ? menuTL.play() : menuTL.reverse();
  });
}

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

$(".slick-show").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  asNavFor: ".slick-nav"
});

$(".slick-nav").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: ".slick-show",
  dots: false,
  arrows: false,
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3
    }
  }]
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
  });

  if (wW < 768) {
    $(".user-menu .toggle-nav").click(function () {
      var target = $(this).next(".toggle-cover");
      target.stop(true, false, true).slideToggle(200);

      $cover.addClass("show").click(function () {
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
      var str = $(this).html();
      var index = str.indexOf("/");
      var output = str.slice(0, index - 1) + "<br>" + str.slice(index + 1);
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
        var output = str.slice(0, index) + "<br>" + str.slice(index + 1);
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
    $("table.column th").each(function () {
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
  $(".nav__cart").click(function () {
    $("#dashboard").addClass("expend");

    $("#dashboard .icon-right").click(function () {
      $("#dashboard").removeClass("expend");
      $cover.off().removeClass("show");
    });

    $cover.addClass("show").click(function () {
      $("#dashboard").removeClass("expend");
      $cover.off().removeClass("show");
    });
  });

  //search bar
  var scan = $("#nav .scan");
  var searchBar = $(".nav__search");

  var searchClose = searchBar.find(".search-close");

  scan.click(function () {
    searchBar.fadeToggle();

    $cover.addClass("show").click(function () {
      searchBar.fadeOut();
      $cover.off().removeClass("show");
    });
  });

  searchClose.click(function () {
    searchBar.fadeOut();
    $cover.off().removeClass("show");
  });

  $(".go-top").each(function () {
    $(this).click(function () {
      $("html,body").animate({ scrollTop: 0 }, 1500, 'easeInOutCubic');
      return false;
    });
  });

  $(".wp").on('mousewheel', function () {
    $('html,body').stop();
  });

  //product.html sticky recommand list
  if (document.querySelector(".recommand") !== null) {
    var $recommand = $(".recommand");
    var recommandHeight = $recommand.height();
    var recommandTop = $recommand.offset().top;
    var recommandLeft = $recommand.offset().left;
    var $recommand_clearLayer = $recommand.find(".outer");

    var productBottom = $(".product").offset().top + $(".product").height();
    var winTop;

    $window.scroll(function () {

      winTop = $window.scrollTop();

      if (winTop + 70 < recommandTop) {
        //top not sticky
        $recommand.removeClass("sticky");
        $recommand_clearLayer.removeAttr("style");
      } else if (winTop + recommandHeight + 70 < productBottom) {
        //sticky type
        $recommand.removeClass("bottom");
        $recommand.addClass("sticky");
        $recommand_clearLayer.css("left", recommandLeft + "px");
      } else {
        //bottom not sticky
        $recommand.addClass("bottom");
        $recommand.removeClass("sticky");
        $recommand_clearLayer.removeAttr("style");
      }
    });
  }

  //advanced search next stage 
  if (document.querySelector(".advanced") !== null) {

    $(" .radio_unit,\
        .check_unit").each(function () {
      $(this).change(function () {
        $(this).parents(".search__block").next(".search__block").find(".check_unit input").removeAttr("disabled");
      });
    });
  }

  $(".card__cart").click(function (e) {
    // e.stopPropagation();
    e.preventDefault();
  });

  var return_all = document.getElementById("return-all");
  var return_child = $("table.plain tbody .check_unit input");

  $(return_all).change(function () {

    if (return_all.checked == true) {
      return_child.prop("checked", this.checked).prop("disabled", "true");
    } else {
      return_child.prop("checked", false).prop("disabled", false);
    }
  });
}); // $(function ) end
//# sourceMappingURL=ui.js.map
