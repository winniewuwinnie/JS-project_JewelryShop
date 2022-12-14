//layout
//nav
$("document").ready(function () {
  $(".header_menuMobile").click(function (event) {
    event.preventDefault();
    // 在.header上加上.mobileShow,以執行後續的class
    $(".header").toggleClass("mobileShow");
  });
});

//登入狀態改變nav
const navBar=document.querySelector(".nav-bar");
let str="";
if(localStorage.getItem("token")){
  console.log("登入狀態");
  str=`<div class="header pt-3 border-bottom border-primary align-items-center">
  <h1>
    <a
      href="index.html"
      class="text-decoration-none text-primary letter-spacing-sm"
      >億滿春</a
    >
  </h1>
  <ul
    class="header_menu list-unstyled bg-white bg-md-transparent rounded-2 align-items-center"
  >
    <li class="pt-3 pt-md-0 px-3 px-md-0">
      <a
        href="index.html"
        class="nav-link fw-bold text-dark text-md-primary fs-7 border-bottom border-md-0 text-center text-md-start me-md-4 py-1 py-md-0"
        >首頁</a
      >
    </li>
    <li class="px-3 px-md-0">
      <a
        href="products.html"
        class="nav-link fw-bold text-dark text-md-primary fs-7 border-bottom border-md-0 text-center text-md-start me-md-4 py-1 py-md-0"
        >商品專區</a
      >
    </li>
    <li class="px-3 px-md-0">
      <a
        href="priceInformation.html"
        class="nav-link fw-bold text-dark text-md-primary fs-7 border-bottom border-md-0 text-center text-md-start me-md-4 py-1 py-md-0"
        >價格資訊</a
      >
    </li>
    <!-- 登入會員後顯示-PC版 -->
    <li class="d-none d-md-block">
      <a
        href="user.html"
        class="nav-link fw-bold text-dark text-md-primary fs-7"
        ><i class="fa-solid fa-user me-md-5"></i
      ></a>
    </li>
    <li class="d-none d-md-block">
      <a href="cart.html" class="nav-link fw-bold text-dark text-md-primary fs-7"
        ><i class="fa-solid fa-bag-shopping"></i
      ></a>
    </li>
    <!-- 登入會員後顯示-moblie版 -->
    <li class="d-block d-md-none px-3 px-md-0">
      <a
        href="user.html"
        class="nav-link fw-bold text-dark text-md-primary fs-7 border-bottom border-md-0 text-center text-md-start py-1"
        >會員中心</a
      >
    </li>
    <li class="d-block d-md-none px-3 px-md-0 pb-3">
      <a
        href="cart.html"
        class="nav-link fw-bold text-dark text-md-primary fs-7 text-center text-md-start py-1"
        >購物清單</a
      >
    </li>
  </ul>
  <a class="header_menuMobile link-primary fs-1" href="#"
    ><i class="fa-solid fa-bars"></i
  ></a>
</div>`;
navBar.innerHTML=str;
};








