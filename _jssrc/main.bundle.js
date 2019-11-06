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

  if (document.getElementsByClassName('asset-list-carousel').length > 0) {
    var slider = tns({
      container: '.asset-list-carousel',
      items: 2,
      nav: false,
      mouseDrag: true,
      loop: false,
      prevButton: "#roomsNav .iconbtn--left", // previous button
      nextButton: "#roomsNav .iconbtn--right",
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
      for (var i = 0; i < catItems.length; i++) {
        catItems[i].addEventListener('click', function (e) {
          for (var j = 0; j < catItems.length; j++) {
            catItems[j].classList.remove("active");
          }
          e.currentTarget.classList.add("active");
          var filterItem = e.currentTarget.getAttribute("data-filter");
          var tabItems = document.getElementsByClassName("asset-item");
          var currentTabItems = document.getElementsByClassName(filterItem);
          if (filterItem == "all") {
            for (var _i = 0; _i < tabItems.length; _i++) {
              tabItems[_i].style.display = "flex";
            }
          } else {
            for (var _i2 = 0; _i2 < tabItems.length; _i2++) {
              tabItems[_i2].style.display = "none";
            }
            for (var _i3 = 0; _i3 < currentTabItems.length; _i3++) {
              currentTabItems[_i3].style.display = "flex";
            }
          }
        });
      }
    }, 2000);
  }

  // Tabs Script End ======================================
});
