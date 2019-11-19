function readyDoc(fn) {
  var d = document;
  (d.readyState == 'loading') ? d.addEventListener('DOMContentLoaded', fn): fn();
}

var resetInnerFilters = function() {
  var bedTypeFilters = document.querySelectorAll(".bed-type-filter");
  var roomViewFilter = document.querySelectorAll(".room-view-filter");
  var roomGuestsFilter = document.querySelectorAll(".room-guests-filter");
  for (let i = 0; i < bedTypeFilters.length; i++) {
    bedTypeFilters[i].value = "all";
  }
  for (let i = 0; i < roomViewFilter.length; i++) {
    roomViewFilter[i].value = "all";
  }
  for (let i = 0; i < roomGuestsFilter.length; i++) {
    roomGuestsFilter[i].value = "1";
    updateGuestsSlider(document.querySelector("#guestsSlider .output"), 1);
    updateGuestsSlider(document.querySelector("#guestsSliderMobile .output"), 1);
  }
}

var updateGuestsSlider = function(guestsSliderOutput, val) {
  guestsSliderOutput.innerHTML = val;
  guestsSliderOutput.style.left = 62 + (7 * val) + "px";
  let allRooms = document.querySelectorAll(".room-list-item");
  for (let i = 0; i < allRooms.length; i++) {
    let guestsNum = Number(allRooms[i].getAttribute("data-guests"));
    if (guestsNum < val) {
      allRooms[i].classList.add("hidden-by-guests");
    } else {
      allRooms[i].classList.remove("hidden-by-guests");
    }
  }
  displayNoRoomsMessage();
}

var filterRooms = function(roomType) {
  let allRooms = document.querySelectorAll(".room-list-item");
  if (roomType == "all") {
    //  document.querySelector(".filtered-rooms-text").innerHTML = "<span>" + allRooms.length + "</span> Rooms & Suites";
    for (let i = 0; i < allRooms.length; i++) {
      allRooms[i].classList.remove("hidden");
      allRooms[i].classList.remove("hidden-by-guests");
      allRooms[i].classList.remove("hidden-by-bedtype");
      allRooms[i].classList.remove("hidden-by-viewtype");
      allRooms[i].classList.remove("hidden-by-accessibility");
    }
  } else {
    let roomsToShow = document.querySelectorAll("." + roomType);
    let roomsCount = roomsToShow.length;
    //  document.querySelector(".filtered-rooms-text").innerHTML = "<span>" + roomsCount + "</span> " + roomType;
    for (let i = 0; i < allRooms.length; i++) {
      allRooms[i].classList.add("hidden");
      allRooms[i].classList.remove("hidden-by-guests");
      allRooms[i].classList.remove("hidden-by-bedtype");
      allRooms[i].classList.remove("hidden-by-viewtype");
      allRooms[i].classList.remove("hidden-by-accessibility");
    }
    for (let i = 0; i < roomsCount; i++) {
      roomsToShow[i].classList.remove("hidden");
    }
  }
  resetInnerFilters();
}

var filterAmenities = function(amenityType) {
  let allAmenityTabs = document.querySelectorAll(".amenities-content");
  let allAmenityTabsToShow = document.querySelectorAll("." + amenityType);
  for (let i = 0; i < allAmenityTabs.length; i++) {
    allAmenityTabs[i].classList.add("hidden");
  }
  for (let i = 0; i < allAmenityTabsToShow.length; i++) {
    allAmenityTabsToShow[i].classList.remove("hidden");
  }
}

var displayNoRoomsMessage = function() {
  setTimeout(function() {
    let allRooms = document.querySelectorAll(".room-list-item");
    let hiddenRoomsLength = 0;
    for (let i = 0; i < allRooms.length; i++) {
      if (allRooms[i].classList.contains("hidden") || allRooms[i].classList.contains("hidden-by-accessibility") || allRooms[i].classList.contains("hidden-by-bedtype") || allRooms[i].classList.contains("hidden-by-viewtype") || allRooms[i].classList.contains("hidden-by-guests")) {
        hiddenRoomsLength++;
      }
    }
    if (allRooms.length == hiddenRoomsLength) {
      document.querySelector(".no-rooms-message").style.display = "block";
    } else {
      document.querySelector(".no-rooms-message").style.display = "none";
    }
  }, 1000);
}

