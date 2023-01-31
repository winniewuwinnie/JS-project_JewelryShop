let lastPos = 0;
const navbar = document.querySelector(".navbar");
const moblieMenu=document.querySelector(".navbar-toggler");

// 監聽scroll事件
document.addEventListener("scroll", function () {
  let currentPos = window.scrollY;
  //   往下滑
  if (currentPos > lastPos) {
    navbar.style.top = "-520px"; //讓nav bar消失
  } else {
    navbar.style.top = "0px"; //讓nav bar出現
  }
  lastPos = currentPos; //再記住現在位置，跟未來的位置做比較
});

//登入登出狀態改變nav
let str="";
if(localStorage.getItem("token")===null){
  str=`<div class="container-fluid border-bottom border-primary mx-3">
  <a class="navbar-brand fw-bold link-primary letter-spacing-sm" href="index.html"><h1>億滿春</h1></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon text-white"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item bg-white bg-lg-transparent rounded-top">
          <a class="nav-link fw-bold text-lg-primary text-dark text-lg-start text-center fs-7 me-lg-4 border-lg-0 border-bottom border-dark mx-3" aria-current="page" href="index.html">首頁</a>
        </li>
        <li class="nav-item d-none d-lg-block">
          <a class="nav-link fw-bold link-primary fs-7 me-lg-4" href="products.html">商品專區</a>
        </li>
        <li class="nav-item dropdown d-lg-none d-block bg-white">
          <a class="nav-link fw-bold dropdown-toggle text-dark text-center fs-7 border-bottom border-dark mx-3" href="products.html" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            商品專區
          </a>
          <ul class="dropdown-menu text-center rounded-0 border-0 m-0 p-0" aria-labelledby="navbarDropdown">                
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html">全部商品</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?remark=熱銷">熱銷商品</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?remark=新品">最新商品</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?category=necklace">項鍊</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?category=earing">耳環</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?category=ring">戒指</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?category=pendant">墜飾</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?category=bracelet">手鍊</a></li>
          </ul>
        </li>
        <li class="nav-item bg-white bg-lg-transparent">
          <a class="nav-link fw-bold text-lg-primary text-dark text-lg-start text-center fs-7 me-lg-4 border-lg-0 border-bottom border-dark mx-3" href="priceInformation.html">價格資訊</a>
        </li>
        <li class="nav-item bg-white bg-lg-transparent rounded-bottom">
          <a class="nav-link fw-bold btn btn-outline-primary rounded-pill fs-7 px-4 d-none d-lg-block" href="login.html">登入</a>
          <a class="nav-link fw-bold d-lg-none d-block text-dark text-center fs-7" href="login.html">登入</a>
        </li>
      </ul>
    </div>
  </div>`;
}
else if(localStorage.getItem("token")){
  // console.log("登入狀態");
  str=`<div class="container-fluid border-bottom border-primary mx-3">
  <a class="navbar-brand fw-bold link-primary letter-spacing-sm" href="index.html"><h1>億滿春</h1></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon text-white"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item bg-white bg-lg-transparent rounded-top">
          <a class="nav-link fw-bold text-lg-primary text-dark text-lg-start text-center fs-7 me-lg-4 border-lg-0 border-bottom border-dark mx-3" aria-current="page" href="index.html">首頁</a>
        </li>
        <li class="nav-item d-none d-lg-block">
          <a class="nav-link fw-bold link-primary fs-7 me-lg-4" href="products.html">商品專區</a>
        </li>
        <li class="nav-item dropdown d-lg-none d-block bg-white">
          <a class="nav-link fw-bold dropdown-toggle text-dark text-center fs-7 border-bottom border-dark mx-3" href="products.html" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            商品專區
          </a>
          <ul class="dropdown-menu text-center rounded-0 border-0 m-0 p-0" aria-labelledby="navbarDropdown">                
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html">全部商品</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?remark=熱銷">熱銷商品</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?remark=新品">最新商品</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?category=necklace">項鍊</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?category=earing">耳環</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?category=ring">戒指</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?category=pendant">墜飾</a></li>
            <li class="border-bottom border-dark mx-5"><a class="dropdown-item text-dark fw-bold" href="products.html?category=bracelet">手鍊</a></li>
          </ul>
        </li>
        <li class="nav-item bg-white bg-lg-transparent">
          <a class="nav-link fw-bold text-lg-primary text-dark text-lg-start text-center fs-7 me-lg-4 border-lg-0 border-bottom border-dark mx-3" href="priceInformation.html">價格資訊</a>
        </li>  
        <li class="nav-item bg-white bg-lg-transparent">
          <a class="nav-link fw-bold text-lg-primary text-dark text-lg-start text-center fs-7 me-lg-4 border-lg-0 border-bottom border-dark mx-1 d-lg-block d-none" href="user.html"><i class="fa-solid fa-user"></i></a>
        </li>                
        <li class="nav-item bg-white bg-lg-transparent">
          <a class="nav-link fw-bold text-lg-primary text-dark text-lg-start text-center fs-7 me-lg-3 border-lg-0 border-bottom border-dark mx-1 d-lg-block d-none" href="cart.html"><i class="fa-solid fa-bag-shopping"></i></a>
        </li>
        <li class="nav-item bg-white bg-lg-transparent">
          <a class="nav-link fw-bold text-lg-primary text-dark text-lg-start text-center fs-7 border-lg-0 border-bottom border-dark mx-3 d-lg-none" href="user.html">會員中心</a>
        </li>             
        <li class="nav-item bg-white bg-lg-transparent">
          <a class="nav-link fw-bold text-lg-primary text-dark text-lg-start text-center fs-7 me-lg-4 border-lg-0 border-bottom border-dark mx-3 d-lg-none" href="cart.html">購物清單</a>
        </li>
      </ul>
    </div>
  </div>`;
};
navbar.innerHTML=str;