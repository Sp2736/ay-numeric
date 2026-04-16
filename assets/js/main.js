/*=== Javascript function indexing hear===========

1.counterUp ----------(Its use for counting number)
2.stickyHeader -------(header class sticky)
3.wowActive ----------( Waw js plugins activation)
4.swiperJs -----------(All swiper in this website hear)
5.salActive ----------(Sal animation for card and all text)
6.textChanger --------(Text flip for banner section)
7.timeLine -----------(History Time line)
8.datePicker ---------(On click date calender)
9.timePicker ---------(On click time picker)
10.timeLineStory -----(History page time line)
11.vedioActivation----(Vedio activation)
12.searchOption ------(search open)
13.cartBarshow -------(Cart sode bar)
14.sideMenu ----------(Open side menu for desktop)
15.Back to top -------(back to top)
16.filterPrice -------(Price filtering)

==================================================*/


(function ($) {
  'use strict';
  let device_width = window.innerWidth;
  var rtsJs = {
    m: function (e) {
      rtsJs.d();
      rtsJs.methods();
    },
    d: function (e) {
      this._window = $(window),
        this._document = $(document),
        this._body = $('body'),
        this._html = $('html')
    },
    methods: function (e) {
      rtsJs.rtlToggle();
      rtsJs.preloader();
      rtsJs.smoothScroll();
      rtsJs.countDown();
      rtsJs.metismenu();
      rtsJs.galleryPopUp();
      rtsJs.cartNumberIncDec();
      rtsJs.sideMenu();
      rtsJs.searchOption();
      rtsJs.vedioActivation();
      rtsJs.portfoliobounceAnimation();
      rtsJs.commonAnimation();
      rtsJs.imageSlideGsap();
      rtsJs.swiperActivation();
      rtsJs.odoMeter();
      rtsJs.splitText();
      rtsJs.backToTopInit();
      rtsJs.stickyHeader();
      rtsJs.galleryPopUpmag();
      rtsJs.gsapAnimationImageScale();
      rtsJs.radialProgress();
      rtsJs.containerResize();
    },
    rtlToggle: function () {

      $(document).ready(function () {
        // Retrieve the saved direction from localStorage
        const savedDir = localStorage.getItem("pageDirection") || "ltr"; // Default to "ltr"
        $("body").attr("dir", savedDir);

        // Update button visibility based on saved direction
        if (savedDir === "rtl") {
          $(".rtl").removeClass("show");
          $(".ltr").addClass("show");
        } else {
          $(".rtl").addClass("show");
          $(".ltr").removeClass("show");
        }

        // Toggle direction and save state on button click
        $(".rtl-ltr-switcher-btn").on("click", function () {
          const currentDir = $("body").attr("dir");
          const newDir = currentDir === "rtl" ? "ltr" : "rtl";

          // Update body direction
          $("body").attr("dir", newDir);

          // Toggle button visibility
          $(".rtl").toggleClass("show");
          $(".ltr").toggleClass("show");

          // Save the new direction in localStorage
          localStorage.setItem("pageDirection", newDir);
        });
      });

    },
    preloader: function () {
      window.addEventListener('load', function () {
        document.querySelector('body').classList.add("loaded")
      });
    },
    smoothScroll: function (e) {
      $(document).on('click', '.onepage a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
        }, 300);
      });
    },
    countDown: function () {
      let countDown = document.getElementsByClassName('countdown');
      if (countDown.length) {
        document.addEventListener("DOMContentLoaded", function () {
          // Get the countdown element and the end date from its attribute
          const countdownElement = document.getElementById("countdown");
          const endDate = countdownElement.getAttribute("data-end-date");
          const endTime = new Date(endDate).getTime();

          if (isNaN(endTime)) {
            document.querySelector(".timer-section").innerHTML = "Invalid end date!";
            return;
          }

          // Get references to the time unit elements
          const daysElement = document.getElementById("days");
          const hoursElement = document.getElementById("hours");
          const minutesElement = document.getElementById("minutes");
          const secondsElement = document.getElementById("seconds");

          // Update the countdown every second
          const countdownInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeDifference = endTime - currentTime;

            // Calculate days, hours, minutes, and seconds
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // Update the timer elements
            if (timeDifference > 0) {
              daysElement.textContent = days;
              hoursElement.textContent = hours;
              minutesElement.textContent = minutes;
              secondsElement.textContent = seconds;
            } else {
              // Clear the interval and display "Time's up" when countdown ends
              clearInterval(countdownInterval);
              document.querySelector(".timer-section").innerHTML = "Time's up!";
            }
          }, 1000);
        });
      }
    },
    metismenu: function () {
      $('#mobile-menu-active').metisMenu();
    },
    galleryPopUp: function (e) {
      // Gallery image hover
      $(".img-wrapper").hover(
        function () {
          $(this).find(".img-overlay").animate({ opacity: 1 }, 600);
        }, function () {
          $(this).find(".img-overlay").animate({ opacity: 0 }, 600);
        }
      );

      // Lightbox
      var $overlay = $('<div id="overlay"></div>');
      var $image = $("<img>");
      var $prevButton = $('<div id="prevButton"><i class="fa fa-chevron-left"></i></div>');
      var $nextButton = $('<div id="nextButton"><i class="fa fa-chevron-right"></i></div>');
      var $exitButton = $('<div id="exitButton"><i class="fa fa-times"></i></div>');

      // Add overlay
      $overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
      $("#gallery").append($overlay);

      // Hide overlay on default
      $overlay.hide();

      // When an image is clicked
      $(".img-overlay").click(function (event) {
        // Prevents default behavior
        event.preventDefault();
        // Adds href attribute to variable
        var imageLocation = $(this).prev().attr("href");
        // Add the image src to $image
        $image.attr("src", imageLocation);
        // Fade in the overlay
        $overlay.fadeIn("slow");
      });

      // When the overlay is clicked
      $overlay.click(function () {
        // Fade out the overlay
        $(this).fadeOut("slow");
      });

      // When next button is clicked
      $nextButton.click(function (event) {
        // Hide the current image
        $("#overlay img").hide();
        // Overlay image location
        var $currentImgSrc = $("#overlay img").attr("src");
        // Image with matching location of the overlay image
        var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
        // Finds the next image
        var $nextImg = $($currentImg.closest(".image").next().find("img"));
        // All of the images in the gallery
        var $images = $("#image-gallery img");
        // If there is a next image
        if ($nextImg.length > 0) {
          // Fade in the next image
          $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
        } else {
          // Otherwise fade in the first image
          $("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(800);
        }
        // Prevents overlay from being hidden
        event.stopPropagation();
      });

      // When previous button is clicked
      $prevButton.click(function (event) {
        // Hide the current image
        $("#overlay img").hide();
        // Overlay image location
        var $currentImgSrc = $("#overlay img").attr("src");
        // Image with matching location of the overlay image
        var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
        // Finds the next image
        var $nextImg = $($currentImg.closest(".image").prev().find("img"));
        // Fade in the next image
        $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
        // Prevents overlay from being hidden
        event.stopPropagation();
      });

      // When the exit button is clicked
      $exitButton.click(function () {
        // Fade out the overlay
        $("#overlay").fadeOut("slow");
      });
    },
    cartNumberIncDec: function () {
      $(document).ready(function () {

        $(function () {
          $(".button").on("click", function () {
            var $button = $(this);
            var $parent = $button.parent();
            var oldValue = $parent.find('.input').val();

            if ($button.text() == "+") {
              var newVal = parseFloat(oldValue) + 1;
            } else {
              // Don't allow decrementing below zero
              if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
              } else {
                newVal = 1;
              }
            }
            $parent.find('a.add-to-cart').attr('data-quantity', newVal);
            $parent.find('.input').val(newVal);
          });
        });
      });
      /* magnificPopup img view */

    },
    sideMenu: function () {
      // collups menu side right
      $(document).on('click', '.menu-btn', function () {
        $("#side-bar").addClass("show");
        $("#anywhere-home").addClass("bgshow");
      });
      $(document).on('click', '.close-icon-menu', function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
      $(document).on('click', '#anywhere-home', function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
      // $(document).on('click', '.onepage .mainmenu li a', function () {
      //   $("#side-bar").removeClass("show");
      //   $("#anywhere-home").removeClass("bgshow");
      // });

      // FIX: This ensures any valid link clicked inside the mobile menu forces the sidebar to close gracefully.
      $(document).on('click', '.mainmenu li a:not([href="#"])', function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
    },
    searchOption: function () {
      $(document).on('click', '.search', function () {
        $(".search-input-area").addClass("show");
        $("#anywhere-home").addClass("bgshow");
      });
      $(document).on('click', '#close', function () {
        $(".search-input-area").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
      $(document).on('click', '#anywhere-home', function () {
        $(".search-input-area").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });

    },
    vedioActivation: function () {
      $(document).ready(function () {
        $('.popup-youtube, .popup-video').magnificPopup({
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
      });
    },
    portfoliobounceAnimation: function () {
      if (device_width > 991) {
        gsap.set(".rts_jump_animation-wrapper .rts-jump__item", { opacity: 0, scale: 1.15, rotation: 0 })
        gsap.to(".rts_jump_animation-wrapper .rts-jump__item", {
          scrollTrigger: {
            trigger: ".rts_jump_animation-wrapper .rts-jump__item",
            start: "top 95%"
          },
          opacity: 1.3,
          scale: 1,
          duration: 1,
          ease: "bounce",
          stagger: 0.3,
          rotation: 0
        })
      }
      if (device_width > 991) {
        gsap.set(".rts-jump__item-2", { opacity: 0, scale: 1.15, rotation: 0 })
        gsap.to(".rts-jump__item-2", {
          scrollTrigger: {
            trigger: ".rts-jump__item-2",
            start: "top center+=200"
          },
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "bounce",
          stagger: 0.9,
          rotation: 0
        })
      }
    },
    commonAnimation: function () {
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll("[data-animation]").forEach((element) => {
        let animationType = element.getAttribute("data-animation");
        let delay = parseFloat(element.getAttribute("data-delay")) || 0; // Default 0s
        let duration = parseFloat(element.getAttribute("data-duration")) || 1; // Default 1s

        if (animationType === "fadeInUp") {
          gsap.fromTo(element,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0,
              duration: duration,
              ease: "power3.out",
              delay: delay,
              scrollTrigger: {
                trigger: element,
                start: "top 95%",
                once: false
              }
            }
          );
        }
        else if (animationType === "fadeInRight") {
          gsap.fromTo(element,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: duration, ease: "power3.out", delay: delay, scrollTrigger: { trigger: element, start: "top 95%", once: false } }
          );
        }
        else if (animationType === "fadeInLeft") {
          gsap.fromTo(element,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: duration, ease: "power3.out", delay: delay, scrollTrigger: { trigger: element, start: "top 95%", once: false } }
          );
        }
        else if (animationType === "fadeInDown") {
          gsap.fromTo(element,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: duration, ease: "power3.out", delay: delay, scrollTrigger: { trigger: element, start: "top 95%", once: false } }
          );
        }
        else if (animationType === "zoomIn") {
          gsap.fromTo(element,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: duration, ease: "power3.out", delay: delay, scrollTrigger: { trigger: element, start: "top 95%", once: false } }
          );
        }
        else if (animationType === "zoomOut") {
          gsap.fromTo(element,
            { opacity: 0, scale: 1.5 },
            {
              opacity: 1, scale: 1, duration: duration, ease: "power3.out", delay: delay, scrollTrigger:
              {
                trigger: element,
                start: "top 95%",
                once: false
              }
            }
          );
        }
      });
    },
    imageSlideGsap: function () {
      $(document).ready(function () {
        gsap.to(".images", {
          scrollTrigger: {
            // trigger: ".images",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            // markers: true
          },
          x: -250,
        })
      });
      $(document).ready(function () {
        gsap.to(".images-r", {
          scrollTrigger: {
            // trigger: ".images",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            // markers: true
          },
          x: 250,
        })
      });
      $(document).ready(function () {
        gsap.to(".images-2", {
          scrollTrigger: {
            // trigger: ".images",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            // markers: true
          },
          y: -290,
        })
      });
    },
    swiperActivation: function () {
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-pd-slider", {
          speed: 1600,
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          autoplay: false,
          keyboard: {
            enabled: true,
            onlyInViewport: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-service-1", {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          centeredSlides: true,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            767: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-project-1", {
          slidesPerView: 2,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          pagination: {
            el: ".swiper-paginations",
            clickable: true,
          },
          breakpoints: {
            1500: {
              slidesPerView: 2,
            },
            1300: {
              slidesPerView: 2,
            },
            991: {
              slidesPerView: 1,
            },
            767: {
              slidesPerView: 1,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-related-shop", {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 1500,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-project-five", {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          pagination: {
            el: '.swiper-pagination-fraction',
            type: 'fraction',
            formatFractionCurrent: function (number) {
              return '0' + number;
            },
            formatFractionTotal: function (number) {
              return '0' + number;
            }
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiperh1_team", {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          centeredSlides: false,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 2000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 4,
            },
            1300: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 3,

            },
            767: {
              slidesPerView: 3,
            },
            575: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".swiper-container-h1", {
          direction: "horizontal",
          effect: "slide",
          autoplay: false,
          parallax: true,
          speed: 1600,
          rtl: true,
          loop: true,
          loopFillGroupWithBlank: !0,
          keyboard: {
            enabled: true,
            onlyInViewport: true
          },
          scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: "true"
          }
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-case-studies-5", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          centeredSlides: false,
          speed: 1000,
          pagination: {
            el: '.swiper-pagination-fraction',
            type: 'fraction',
            formatFractionCurrent: function (number) {
              return '0' + number;
            },
            formatFractionTotal: function (number) {
              return '0' + number;
            }
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 2000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-brand-2", {
          slidesPerView: 5,
          spaceBetween: 54,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          centeredSlides: false,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination",
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 2000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 5,
            },
            1300: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 3,

            },
            767: {
              slidesPerView: 3,
            },
            575: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 2,
            }
          },
        });
      });
      $(document).ready(function () {

        const totalSlides = 3;

        var swiper = new Swiper(".mySwiper-banner-two", {
          slidesPerView: 1,
          loop: true,
          effect: "fade",
          speed: 800,
          autoplay: {
            delay: 8000,
            disableOnInteraction: false
          },

          on: {
            init: function () {
              updateBars(this.realIndex)
            },

            slideChange: function () {
              updateBars(this.realIndex)
            }
          }

        });

        function updateBars(activeIndex) {

          const bars = document.querySelectorAll(".banner-bar");

          bars.forEach((bar, i) => {

            bar.classList.remove("active", "medium");

            if (i === activeIndex) {
              bar.classList.add("active");
            }
            else if (i === (activeIndex + 1) % totalSlides) {
              bar.classList.add("medium");
            }

          });

        }

        document.querySelectorAll(".banner-bar").forEach(bar => {
          bar.addEventListener("click", function () {

            let index = parseInt(this.dataset.index);
            swiper.slideToLoop(index);

          });
        });

      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-banner-four", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          // effect: "fade",
          loopFillGroupWithBlank: true,
          centeredSlides: false,
          speed: 1500,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          autoplay: {
            delay: 3000,
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-blog-one", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          centeredSlides: false,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 3,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiperh2_clients", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          pagination: {
            el: ".swiper-pagination",
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimonials-5", {
          slidesPerView: 2,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination-fractions',
            type: 'fraction',
            formatFractionCurrent: function (number) {
              return '0' + number;
            },
            formatFractionTotal: function (number) {
              return '0' + number;
            }
          },
          navigation: {
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 2,
            },
            1300: {
              slidesPerView: 2,
            },
            1199: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimoanils-6", {
          slidesPerView: 2,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 2,
            },
            1300: {
              slidesPerView: 2,
            },
            1199: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".seo-testimonials", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          speed: 700,
          loop: true,
          pagination: {
            el: '.swiper-pagination1',
            clickable: true,
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 2,
            },
            1199: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimoanils-7", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 1,
            },
            1300: {
              slidesPerView: 1,
            },
            1199: {
              slidesPerView: 1,

            },
            767: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-blog-10", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-brand-banner", {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 4,
            },
            1240: {
              slidesPerView: 4,
            },
            1199: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 3,
            },
            575: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 2,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimnials-hr", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-banner-seven", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + '0' + (index + 1) + "</span>";
            },
          },
          autoplay: {
            delay: 3000,
          },
          speed: 1000,
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimonisl-8", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          speed: 1000,
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-full-screen-wrapper", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          effect: "fade",
          loop: true,
          mousewheel: {
            enabled: true
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          // autoplay: {
          //   delay: 3000,
          // },
          speed: 1000,
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimonails-9", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          speed: 1000,
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimonials-dmeo-2", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination-fraction',
            type: 'fraction',
            formatFractionCurrent: function (number) {
              return '0' + number;
            },
            formatFractionTotal: function (number) {
              return '0' + number;
            }
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          // autoplay: {
          //   delay: 3000,
          // },
          speed: 1000,
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".imageSlider", {
          slidesPerView: 3.5,
          spaceBetween: 30,
          slidesPerGroup: 1,
          centeredSlides: true,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // autoplay: {
          //   delay: 3000,
          // },
          breakpoints: {
            1500: {
              slidesPerView: 3.5,
            },
            1240: {
              slidesPerView: 4,
            },
            1199: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 3,
            },
            575: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 2,
            }
          },
        });
      });
      $(document).ready(function () {
        // Author slider (thumbs)
        var authorSwiper = new Swiper(".author-active", {
          slidesPerView: 3,
          spaceBetween: 30,
          watchSlidesProgress: true,
          slideToClickedSlide: true,
          breakpoints: {
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            }
          }
        });
        // Main testimonial slider
        var testimonialSwiper = new Swiper(".mySwiper-testimonails-10", {
          loop: false,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          thumbs: {
            swiper: authorSwiper,
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimonials", {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            1200: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
    },
    odoMeter: function () {
      $(document).ready(function () {
        function isInViewport(element) {
          const rect = element.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
          );
        }

        function triggerOdometer(element) {
          const $element = $(element);
          if (!$element.hasClass('odometer-triggered')) {
            const countNumber = $element.attr('data-count');
            $element.html(countNumber);
            $element.addClass('odometer-triggered'); // Add a class to prevent re-triggering
          }
        }

        function handleOdometer() {
          $('.odometer').each(function () {
            if (isInViewport(this)) {
              triggerOdometer(this);
            }
          });
        }

        // Check on page load
        handleOdometer();

        // Check on scroll
        $(window).on('scroll', function () {
          handleOdometer();
        });
      });
    },
    splitText: function (e) {
      // Text moving effect removed as per user request to maintain a professional look.
    },
    backToTopInit: function () {
      $(document).ready(function () {
        "use strict";

        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
          var scroll = $(window).scrollTop();
          var height = $(document).height() - $(window).height();
          var progress = pathLength - (scroll * pathLength / height);
          progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on('scroll', function () {
          if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
          } else {
            jQuery('.progress-wrap').removeClass('active-progress');
          }
        });
        jQuery('.progress-wrap').on('click', function (event) {
          event.preventDefault();
          jQuery('html, body').animate({ scrollTop: 0 }, duration);
          return false;
        })


      });
    },
    stickyHeader: function (e) {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
          $('.header--sticky').addClass('sticky')
        } else {
          $('.header--sticky').removeClass('sticky')
        }
      })
    },
    galleryPopUpmag: function () {
      $('.gallery-image').magnificPopup({
        type: 'image',
        gallery: {
          enabled: true
        }
      });
    },
    gsapAnimationImageScale: function (e) {
      $(document).ready(function () {
        gsap.registerPlugin(ScrollTrigger);

        let revealContainers = document.querySelectorAll(".rts-reveal-one");

        revealContainers.forEach((container) => {
          let image = container.querySelector(".rts-reveal-image-one");
          let rts = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              toggleActions: "play none none none", // Play once when it enters the viewport
              start: "top 100%",
              end: "top 0%",
              once: true, // Ensures it only plays once
            }
          });

          rts.set(container, {
            autoAlpha: 1
          });
          rts.from(container, 1.5, {
            xPercent: 100,
            ease: Power2.out
          });
          rts.from(image, 1.5, {
            xPercent: -100,
            scale: 1.3,
            delay: -1.5,
            ease: Power2.out
          });
        });
      });

      $(document).ready(function () {

        let growActive = document.getElementsByClassName('grow');
        if (growActive.length) {
          const growTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".grow",
              scrub: 1,
              start: "top 90%",
              end: "+=1000",
              ease: "power1.out",
              y: -60
            }
          });
          growTl.to(".grow", {
            duration: 1,
            y: 60
          });
        }

      });

    },
    radialProgress: function () {
      function radial_animate() {
        $('svg.radial-progress').each(function (index, value) {

          $(this).find($('circle.bar--animated')).removeAttr('style');
          // Get element in Veiw port
          var elementTop = $(this).offset().top;
          var elementBottom = elementTop + $(this).outerHeight();
          var viewportTop = $(window).scrollTop();
          var viewportBottom = viewportTop + $(window).height();

          if (elementBottom > viewportTop && elementTop < viewportBottom) {
            var percent = $(value).data('countervalue');
            var radius = $(this).find($('circle.bar--animated')).attr('r');
            var circumference = 2 * Math.PI * radius;
            var strokeDashOffset = circumference - ((percent * circumference) / 100);
            $(this).find($('circle.bar--animated')).animate({ 'stroke-dashoffset': strokeDashOffset }, 2800);
          }
        });
      }
      // To check If it is in Viewport 
      var $window = $(window);
      function check_if_in_view() {
        $('.countervalue').each(function () {
          if ($(this).hasClass('start')) {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();

            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
              $(this).removeClass('start');
              $('.countervalue').text();
              var myNumbers = $(this).text();
              if (myNumbers == Math.floor(myNumbers)) {
                $(this).animate({
                  Counter: $(this).text()
                }, {
                  duration: 2800,
                  easing: 'swing',
                  step: function (now) {
                    $(this).text(Math.ceil(now) + '%');
                  }
                });
              } else {
                $(this).animate({
                  Counter: $(this).text()
                }, {
                  duration: 2800,
                  easing: 'swing',
                  step: function (now) {
                    $(this).text(now.toFixed(2) + '$');
                  }
                });
              }

              radial_animate();
            }
          }
        });
      }

      $window.on('scroll', check_if_in_view);
      $window.on('load', check_if_in_view);

    },
    containerResize: function () {
      document.addEventListener("DOMContentLoaded", function () {
        gsap.registerPlugin(ScrollTrigger);

        const pinWrap = document.querySelector(".rts-video-pin");
        const wrapper = document.querySelector(".rts-video-wrapper");
        const slider = document.querySelector(".gsap-slider");
        const slides = gsap.utils.toArray(".gsap-slider .slide");

        if (!pinWrap || slides.length === 0) return;

        const slideCount = slides.length;

        gsap.set(wrapper, {
          scale: 0.2,
          transformOrigin: "center center",
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: pinWrap,
            start: "center center",
            end: () => "+=" + window.innerHeight * slideCount,
            scrub: true,
            pin: true,
            pinSpacing: true,      // ✅ overlap fix
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
          .to(wrapper, {
            scale: 1,
            duration: 1,
            ease: "none",
          })
          .to(slider, {
            xPercent: -100 * (slideCount - 1),
            duration: slideCount - 1,
            ease: "none",
          });
      });
    }
  }

  rtsJs.m();

})(jQuery, window)

