'use strict';

function readyDoc(fn) {
  var d = document;
  d.readyState == 'loading' ? d.addEventListener('DOMContentLoaded', fn) : fn();
}

readyDoc(function () {

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
              items: 2,
              "autoHeight": false
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
    }
  }, 2000);

  setTimeout(function () {
    var guestsSlider = document.querySelector("#guestsSlider .slider");
    var guestsSliderOutput = document.querySelector("#guestsSlider .output");
    guestsSliderOutput.innerHTML = guestsSlider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    guestsSlider.oninput = function () {
      guestsSliderOutput.innerHTML = this.value;
      guestsSliderOutput.style.left = 59 + 12 * this.value + "px";
    };
  }, 1000);
  setTimeout(function () {
    var guestsSlider = document.querySelector("#guestsSliderMobile .slider");
    var guestsSliderOutput = document.querySelector("#guestsSliderMobile .output");
    guestsSliderOutput.innerHTML = guestsSlider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    guestsSlider.oninput = function () {
      guestsSliderOutput.innerHTML = this.value;
      guestsSliderOutput.style.left = 59 + 12 * this.value + "px";
    };
  }, 1000);

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

  // Tabs Script Start ======================================

  if (document.getElementsByClassName("filter-items")[0]) {
    setTimeout(function () {
      var catItems = document.querySelectorAll(".filter-items li a");
      for (var _i = 0; _i < catItems.length; _i++) {
        catItems[_i].addEventListener('click', function (e) {
          for (var j = 0; j < catItems.length; j++) {
            catItems[j].classList.remove("active");
          }
          e.currentTarget.classList.add("active");
          var filterItem = e.currentTarget.getAttribute("data-filter");
          var tabItems = document.getElementsByClassName("asset-item");
          var currentTabItems = document.getElementsByClassName(filterItem);
          if (filterItem == "all") {
            for (var _i2 = 0; _i2 < tabItems.length; _i2++) {
              tabItems[_i2].style.display = "flex";
            }
          } else {
            for (var _i3 = 0; _i3 < tabItems.length; _i3++) {
              tabItems[_i3].style.display = "none";
            }
            for (var _i4 = 0; _i4 < currentTabItems.length; _i4++) {
              currentTabItems[_i4].style.display = "flex";
            }
          }
        });
      }
    }, 2000);
  }

  //Fliters Modal Box Script
  //This script supports IE9+
  (function () {
    //Opening modal window function
    function openModal() {
      //Get trigger element
      var modalTrigger = document.getElementsByClassName('jsModalTrigger');

      //Set onclick event handler for all trigger elements
      for (var i = 0; i < modalTrigger.length; i++) {
        modalTrigger[i].onclick = function () {
          var target = this.getAttribute('href').substr(1);
          var modalWindow = document.getElementById(target);

          modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';
        };
      }
    }

    function closeModal() {
      //Get close button
      var closeButton = document.getElementsByClassName('jsModalClose');
      // var closeOverlay = document.getElementsByClassName('jsOverlay');

      //Set onclick event handler for close buttons
      for (var i = 0; i < closeButton.length; i++) {
        closeButton[i].onclick = function () {
          var modalWindow = this.parentNode.parentNode;

          modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        };
      }

      //Set onclick event handler for modal overlay
      // for(var i = 0; i < closeOverlay.length; i++) {
      //   closeOverlay[i].onclick = function() {
      //     var modalWindow = this.parentNode;
      //
      //     modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      //   }
      // }
    }

    //Handling domready event IE9+
    function ready(fn) {
      if (document.readyState != 'loading') {
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    }

    //Triggering modal window function after dom ready
    ready(openModal);
    ready(closeModal);
  })();

  //NavBar effects scripts

  var classname = document.getElementsByClassName("navbar__offer");
  var classname2 = document.getElementsByClassName("navbar-brand");
  var usercookie = getCookie("username");
  var navitemcls = document.querySelectorAll(".navbar .nav--device ul .has-subnav");

  if (usercookie == "usercookie") {
    classname[0].setAttribute("id", 'navbar__offer__close');
    var el = document.getElementById('navbar__offer__close');
    el.classList.add("navbar__offer__close");
    document.querySelector('.navbar .navbar-brand img').style.maxWidth = "200px";
    document.querySelector(".navbar.is-fixed-top").style.height = "auto";
    document.querySelector(".navbar.is-fixed-top+.main").style.paddingTop = "97px";
    document.querySelector(".navbar .nav-device-lg").classList.add("nav-device-active");
    document.querySelector(".nav--device").style.top = "98px !important";
  }

  var advclose = function advclose() {
    setCookie("username", "usercookie", 1);
    classname[0].setAttribute("id", 'navbar__offer__close');
    var el = document.getElementById('navbar__offer__close');
    el.parentNode.removeChild(el);
    el.classList.add("navbar__offer__close");
    document.querySelector('.navbar .navbar-brand img').style.maxWidth = "200px";
    document.querySelector(".navbar.is-fixed-top").style.height = "auto";
    document.querySelector(".navbar.is-fixed-top+.main").style.paddingTop = "97px";
    document.querySelector(".navbar .nav-device-lg").classList.add("nav-device-active");
    document.querySelector(".nav--device").style.top = "98px !important";
  };

  var advclose2 = function advclose2() {
    document.querySelector(".nav--device").style.display = "block";
    // var queryall =  document.querySelector(".navbar .nav--device ul .nav__item i");
    // queryall.classList.toggle('fa-angle-down');
    // queryall.classList.toggle('fa-angle-up');
    // var queryall =  document.querySelectorAll(".navbar .nav--device ul .has-subnav .nav__link");
    //
    // for (var i = 0; i < queryall.length; i++) {
    //   queryall[i].insertAdjacentHTML('afterend', '');
    // }
    // alert("hii");
    // <i class="fa fa-angle-down" aria-hidden="true" style="font-size: 1.4em;position: absolute;top: -3px;left: 65px;"></i>
  };

  var advclose3 = function advclose3() {
    var queryall = document.querySelectorAll(".navbar .nav--device ul .nav__item i");
    for (var i = 0; i < queryall.length; i++) {
      queryall[i].classList.add('fa-angle-down');
      queryall[i].classList.remove('fa-angle-up');
    }

    var queryall = this.querySelector("i");
    console.log("queryall ", queryall);
    queryall.classList.toggle('fa-angle-down');
    queryall.classList.toggle('fa-angle-up');
  };

  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', advclose, false);
  }

  // for (var i = 0; i < classname2.length; i++) {
  //   classname2[i].addEventListener('click', advclose2, false);
  // }

  for (var i = 0; i < navitemcls.length; i++) {
    navitemcls[i].addEventListener('click', advclose3, false);
  }

  window.onscroll = function () {
    document.querySelector(".navbar").style.background = "#fff";
    var scrollPosY = window.pageYOffset | document.body.scrollTop;
    if (scrollPosY > 100 || usercookie == "usercookie") {
      classname[0].setAttribute("id", 'navbar__offer__close');
      var el = document.getElementById('navbar__offer__close');
      el.classList.add("navbar__offer__close");
      document.querySelector('.navbar .navbar-brand img').style.maxWidth = "200px";
      document.querySelector(".navbar.is-fixed-top").style.height = "auto";
      document.querySelector(".navbar.is-fixed-top+.main").style.paddingTop = "97px";
      document.querySelector(".navbar .nav--device").classList.add("nav-device-active");
      document.querySelector(".nav--device").style.top = "98px !important";
    } else if (scrollPosY <= 100 && usercookie != "usercookie") {
      classname[0].setAttribute("id", 'navbar__offer__close');
      var el = document.getElementById('navbar__offer__close');
      el.classList.remove("navbar__offer__close");
      document.querySelector('.navbar .navbar-brand img').style.maxWidth = "240px";
      document.querySelector(".navbar.is-fixed-top").style.height = "151px";
      document.querySelector(".navbar.is-fixed-top+.main").style.paddingTop = "151px";
      document.querySelector(".navbar .nav--device").classList.remove("nav-device-active");
      document.querySelector(".nav--device").style.top = "151px !important";
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
  for (var _i5 = 0; _i5 < roomsFilterItems.length; _i5++) {
    roomsFilterItems[_i5].addEventListener("click", function (e) {
      var currentElement = e.currentTarget;
      for (var j = 0; j < roomsFilterItems.length; j++) {
        roomsFilterItems[j].classList.remove("active");
      }
      currentElement.classList.add("active");
    });
  }
});
