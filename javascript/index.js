const baseUrl="https://json-server-vercel-ebon.vercel.app/";
//首頁
//初始化畫面
function init(){
  getHotSalesProductsData();
}
init();


//熱銷商品
const hotSalesProductsList=document.querySelector(".hotSales-products-list");
let hotSalesProductsData;
//取得熱銷商品資料
function getHotSalesProductsData() {
  axios
    .get(`${baseUrl}hotSalesProducts`)
    .then(function (response) {
      hotSalesProductsData=response.data;
      renderHotSalesProductsData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//渲染熱銷商品畫面
function renderHotSalesProductsData(){
  let str="";
  hotSalesProductsData.forEach(function(item){
    str+=`<div class="swiper-slide">
    <div>
      <div
        class="rounded-3 mb-3 swiper-img"
        style="
          background-image: url('${item.imgUrl}');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
        "
      >
        <div class="d-flex align-items-center mx-3 py-2">
          <span
            class="fs-6 p-3 text-nowrap me-3"
            style="
              background-image: url('./images/hotSales.svg');
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center center;
            "
            >熱銷</span
          >
          <img
            src="./images/arrow.png"
            alt="arrow"
            class="me-2 img-fluid"
          />
          <a href="#" title="加入為收藏！"
            ><i class="fa-regular fa-heart fs-6"></i
          ></a>
        </div>
      </div>
      <h4 class="border-bottom border-primary pb-2 mb-2 fw-bold fs-5">
      ${item.title}
      </h4>
      <div class="d-flex justify-content-between align-items-end">
        <div>
          <span class="fs-6 text-start fw-bold me-2">NT$${item.price}</span>
          <span class="text-decoration-line-through text-originalPrice text-start mb-2">NT$${item.originPrice}</span>
        </div>
        <a
          href="#"
          class="btn btn-outline-primary rounded-pill"
          title="心動不如馬上行動！"
          >加入購物車</a
        >
      </div>
    </div>
  </div>`;
  })
  hotSalesProductsList.innerHTML=str;
}

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



//熱門分類
//swiper
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