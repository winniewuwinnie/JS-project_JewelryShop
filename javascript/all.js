//layout
//nav
$("document").ready(function () {
  $(".header_menuMobile").click(function (event) {
    event.preventDefault();
    // 在.header上加上.mobileShow,以執行後續的class
    $(".header").toggleClass("mobileShow");
  });
});