var filterThroughURL = function() {
  if ((window.location.href.indexOf("/stay/") > -1) && window.location.hash) {
    var hashValue = window.location.hash.substring(1);
    if (hashValue == 'accessible-rooms') {
      document.querySelector(".rooms-filter [data-filter='accessible']").click();
    } else if (hashValue == 'guestrooms') {
      document.querySelector(".rooms-filter [data-filter='guestroom']").click();
    } else if (hashValue == '1-bedrooms') {
      document.querySelector(".rooms-filter [data-filter='one-bedroom']").click();
    }
  }
}

readyDoc(function() {

  window.onhashchange = function() {
    filterThroughURL();
    document.querySelector('[data-target="navMenu"]').click();
  }

  //if url contains hash
  setTimeout(function() {
    filterThroughURL();
  }, 500);

  // cendyn newsletter post data
  document.getElementById('newsletterForm').onsubmit = function(e) {
    e.preventDefault();
    var formId = document.getElementById('formID').value;
    var url = 'https://web2.cendynhub.com/FormsRest/submit/' + formId + '?format=json';
    var data = JSON.stringify({
      "PostData": {
        "emailAddress": document.getElementById('emailAddress').value,
        "firstName": document.getElementById('firstName').value
      }
    });
    makeRESTCall(url, data, function() {
      window.location = '/thankyou';
    })
    return false;
  }

  function makeRESTCall(url, data, callback) {
    var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        console.log(request.responseText);
        if (callback) {
          callback(request.responseText);
        }
      }
    }
    request.open('post', url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data);
  }
  // cendyn newsletter post data ends here

  //Rooms main Filter
  if (document.querySelectorAll(".rooms-filter li a").length > 1) {
    var roomsFilterItems = document.querySelectorAll(".rooms-filter li a");
    for (let i = 0; i < roomsFilterItems.length; i++) {
      roomsFilterItems[i].addEventListener("click", function(e) {
        let currentElement = e.currentTarget;
        for (let j = 0; j < roomsFilterItems.length; j++) {
          roomsFilterItems[j].classList.remove("active");
        }
        currentElement.classList.add("active");
        filterRooms(currentElement.getAttribute("data-filter"));
      });
    }
  }

  //Amenities main Filter
  if (document.querySelectorAll(".amenities-filter li a").length > 1) {
    var amenitiesFilterItems = document.querySelectorAll(".amenities-filter li a");
    for (let i = 0; i < amenitiesFilterItems.length; i++) {
      amenitiesFilterItems[i].addEventListener("click", function(e) {
        let currentElement = e.currentTarget;
        for (let j = 0; j < amenitiesFilterItems.length; j++) {
          amenitiesFilterItems[j].classList.remove("active");
        }
        currentElement.classList.add("active");
        filterAmenities(currentElement.getAttribute("data-filter"));
      });
    }
  }


  //Room Inner Filters

  if (document.querySelectorAll(".bed-type-filter").length > 0) {
    var bedTypeFilters = document.querySelectorAll(".bed-type-filter");
    let allRooms = document.querySelectorAll(".room-list-item");
    let accessibleRooms = document.querySelectorAll(".room-list-item.accessible");
    for (let i = 0; i < bedTypeFilters.length; i++) {
      bedTypeFilters[i].onchange = function() {
        let bedTypeVal = this.value;
        if (bedTypeVal == "Accessible") {
          for (let i = 0; i < allRooms.length; i++) {
            allRooms[i].classList.remove("hidden-by-bedtype");
            allRooms[i].classList.add("hidden-by-accessibility");
          }
          for (let i = 0; i < accessibleRooms.length; i++) {
            accessibleRooms[i].classList.remove("hidden-by-accessibility");
          }
        } else {
          for (let i = 0; i < allRooms.length; i++) {
            let bedType = allRooms[i].getAttribute("data-bed-type");
            allRooms[i].classList.remove("hidden-by-accessibility");
            if (bedType == bedTypeVal || bedTypeVal == "all") {
              allRooms[i].classList.remove("hidden-by-bedtype");
            } else {
              allRooms[i].classList.add("hidden-by-bedtype");
            }
          }
        }
        displayNoRoomsMessage();
      }
    }
  }
  if (document.querySelectorAll(".room-view-filter").length > 0) {
    var viewTypeFilters = document.querySelectorAll(".room-view-filter");
    let allRooms = document.querySelectorAll(".room-list-item");
    for (let i = 0; i < bedTypeFilters.length; i++) {
      viewTypeFilters[i].onchange = function() {
        let viewTypeVal = this.value;
        for (let i = 0; i < allRooms.length; i++) {
          let viewType = allRooms[i].getAttribute("data-view-type");
          if (viewType == viewTypeVal || viewTypeVal == "all") {
            allRooms[i].classList.remove("hidden-by-viewtype");
          } else {
            allRooms[i].classList.add("hidden-by-viewtype");
          }
        }
        displayNoRoomsMessage();
      }
    }
  }
  if (document.querySelectorAll("#guestsSlider").length > 0) {
    setTimeout(function() {
      var guestsSlider = document.querySelector("#guestsSlider .guests-slider-input");
      var guestsSliderOutput = document.querySelector("#guestsSlider .output");
      guestsSliderOutput.innerHTML = guestsSlider.value; // Display the default slider value

      // Update the current slider value (each time you drag the slider handle)
      guestsSlider.oninput = function() {
        updateGuestsSlider(guestsSliderOutput, this.value);
      }
    }, 500);
  }
  if (document.querySelectorAll("#guestsSliderMobile").length > 0) {
    setTimeout(function() {
      var guestsSlider = document.querySelector("#guestsSliderMobile .guests-slider-input");
      var guestsSliderOutput = document.querySelector("#guestsSliderMobile .output");
      guestsSliderOutput.innerHTML = guestsSlider.value; // Display the default slider value

      // Update the current slider value (each time you drag the slider handle)
      guestsSlider.oninput = function() {
        updateGuestsSlider(guestsSliderOutput, this.value);
      }
    }, 500);
  }
  if (document.querySelectorAll(".jsModalTrigger").length > 0) {
    document.querySelector(".jsModalTrigger").onclick = function() {
      document.getElementById("jsModal").style.display = "block";
    }
    document.querySelector(".jsModalClose").onclick = function() {
      document.getElementById("jsModal").style.display = "none";
    }
  }

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
            },
            1199: {
              items: 3
            }
          }
        });
      }
    }

    if (document.getElementsByClassName('happenings-list-carousel').length > 0) {
      var offerSlider = tns({
        container: '.happenings-list-carousel',
        items: 1.1,
        nav: false,
        mouseDrag: true,
        loop: false,
        prevButton: "#happeningsListCarouselNav .iconbtn--left", // previous button
        nextButton: "#happeningsListCarouselNav .iconbtn--right", // next button
        responsive: {
          767: {
            items: 2,
          },
          1199: {
            items: 4
          }
        }
      });
    }

    if (document.getElementsByClassName('asset-list-carousel').length > 0) {
      var assetSlider = tns({
        container: '.asset-list-carousel',
        items: 1,
        slideBy: "page",
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
      if(document.querySelector("#sliderRange")) {
        document.querySelector("#sliderRange").addEventListener('change', () => {
          sliderrangefunc(assetSlider);
        });
        rangethumb(assetSlider);
      }
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

    if(document.querySelector("#sliderRange")) {
      var num_items = assetSlider.getInfo().items;
      document.querySelector("#sliderRange").addEventListener('change', () => {
          sliderrangefunc(assetSlider);
      });
          rangethumb(assetSlider);
    }

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

  if (document.getElementsByClassName('hotel-amenities').length > 0) {
    var slider = tns({
      container: '.hotel-amenities',
      items: 2,
      nav: false,
      mouseDrag: true,
      loop: true,
      prevButton: "#amenitiesNav .iconbtn--left", // previous button
      nextButton: "#amenitiesNav .iconbtn--right", // next button
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

  if (document.getElementsByClassName('room-amenities').length > 0) {
    var slider = tns({
      container: '.room-amenities',
      items: 2.2,
      controls: false,
      nav: false,
      mouseDrag: true,
      loop: true,
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
    var roomsSlider = tns({
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
    if(document.querySelector("#sliderRange")) {
      var num_items = roomsSlider.getInfo().items;
      document.querySelector("#sliderRange").addEventListener('change', () => {
          sliderrangefunc(roomsSlider);
      });
          rangethumb(roomsSlider);
    }
  }

  if (document.getElementsByClassName('rooms-cross-carousel__handle-suites').length > 0) {
    var suitesSlider = tns({
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
    if(document.querySelector("#sliderRange")) {
      document.querySelector("#sliderRange").addEventListener('change', () => {
        sliderrangefunc(suitesSlider);
      });
        rangethumb(suitesSlider);
    }
  }

  // Blog related posts carousel

  if (document.getElementsByClassName('related-blogs-carousel').length > 0) {
    var assetSlider = tns({
      container: '.related-blogs-carousel',
      items: 1,
      nav: false,
      mouseDrag: true,
      loop: false,
      edgePadding: 0,
      prevButton: "#relatedBlogCarouselNav .iconbtn--left", // previous button
      nextButton: "#relatedBlogCarouselNav .iconbtn--right", // next button
      responsive: {
        992: {
          items: 2
        }
      }
    });

    if(document.querySelector("#sliderRange")) {
      var num_items = assetSlider.getInfo().items;
      document.querySelector("#sliderRange").addEventListener('change', () => {
          sliderrangefunc(assetSlider);
      });
          rangethumb(assetSlider);
    }

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

  //NavBar effects scripts

  var classname = document.getElementsByClassName("navbar__offer");
  var classname2 = document.getElementsByClassName("mobile-menu");
  var usercookie = getCookie("username");
  var navitemcls = document.querySelectorAll(".navbar .nav--device ul .has-subnav");

  if (usercookie == "cookiefreeoffer") {
    classname[0].setAttribute("id", 'navbar__offer__close');
    var el = document.getElementById('navbar__offer__close');
    el.classList.add("navbar__offer__close");
    navMenu1();
  }

  var advclose = function() {
    setCookie("username", "cookiefreeoffer", 1);
    classname[0].setAttribute("id", 'navbar__offer__close');
    var el = document.getElementById('navbar__offer__close');
    el.parentNode.removeChild(el);
    el.classList.add("navbar__offer__close");
    navMenu1();
  }

  var mobilenavev = function() {
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
  }

  var advclose3 = function() {
    var queryall = document.querySelectorAll(".navbar .nav--device ul .nav__item i");
    var subnav = document.querySelectorAll(".navbar .nav--device ul .has-subnav .subnav");
    var hassubnav = document.querySelectorAll(".navbar .nav--device ul .has-subnav");

    for (var i = 0; i < subnav.length; i++) {
      subnav[i].classList.add("sm-d-block");
    }

    for (var i = 0; i < hassubnav.length; i++) {
      hassubnav[i].classList.add("navlink__not__active");
      if (!this)
        hassubnav[i].classList.remove("navlink__active");
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
    //console.log("queryall ", queryall);
    if (queryall) {
      queryall.classList.toggle('fa-angle-down');
      queryall.classList.toggle('fa-angle-up');
    }
  }

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

  window.onscroll = function() {
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


  function rangethumb(assetSlider){
    var num_items = assetSlider.getInfo().items;
    var style = document.querySelector('[data="offerslistyle"]');
    var sliderangele = document.getElementById("sliderRange");
    var slidelen = sliderangele.getAttribute('data-max');
    var slidemax = Math.ceil(slidelen / num_items);
    sliderangele.setAttribute('max', slidemax);
    var x = (100 / slidemax) + '%';
    var y = '10';
    style.innerHTML = ".slider::-moz-range-thumb {width: " + x + " !important; height: " + y + "px !important;} .slider::-webkit-slider-thumb {width: " + x + " !important; height: " + y + "px !important;}";
  }

  function sliderrangefunc(assetSlider) {
      var num_items = assetSlider.getInfo().items;
      var ele = document.getElementById("sliderRange");
      var val = (ele.value - ele.getAttribute('min')) / (ele.getAttribute('max') - ele.getAttribute('min'));
      ele.style.backgroundImage = '-webkit-gradient(linear, left top, right top, ' + 'color-stop(' + val + ', #434343), ' +
        'color-stop(' + val + ', #6f6f6f)' +
        ')';
      var sliderindex = document.getElementById('sliderRange').value;
      var sliderindex2 = ((sliderindex - 1) * num_items);
      assetSlider.goTo(sliderindex2);
  }

  //rooms filter
  var roomsFilterItems = document.querySelectorAll(".rooms-filter li a");
  for (let i = 0; i < roomsFilterItems.length; i++) {
    roomsFilterItems[i].addEventListener("click", function(e) {
      let currentElement = e.currentTarget;
      for (let j = 0; j < roomsFilterItems.length; j++) {
        roomsFilterItems[j].classList.remove("active");
      }
      currentElement.classList.add("active");
      filterRooms(currentElement.getAttribute("data-filter"));
    });
  }

  //activities and adventures filter
  if (document.querySelectorAll(".activities-filter").length > 0) {
    var activitiesFilter = document.querySelector(".activities-filter");
    let allActivities = document.querySelectorAll(".activities-listing__item");
    activitiesFilter.onchange = function() {
      let currentFilter = activitiesFilter.value;
      let activitiesToShow =  document.querySelectorAll(".activities-listing__item[data-cat-filter='"+currentFilter+"']");
      if(currentFilter == "all") {
        for (let i = 0; i < allActivities.length; i++) {
          allActivities[i].classList.remove("hidden");
        }
      } else {
        for (let i = 0; i < allActivities.length; i++) {
          allActivities[i].classList.add("hidden");
        }
        for (let i = 0; i < activitiesToShow.length; i++) {
          activitiesToShow[i].classList.remove("hidden");
        }
      }
    }
  }

  if (document.getElementById('activitiesSlider')) {
    var slider = tns({
      container: '#activitiesSlider .activities-slider',
      items: 1,
      nav: false,
      mouseDrag: true,
      loop: true,
      prevButton: "#activitiesSlider .iconbtn--left", // previous button
      nextButton: "#activitiesSlider .iconbtn--right" // next button
    });
  }
  if (document.getElementById('adventuresSlider')) {
    var slider = tns({
      container: '#adventuresSlider .adventures-slider',
      items: 1,
      nav: false,
      mouseDrag: true,
      loop: true,
      prevButton: "#adventuresSlider .iconbtn--left", // previous button
      nextButton: "#adventuresSlider .iconbtn--right" // next button
    });
  }

});

function lightbox_open(video) {
  console.log(video.getAttribute('data-video'));
  document.querySelector('.VisaChipCardVideo source').setAttribute('src', video.getAttribute('data-video'));
  setTimeout(function(){
    document.querySelector('.lightbox2').style.display = 'flex';
    document.querySelector('.lightbox2').style.opacity = '1';
    document.querySelector('.VisaChipCardVideo').play();
  }, 100);
}

function lightbox_close() {
  document.querySelector('.lightbox2').style.display = 'none';
  document.querySelector('.lightbox2').style.opacity = '0';
  document.querySelector('.VisaChipCardVideo').pause();
}
