function readyDoc(fn) {
 var d = document;
 (d.readyState == 'loading') ? d.addEventListener('DOMContentLoaded', fn): fn();
}

readyDoc(function() {

  setTimeout(function(){
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
            items: 2
          },
          1199: {
            items: 3
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

  if(document.getElementsByClassName("filter-items")[0]) {
    setTimeout(function() {
      let catItems = document.querySelectorAll(".filter-items li a");
      for(let i = 0; i < catItems.length; i++) {
        catItems[i].addEventListener('click', function(e) {
          for(let j = 0; j < catItems.length; j++) {
            catItems[j].classList.remove("active");
          }
          e.currentTarget.classList.add("active");
          let filterItem = e.currentTarget.getAttribute("data-filter");
          let tabItems = document.getElementsByClassName("asset-item");
          let currentTabItems = document.getElementsByClassName(filterItem);
          if(filterItem == "all") {
            for(let i = 0; i < tabItems.length; i++) {
              tabItems[i].style.display = "flex";
            }
          } else {
            for(let i = 0; i < tabItems.length; i++) {
              tabItems[i].style.display = "none";
            }
            for(let i = 0; i < currentTabItems.length; i++) {
              currentTabItems[i].style.display = "flex";
            }
          }
        });
      }
    }, 2000);
  }

  // Range Slider Starts ============================

  const rangeSliderController = (function(){
    const slider = document.getElementById("slider-js");
    const sliderHandle = document.getElementById("slider-handle");
    const sliderCounter = document.getElementById("slider-counter");
    const sliderValue = 5; // give any slider value, result will be n+1
    var sliderOffset = slider.offsetLeft;
    var sliderWidth = slider.offsetWidth;
    var isMoving = false;
    var handlePosition = null;
    var valueStops = (function(){
      var array = [];
      var fraction = sliderWidth / sliderValue;
      for (var i = 0; i <= sliderValue; i++) {
        array.push(fraction * i);
        };
      return(array)
      }());
    var skipPoint = valueStops[1]/2;

    window.addEventListener("resize", function() {
      isMoving = false;
      handlePosition = null;
      valueStops = (function(){
        var array = [];
        var fraction = sliderWidth / sliderValue;
        for (var i = 0; i <= sliderValue; i++) {
          array.push(fraction * i)
        };
        return(array);
      }());
      skipPoint = valueStops[1]/2;
      sliderOffset = slider.offsetLeft;
      sliderWidth = slider.offsetWidth;
    });

    slider.addEventListener("mousedown", function(event){
      event.preventDefault();
      isMoving = true;
      handlePosition = event.pageX - sliderOffset;
      valueStops.forEach(function(stop, i){
        if ( handlePosition >= (stop - skipPoint ) ) {
          sliderHandle.style.left = stop + "px";
          sliderCounter.style.left = stop + "px";
          sliderCounter.innerHTML = i + 1;
        }
      })

    });

    window.addEventListener("mousemove", function(event){
      if (isMoving) {
        handlePosition = event.pageX - sliderOffset;
        handlePPostion = Math.min(Math.max(parseInt(handlePosition), 0), sliderWidth);
        valueStops.forEach(function(stop, i){
          if ( handlePosition >= (stop - skipPoint ) ) {
            sliderHandle.style.left = stop + "px";
            sliderCounter.style.left = stop + "px";
            sliderCounter.innerHTML = i + 1;
          }
        })
      }
    })

    window.addEventListener("mouseup", function(event){
      isMoving = false;
    })
  })()

});