/**
 * Feature: Making Tax Digital (MTD) First-Visit Popup
 * Handles UI injection, one-time display logic, and strict styling overrides.
 */
$(document).ready(function() {
    
    // Check local storage to ensure the modal only displays once per user
    if (!localStorage.getItem('mtdPopupSeen')) {

        /**
         * Dynamic Styles & Modal HTML Template
         */
        const mtdModalHtml = `
        <style>
            /* Enforce no background scrolling when modal is active */
            body.modal-open { overflow: hidden !important; padding-right: 0 !important; }
            
            /* Apply blur effect to the background overlay */
            .modal-backdrop.show { 
                backdrop-filter: blur(5px); 
                background-color: rgba(0, 0, 0, 0.6);
                opacity: 1 !important; 
            }
            
            /* Ensure modal sits above the sticky navbar */
            #mtdWelcomeModal { z-index: 99999 !important; }
            .modal-backdrop { z-index: 99998 !important; }
            
            #mtdWelcomeModal .modal-content {
                border: none;
                border-radius: 12px;
                overflow: hidden; /* Ensures header background respects rounded corners */
                box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            }
            
            /* Align items to the top (flex-start) rather than center for a cleaner look */
            #mtdWelcomeModal .modal-header {
                padding: 30px 30px 10px 30px; 
                border-bottom: none;
                display: flex;
                align-items: flex-start; 
                justify-content: space-between;
            }
            
            #mtdWelcomeModal .modal-title {
                margin: 0;
                line-height: 1.2; /* Tightens the title height to align with the close button */
            }
            
            #mtdWelcomeModal .btn-close {
                margin: 0;
                padding: 0;
                position: static;
                margin-top: 4px; /* Tiny adjustment to align the center of the X with the top of the text */
            }

            #mtdWelcomeModal .modal-body {
                padding: 10px 30px 20px 30px;
            }

            #mtdWelcomeModal .modal-footer {
                padding: 0 30px 30px 30px;
                border-top: none;
            }

            /* Flexbox structure to fix text wrapping */
            .mtd-list-item {
                display: flex;
                align-items: flex-start;
                margin-bottom: 14px;
            }

            .mtd-list-icon {
                color: #0ea5e9;
                margin-right: 12px;
                margin-top: 5px;
                flex-shrink: 0; 
            }

            /* Strict Mobile Responsiveness */
            @media (max-width: 768px) {
                #mtdWelcomeModal .modal-dialog {
                    width: 90vw !important;
                    max-width: 90vw !important;
                    margin: auto !important;
                }
                #mtdWelcomeModal .modal-header,
                #mtdWelcomeModal .modal-body,
                #mtdWelcomeModal .modal-footer {
                    padding-left: 20px !important;
                    padding-right: 20px !important;
                }
            }
        </style>

        <div class="modal fade" id="mtdWelcomeModal" tabindex="-1" aria-labelledby="mtdModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title" id="mtdModalLabel" style="font-weight: 700; color: #1a202c; padding-right: 20px;">
                            Important Update: Making Tax Digital (MTD)
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p style="font-size: 16px; margin-top: 15px; margin-bottom: 20px;">
                            <strong>Starting April 2026</strong>, HMRC is changing how taxes are filed.
                        </p>
                        
                        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <li class="mtd-list-item">
                                    <i class="fa-solid fa-check mtd-list-icon"></i>
                                    <div><strong>Who is affected:</strong> Sole traders and landlords with a gross income over £50,000.</div>
                                </li>
                                <li class="mtd-list-item">
                                    <i class="fa-solid fa-check mtd-list-icon"></i>
                                    <div><strong>What is changing:</strong> You must maintain digital records using MTD-compatible software.</div>
                                </li>
                                <li class="mtd-list-item" style="margin-bottom: 0;">
                                    <i class="fa-solid fa-check mtd-list-icon"></i>
                                    <div><strong>New Filing Schedule:</strong> You must submit <strong>4 quarterly updates</strong> plus <strong>1 final year-end declaration</strong>.</div>
                                </li>
                            </ul>
                        </div>
                        
                        <p style="font-size: 15px; margin-bottom: 0; color: #475569;">
                            Need help preparing? Our team can help you transition your bookkeeping to MTD-compliant software.
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="mtdContactUsBtn" class="rts-btn btn-primary" style="width: 100%; border-radius: 6px;">Contact Us</button>
                    </div>
                </div>
            </div>
        </div>
        `;


        // Inject into the DOM
        $('body').append(mtdModalHtml);
        // Add click handler for Contact Us button
        $(document).on('click', '#mtdContactUsBtn', function() {
          // Close the modal first
          var mtdModalElement = document.getElementById('mtdWelcomeModal');
          var mtdModalInstance = bootstrap.Modal.getInstance(mtdModalElement);
          if (mtdModalInstance) {
            mtdModalInstance.hide();
          }
          // Navigate to contact page after short delay for smooth UX
          setTimeout(function() {
            window.location.href = 'contact.html';
          }, 300);
        });

        // Delay initialization to prevent flashing during load
        setTimeout(function() {
          var mtdModalElement = document.getElementById('mtdWelcomeModal');
          var mtdModalInstance = new bootstrap.Modal(mtdModalElement, {
            backdrop: 'static', 
            keyboard: false     
          });
            
          // Bulletproof Scroll Lock logic
          mtdModalElement.addEventListener('show.bs.modal', function () {
            $('html, body').css({
              'overflow': 'hidden',
              'height': '100vh'
            });
          });

          mtdModalElement.addEventListener('hidden.bs.modal', function () {
            $('html, body').css({
              'overflow': '',
              'height': ''
            });
          });

          mtdModalInstance.show();
        }, 5000); // Show popup after 5 seconds

        // Set local storage flag
        localStorage.setItem('mtdPopupSeen', 'true');
    }
});