function readyDoc(fn) {
  var d = document;
  (d.readyState == 'loading') ? d.addEventListener('DOMContentLoaded', fn): fn();
}

readyDoc(function() {

  setTimeout(function() {
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
    if (w < 768 ) {
      if (document.getElementsByClassName('offer-list-carousel').length > 0) {
        var offerSlider = tns({
          container: '.offer-list-carousel',
          items: 1,
          nav: false,
          mouseDrag: true,
          loop: false,
          prevButton: "#offersListCarouselNav .iconbtn--left", // previous button
          nextButton: "#offersListCarouselNav .iconbtn--right", // next button
          responsive: {
            767: {
              items: 2,
              "autoHeight": false,
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
            "autoHeight": false,
          },
          1199: {
            items: 3
          }
        }
      });
    }
  }, 2000);

  setTimeout(function(){
    var guestsSlider = document.querySelector(".guests-slider .slider");
    var guestsSliderOutput = document.querySelector(".guests-slider .output");
    guestsSliderOutput.innerHTML = guestsSlider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    guestsSlider.oninput = function() {
      guestsSliderOutput.innerHTML = this.value;
      guestsSliderOutput.style.left = 59+(12*this.value)+"px";
    }
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
    setTimeout(function() {
      let catItems = document.querySelectorAll(".filter-items li a");
      for (let i = 0; i < catItems.length; i++) {
        catItems[i].addEventListener('click', function(e) {
          for (let j = 0; j < catItems.length; j++) {
            catItems[j].classList.remove("active");
          }
          e.currentTarget.classList.add("active");
          let filterItem = e.currentTarget.getAttribute("data-filter");
          let tabItems = document.getElementsByClassName("asset-item");
          let currentTabItems = document.getElementsByClassName(filterItem);
          if (filterItem == "all") {
            for (let i = 0; i < tabItems.length; i++) {
              tabItems[i].style.display = "flex";
            }
          } else {
            for (let i = 0; i < tabItems.length; i++) {
              tabItems[i].style.display = "none";
            }
            for (let i = 0; i < currentTabItems.length; i++) {
              currentTabItems[i].style.display = "flex";
            }
          }
        });
      }
    }, 2000);
  }

  var classname = document.getElementsByClassName("navbar__offer");
  var classname2 = document.getElementsByClassName("navbar-brand");
  var usercookie = getCookie("username");
  var navitemcls = document.querySelectorAll(".navbar .nav--device ul .has-subnav");

  if(usercookie == "usercookie"){
    classname[0].setAttribute("id", 'navbar__offer__close');
    var el = document.getElementById('navbar__offer__close');
    el.classList.add("navbar__offer__close");
    document.querySelector('.navbar .navbar-brand img').style.maxWidth = "200px";
    document.querySelector(".navbar.is-fixed-top").style.height = "auto";
    document.querySelector(".navbar.is-fixed-top+.main").style.paddingTop = "97px";
    document.querySelector(".navbar .nav-device-lg").classList.add("nav-device-active");
    document.querySelector(".nav--device").style.top = "98px !important";
  }

  var advclose = function() {
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
  }

  var advclose2 = function() {
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
  }

  var advclose3 = function() {
    var queryall =  document.querySelectorAll(".navbar .nav--device ul .nav__item i");
    for (var i = 0; i < queryall.length; i++) {
    queryall[i].classList.add('fa-angle-down');
    queryall[i].classList.remove('fa-angle-up');
    }

    var queryall =  this.querySelector("i");
    console.log("queryall ",queryall);
    queryall.classList.toggle('fa-angle-down');
    queryall.classList.toggle('fa-angle-up');
  }

  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', advclose, false);
  }

    // for (var i = 0; i < classname2.length; i++) {
    //   classname2[i].addEventListener('click', advclose2, false);
    // }

  for (var i = 0; i < navitemcls.length; i++) {
      navitemcls[i].addEventListener('click', advclose3, false);
  }



  window.onscroll = function() {
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
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
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
});
