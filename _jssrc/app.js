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
  }, 2000);

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
  var usercookie = getCookie("username");
  // document.getElementById("mobile-menu").addEventListener('click', 'mobilemenu', false);

  if(usercookie == "usercookie"){
    classname[0].setAttribute("id", 'navbar__offer__close');
    var el = document.getElementById('navbar__offer__close');
    el.classList.add("navbar__offer__close");
    document.querySelector('.navbar .navbar-brand img').style.maxWidth = "200px";
    document.querySelector(".navbar.is-fixed-top").style.height = "auto";
    document.querySelector(".navbar.is-fixed-top+.main").style.paddingTop = "97px";
    document.querySelector(".navbar .nav--device").classList.add("nav-device-active");
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
    document.querySelector(".navbar .nav--device").classList.add("nav-device-active");
    document.querySelector(".nav--device").style.top = "98px !important";
  }
  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', advclose, false);
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
  function mobilemenu(){
    alert()
  }

  // Tabs Script End ======================================

});
