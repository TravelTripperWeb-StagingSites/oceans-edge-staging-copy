'use strict';

function readyDoc(fn) {
  var d = document;
  d.readyState == 'loading' ? d.addEventListener('DOMContentLoaded', fn) : fn();
}

var updateGuestsSlider = function updateGuestsSlider(guestsSliderOutput, val) {
  guestsSliderOutput.innerHTML = val;
  guestsSliderOutput.style.left = 59 + 12 * val + "px";
  var allRooms = document.querySelectorAll(".room-list-item");
  for (var i = 0; i < allRooms.length; i++) {
    var guestsNum = Number(allRooms[i].getAttribute("data-guests"));
    if (guestsNum < val) {
      allRooms[i].classList.add("hidden-by-guests");
    } else {
      allRooms[i].classList.remove("hidden-by-guests");
    }
  }
};

var resetInnerFilters = function resetInnerFilters() {
  var bedTypeFilters = document.querySelectorAll(".bed-type-filter");
  var roomViewFilter = document.querySelectorAll(".room-view-filter");
  var roomGuestsFilter = document.querySelectorAll(".room-guests-filter");
  for (var i = 0; i < bedTypeFilters.length; i++) {
    bedTypeFilters[i].value = "all";
  }
  for (var _i = 0; _i < roomViewFilter.length; _i++) {
    roomViewFilter[_i].value = "all";
  }
  for (var _i2 = 0; _i2 < roomGuestsFilter.length; _i2++) {
    roomGuestsFilter[_i2].value = "1";
    updateGuestsSlider(document.querySelector("#guestsSlider .output"), 1);
    updateGuestsSlider(document.querySelector("#guestsSliderMobile .output"), 1);
  }
};

var filterRooms = function filterRooms(roomType) {
  var allRooms = document.querySelectorAll(".room-list-item");
  if (roomType == "all") {
    document.querySelector(".filtered-rooms-text").innerHTML = "<span>" + allRooms.length + "</span> Rooms & Suites";
    for (var i = 0; i < allRooms.length; i++) {
      allRooms[i].classList.remove("hidden");
      allRooms[i].classList.remove("hidden-by-guests");
    }
  } else {
    var roomsToShow = document.querySelectorAll("." + roomType);
    var roomsCount = roomsToShow.length;
    document.querySelector(".filtered-rooms-text").innerHTML = "<span>" + roomsCount + "</span> " + roomType;
    for (var _i3 = 0; _i3 < allRooms.length; _i3++) {
      allRooms[_i3].classList.add("hidden");
    }
    for (var _i4 = 0; _i4 < roomsCount; _i4++) {
      roomsToShow[_i4].classList.remove("hidden");
      roomsToShow[_i4].classList.remove("hidden-by-guests");
    }
  }
  resetInnerFilters();
};

var filterThroughURL = function filterThroughURL() {
  if (window.location.href.indexOf("/stay/") > -1 && window.location.hash) {
    var hashValue = window.location.hash.substring(1);
    if (hashValue == 'accessible-rooms') {
      document.querySelector(".rooms-filter [data-filter='accessible']").click();
    } else if (hashValue == 'guestrooms') {
      document.querySelector(".rooms-filter [data-filter='guestroom']").click();
    } else if (hashValue == '1-bedrooms') {
      document.querySelector(".rooms-filter [data-filter='one-bedroom']").click();
    }
  }
};

