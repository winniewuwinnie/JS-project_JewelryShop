//nav
$("document").ready(function () {
  $(".header_menuMobile").click(function (event) {
    event.preventDefault();
    // 在.header上加上.mobileShow,以執行後續的class    
    $(".header").toggleClass("mobileShow");
  });
});



//swiper
var swiper = new Swiper(".hot-products .mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  navigation: {
    nextEl: ".hot-products .swiper-button-next",
    prevEl: ".hot-products .swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    375: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".hot-sort .mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  navigation: {
    nextEl: ".hot-sort .swiper-button-next",
    prevEl: ".hot-sort .swiper-button-prev",
  },
  breakpoints: {
    375: {
      slidesPerView: 1,      
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  },
});