readyDoc(function () {

  window.onhashchange = function () {
    filterThroughURL();
  };

  //if url contains hash
  setTimeout(function () {
    filterThroughURL();
  }, 500);

  //Rooms main Filter
  if (document.querySelectorAll(".rooms-filter li a").length > 1) {
    var roomsFilterItems = document.querySelectorAll(".rooms-filter li a");
    for (var _i5 = 0; _i5 < roomsFilterItems.length; _i5++) {
      roomsFilterItems[_i5].addEventListener("click", function (e) {
        var currentElement = e.currentTarget;
        for (var j = 0; j < roomsFilterItems.length; j++) {
          roomsFilterItems[j].classList.remove("active");
        }
        currentElement.classList.add("active");
        filterRooms(currentElement.getAttribute("data-filter"));
      });
    }
  }

  //Room Inner Filters

  if (document.querySelectorAll(".bed-type-filter").length > 0) {
    var bedTypeFilters;

    (function () {
      bedTypeFilters = document.querySelectorAll(".bed-type-filter");

      var allRooms = document.querySelectorAll(".room-list-item");
      for (var _i6 = 0; _i6 < bedTypeFilters.length; _i6++) {
        bedTypeFilters[_i6].onchange = function () {
          var bedTypeVal = this.value;
          for (var _i7 = 0; _i7 < allRooms.length; _i7++) {
            var bedType = allRooms[_i7].getAttribute("data-bed-type");
            if (bedType == bedTypeVal || bedTypeVal == "all") {
              allRooms[_i7].classList.remove("hidden-by-bedtype");
            } else {
              allRooms[_i7].classList.add("hidden-by-bedtype");
            }
          }
        };
      }
    })();
  }
  if (document.querySelectorAll(".room-view-filter").length > 0) {
    var viewTypeFilters;

    (function () {
      viewTypeFilters = document.querySelectorAll(".room-view-filter");

      var allRooms = document.querySelectorAll(".room-list-item");
      for (var _i8 = 0; _i8 < bedTypeFilters.length; _i8++) {
        viewTypeFilters[_i8].onchange = function () {
          var viewTypeVal = this.value;
          for (var _i9 = 0; _i9 < allRooms.length; _i9++) {
            var viewType = allRooms[_i9].getAttribute("data-view-type");
            if (viewType == viewTypeVal || viewTypeVal == "all") {
              allRooms[_i9].classList.remove("hidden-by-viewtype");
            } else {
              allRooms[_i9].classList.add("hidden-by-viewtype");
            }
          }
        };
      }
    })();
  }
  if (document.querySelectorAll("#guestsSlider").length > 0) {
    setTimeout(function () {
      var guestsSlider = document.querySelector("#guestsSlider .slider");
      var guestsSliderOutput = document.querySelector("#guestsSlider .output");
      guestsSliderOutput.innerHTML = guestsSlider.value; // Display the default slider value

      // Update the current slider value (each time you drag the slider handle)
      guestsSlider.oninput = function () {
        updateGuestsSlider(guestsSliderOutput, this.value);
      };
    }, 500);
  }
  if (document.querySelectorAll("#guestsSliderMobile").length > 0) {
    setTimeout(function () {
      var guestsSlider = document.querySelector("#guestsSliderMobile .slider");
      var guestsSliderOutput = document.querySelector("#guestsSliderMobile .output");
      guestsSliderOutput.innerHTML = guestsSlider.value; // Display the default slider value

      // Update the current slider value (each time you drag the slider handle)
      guestsSlider.oninput = function () {
        updateGuestsSlider(guestsSliderOutput, this.value);
      };
    }, 500);
  }
  if (document.querySelectorAll(".jsModalTrigger").length > 0) {
    document.querySelector(".jsModalTrigger").onclick = function () {
      document.getElementById("jsModal").style.display = "block";
    };
    document.querySelector(".jsModalClose").onclick = function () {
      document.getElementById("jsModal").style.display = "none";
    };
  }

  setTimeout(function () {
    //Instagram Slider
    if (document.getElementsByClassName('insta-slider').length > 0) {
      var slider = tns({
        container: '.insta-slider',
        items: 2,
        nav: false,
        mouseDrag: true,
        loop: true,
        prevButton: "#customNavItemsInsta .iconbtn--left", // previous button
        nextButton: "#customNavItemsInsta .iconbtn--right", // next button
        responsive: {
          640: {
            items: 3
          },
          700: {
            items: 4
          },
          900: {
            items: 4
          },
          1200: {
            items: 6
          }
        }
      });
    }
    var w = window.innerWidth;
    if (w < 768) {
      if (document.getElementsByClassName('offer-list-carousel').length > 0) {
        var offerSlider = tns({
          container: '.offer-list-carousel',
          items: 1.1,
          nav: false,
          mouseDrag: true,
          loop: false,
          prevButton: "#offersListCarouselNav .iconbtn--left", // previous button
          nextButton: "#offersListCarouselNav .iconbtn--right", // next button
          responsive: {
            767: {
              items: 2
            },
            1199: {
              items: 3
            }
          }
        });
      }
    }

    if (document.getElementsByClassName('asset-list-carousel').length > 0) {
      var assetSlider = tns({
        container: '.asset-list-carousel',
        items: 1,
        nav: false,
        mouseDrag: true,
        loop: false,
        prevButton: "#offersCarouselNav .iconbtn--left", // previous button
        nextButton: "#offersCarouselNav .iconbtn--right", // next button
        responsive: {
          767: {
            items: 2,
            "autoHeight": false
          },
          1199: {
            items: 3
          }
        }
      });
      document.querySelector("#sliderRange").addEventListener('change', function () {
        var ele = document.getElementById("sliderRange");
        var val = (ele.value - ele.getAttribute('min')) / (ele.getAttribute('max') - ele.getAttribute('min'));
        ele.style.backgroundImage = '-webkit-gradient(linear, left top, right top, ' + 'color-stop(' + val + ', #434343), ' + 'color-stop(' + val + ', #6f6f6f)' + ')';
        var sliderindex = document.getElementById('sliderRange').value;
        assetSlider.goTo(sliderindex - 1);
      });
    }
  }, 3000);

  if (document.getElementsByClassName('activities-list-carousel').length > 0) {
    var assetSlider = tns({
      container: '.activities-list-carousel',
      items: 1,
      nav: false,
      mouseDrag: true,
      loop: false,
      edgePadding: 15,
      prevButton: "#activitiesCarouselNav .iconbtn--left", // previous button
      nextButton: "#activitiesCarouselNav .iconbtn--right", // next button
      responsive: {
        767: {
          items: 3,
          edgePadding: 0
        },
        1199: {
          items: 4
        }
      }
    });
  }

  if (document.getElementsByClassName('hero-carousel__wrap').length > 0) {
    var slider = tns({
      container: '.hero-carousel__wrap',
      items: 1,
      nav: false,
      mouseDrag: true,
      loop: true,
      prevButton: "#heroNav .iconbtn--left", // previous button
      nextButton: "#heroNav .iconbtn--right" // next button
    });
  }

  if (document.getElementsByClassName('rooms-cross-sell__image__wrap').length > 0) {
    var slider = tns({
      container: '.rooms-cross-sell__image__wrap',
      items: 1,
      nav: true,
      mouseDrag: true,
      loop: true,
      prevButton: "#roomsNav .iconbtn--left", // previous button
      nextButton: "#roomsNav .iconbtn--right" // next button
    });
  }

  if (document.getElementsByClassName('amenities__listing').length > 0) {
    var slider = tns({
      container: '.amenities__listing',
      items: 2,
      nav: false,
      mouseDrag: true,
      loop: false,
      responsive: {
        900: {
          items: 4
        },
        1200: {
          items: 5
        }
      }
    });
  }

  if (document.getElementsByClassName('rooms-cross-carousel__handle').length > 0) {
    var slider = tns({
      container: '.rooms-cross-carousel__handle',
      items: 1,
      nav: false,
      mouseDrag: true,
      loop: false,
      edgePadding: 25,
      prevButton: "#roomsCarouselNav .iconbtn--left", // previous button
      nextButton: "#roomsCarouselNav .iconbtn--right", // next button
      responsive: {
        900: {
          items: 2,
          edgePadding: 50
        },
        1200: {
          items: 2,
          edgePadding: 85
        }
      }
    });
  }

  if (document.getElementsByClassName('rooms-cross-carousel__handle-suites').length > 0) {
    var slider = tns({
      container: '.rooms-cross-carousel__handle-suites',
      items: 1,
      nav: false,
      mouseDrag: true,
      loop: false,
      edgePadding: 25,
      prevButton: "#roomsCarouselNavSuites .iconbtn--left", // previous button
      nextButton: "#roomsCarouselNavSuites .iconbtn--right", // next button
      responsive: {
        900: {
          items: 2,
          edgePadding: 50
        },
        1200: {
          items: 2,
          edgePadding: 85
        }
      }
    });
  }

  // Tabs Script Start ======================================

  if (document.getElementsByClassName("filter-items")[0]) {
    setTimeout(function () {
      var catItems = document.querySelectorAll(".filter-items li a");
      for (var _i10 = 0; _i10 < catItems.length; _i10++) {
        catItems[_i10].addEventListener('click', function (e) {
          for (var j = 0; j < catItems.length; j++) {
            catItems[j].classList.remove("active");
          }
          e.currentTarget.classList.add("active");
          var filterItem = e.currentTarget.getAttribute("data-filter");
          var tabItems = document.getElementsByClassName("asset-item");
          var currentTabItems = document.getElementsByClassName(filterItem);
          if (filterItem == "all") {
            for (var _i11 = 0; _i11 < tabItems.length; _i11++) {
              tabItems[_i11].style.display = "flex";
            }
          } else {
            for (var _i12 = 0; _i12 < tabItems.length; _i12++) {
              tabItems[_i12].style.display = "none";
            }
            for (var _i13 = 0; _i13 < currentTabItems.length; _i13++) {
              currentTabItems[_i13].style.display = "flex";
            }
          }
        });
      }
    }, 2000);
  }

  //NavBar effects scripts

  var classname = document.getElementsByClassName("navbar__offer");
  var classname2 = document.getElementsByClassName("mobile-menu");
  var usercookie = getCookie("username");
  var navitemcls = document.querySelectorAll(".navbar .nav--device ul .has-subnav");

  if (usercookie == "cookiefreeoffer") {
    classname[0].setAttribute("id", 'navbar__offer__close');
    var el = document.getElementById('navbar__offer__close');
    el.classList.add("navbar__offer__close");
    // document.querySelector('.navbar .navbar-brand img').style.maxWidth = "200px";
    // document.querySelector(".navbar.is-fixed-top").style.height = "auto";
    // document.querySelector(".navbar.is-fixed-top+.main").style.paddingTop = "97px";
    // document.querySelector(".navbar .nav-device-lg").classList.add("nav-device-active");
    // document.querySelector(".nav--device").style.top = "98px !important";
    navMenu1();
  }

  var advclose = function advclose() {
    setCookie("username", "cookiefreeoffer", 1);
    classname[0].setAttribute("id", 'navbar__offer__close');
    var el = document.getElementById('navbar__offer__close');
    el.parentNode.removeChild(el);
    el.classList.add("navbar__offer__close");
    // document.querySelector('.navbar .navbar-brand img').style.maxWidth = "200px";
    // document.querySelector(".navbar.is-fixed-top").style.height = "auto";
    // document.querySelector(".navbar.is-fixed-top+.main").style.paddingTop = "97px";
    // document.querySelector(".navbar .nav-device-lg").classList.add("nav-device-active");
    // document.querySelector(".nav--device").style.top = "98px !important";
    navMenu1();
  };

  var mobilenavev = function mobilenavev() {
    var mobilecls = document.querySelector(".nav--device.mobileview");

    if (mobilecls.classList.contains('sm-d-none')) {
      mobilecls.classList.remove('sm-d-none');
      mobilecls.classList.add('sm-d-block');
    } else {
      mobilecls.classList.add('sm-d-none');
      mobilecls.classList.remove('sm-d-block');
    }

    // document.querySelector(".nav--device").classList.toggle('sm-d-block');
    document.querySelector(".mobile-menu").classList.toggle('is-active');
  };

  var advclose3 = function advclose3() {
    var queryall = document.querySelectorAll(".navbar .nav--device ul .nav__item i");
    var subnav = document.querySelectorAll(".navbar .nav--device ul .has-subnav .subnav");
    var hassubnav = document.querySelectorAll(".navbar .nav--device ul .has-subnav");

    for (var i = 0; i < subnav.length; i++) {
      subnav[i].classList.add("sm-d-block");
    }

    for (var i = 0; i < hassubnav.length; i++) {
      hassubnav[i].classList.add("navlink__not__active");
      if (!this) hassubnav[i].classList.remove("navlink__active");
    }
    if (this.classList.contains("navlink__active")) {
      this.classList.remove("navlink__active");
      this.classList.add("navlink__not__active");
    } else {
      this.classList.add("navlink__active");
      this.classList.remove("navlink__not__active");
    }

    if (this.querySelector(".subnav").classList.contains('sm-d-none')) {
      this.querySelector(".subnav").classList.remove("sm-d-none");
      this.querySelector(".subnav").classList.add("sm-d-block");
    } else {
      this.querySelector(".subnav").classList.remove("sm-d-block");
      this.querySelector(".subnav").classList.add("sm-d-none");
    }

    var queryall = this.querySelector("i");
    console.log("queryall ", queryall);
    queryall.classList.toggle('fa-angle-down');
    queryall.classList.toggle('fa-angle-up');
  };

  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', advclose, false);
  }

  for (var i = 0; i < classname2.length; i++) {
    classname2[i].addEventListener('click', mobilenavev, false);
  }

  for (var i = 0; i < navitemcls.length; i++) {
    navitemcls[i].addEventListener('click', advclose3, false);
  }

  function navMenu1() {
    document.querySelector('.navbar .navbar-brand img').style.maxWidth = "200px";
    document.querySelector("nav.navbar").classList.add('is-fixed-top');
    document.querySelector(".navbar .nav--device").classList.add("nav-device-active");
  }

  function navMenu2() {
    document.querySelector('.navbar .navbar-brand img').style.maxWidth = "240px";
    document.querySelector("nav.navbar").classList.remove('is-fixed-top');
    document.querySelector(".navbar .nav--device").classList.remove("nav-device-active");
  }

  window.onscroll = function () {
    document.querySelector(".navbar").style.background = "#fff";
    var scrollPosY = window.pageYOffset | document.body.scrollTop;
    if (scrollPosY > 100 || usercookie == "cookiefreeoffer") {
      classname[0].setAttribute("id", 'navbar__offer__close');
      var el = document.getElementById('navbar__offer__close');
      el.classList.add("navbar__offer__close");
      navMenu1();
    } else if (scrollPosY <= 100 && usercookie != "cookiefreeoffer") {
      classname[0].setAttribute("id", 'navbar__offer__close');
      var el = document.getElementById('navbar__offer__close');
      el.classList.remove("navbar__offer__close");
      navMenu2();
    }
  };

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //rooms filter

  var roomsFilterItems = document.querySelectorAll(".rooms-filter li a");
  for (var _i14 = 0; _i14 < roomsFilterItems.length; _i14++) {
    roomsFilterItems[_i14].addEventListener("click", function (e) {
      var currentElement = e.currentTarget;
      for (var j = 0; j < roomsFilterItems.length; j++) {
        roomsFilterItems[j].classList.remove("active");
      }
      currentElement.classList.add("active");
      filterRooms(currentElement.getAttribute("data-filter"));
    });
  }
});
