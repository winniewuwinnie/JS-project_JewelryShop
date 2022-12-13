const baseUrl = "https://json-server-vercel-ebon.vercel.app/";
// const baseUrl = "http://localhost:3000/";


//取得當天日期
let today = new Date(); //Tue Dec 13 2022 15:10:45 GMT+0800 (台北標準時間)
let year = today.getFullYear(); //年
let month = today.getMonth() + 1; //月
let date = today.getDate(); //日
if (date.toString().length === 1) {
  date = `0${date}`;
}
let todayStr=`${year}-${month}-${date}`;//2022-12-13
const refreshTime=document.querySelector(".refresh-time");
if(today.getHours()>=10){
  refreshTime.textContent=`更新時間：${year}/${month}/${date} 10:00`
}else if(today.getHours()<10){
  refreshTime.textContent=`更新時間：${year}/${month}/${date-1} 10:00`
}

//初始化畫面
function init() {
  getGoldPrice();
  getExchangeRate();
  getHotSalesProductsData();
}
init();

// loading
// $(window).load(function() { // 確認整個頁面讀取完畢再將這三個div隱藏起來
//   $("#status").delay(4000).fadeOut(3000); //delay --> 延遲幾秒才fadeOut
//   $("#preloader").delay(5000).fadeOut(3000);
// })


//取得最新黃金價格(美元)
let goldPriceData;
let goldPrice;
function getGoldPrice() {
  axios.get(
    `https://api.finmindtrade.com/api/v4/data?dataset=GoldPrice&start_date=2022-12-01&end_date=${todayStr}`
  )
  .then(function(response){
    goldPriceData=response.data.data;
    goldPrice=goldPriceData[goldPriceData.length-2].Price;
    // console.log(goldPrice)
    renderGoldPrice(goldPrice,exchangeRate)
  })
  .catch(function(error){
    console.log(error)
  })
}

//取得最新的美金兌換台幣匯率
let exchangeRateData;
let exchangeRate;
function getExchangeRate() {
  axios
    .get(
      "https://api.finmindtrade.com/api/v3/data?dataset=TaiwanExchangeRate&data_id=USD&date=2022-12-01"
    )
    .then(function (response) {
      exchangeRateData = response.data.data;
      exchangeRate = exchangeRateData[exchangeRateData.length - 1].spot_buy;
      // console.log(exchangeRate)
      renderGoldPrice(goldPrice,exchangeRate)
    })
    .catch(function (error) {
      console.log(error);
    });
}

//渲染最新金價
const buyPrice=document.querySelector(".buy-price");
const soldPrice=document.querySelector(".sold-price");
function renderGoldPrice(goldPrice,exchangeRate){
  if(goldPrice&&exchangeRate){ 
  let newestPrice=((goldPrice*exchangeRate/8.29426).toFixed()/10).toFixed()*10;
  // console.log(newestPrice)
  buyPrice.textContent=`NT$${newestPrice+360}/錢`;
  soldPrice.textContent=`NT$${newestPrice-240}/錢`;
  }
}


//熱銷商品
const hotSalesProductsList = document.querySelector(".hotSales-products-list");
let hotSalesProductsData;
//取得熱銷商品資料
function getHotSalesProductsData() {
  axios
    .get(`${baseUrl}hotSalesProducts`)
    .then(function (response) {
      hotSalesProductsData = response.data;
      renderHotSalesProductsData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//渲染熱銷商品畫面
function renderHotSalesProductsData() {
  let str = "";
  hotSalesProductsData.forEach(function (item) {
    str += `<div class="swiper-slide">
    <div>
      <div
        class="rounded-3 mb-3 swiper-img bg-position-center bg-size-cover bg-repeat-none"
        style="background-image: url('${item.imgUrl}');"
      >
        <div class="d-flex align-items-center mx-3 py-2">
          <span
            class="fs-6 p-3 text-nowrap me-3 bg-position-center bg-size-cover bg-repeat-none"
            style="
              background-image: url('./images/hotSales.svg');"
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
  });
  hotSalesProductsList.innerHTML = str;
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
//轉址
// const hotSortSwiper=document.querySelector(".hot-sort-swiper");

// console.log(hotSortSwiper)
// hotSortSwiper.addEventListener("click",function(e){
//   // e.preventDefault();
//   console.log(e.target.dataset.category)
// })


//<----------- TRY ----------->
// function renderGoldPrice(price,exchangeRate){
//   // console.log(price,exchangeRate)
//   // console.log(price*exchangeRate)
//   let GoldPrice=((price*exchangeRate/8.29426).toFixed()/10).toFixed()*10;
//   buyPrice.textContent=`NT$${GoldPrice+390}/錢`;
//   soldPrice.textContent=`NT$${GoldPrice-210}/錢`;
// }

//取得當前日期(年-月-日)
// let Today = new Date(); //Sun Dec 04 2022 00:26:30 GMT+0800 (台北標準時間)
// let year = Today.getFullYear(); //年
// let month = Today.getMonth() + 1; //月
// let date = Today.getDate(); //日
// let week = Today.getDay(); //星期日:0
// let currentDateStr;
// let beforeDateStr;
// function getCurrentDate() {
//   //如果是禮拜日、禮拜六則取得禮拜五的報價
//   if (week === 0) {
//     date -= 2;
//   } else if (week === 1) {
//     date -= 1;
//   }
//   let dayBeforeDate=date-1;//前一日
//   if (date.toString().length === 1) {
//     date = `0${date}`;
//     dayBeforeDate=`0${dayBeforeDate}`;
//   } else {
//     return;
//   }
//   currentDateStr = `${year}-${month}-${date}`;
//   beforeDateStr=`${year}-${month}-${dayBeforeDate}`;
//   getCurrentGoldPriceData(currentDateStr);
//   getBeforeExchangeRate(beforeDateStr);
// }
// getCurrentDate();

//取得當日金價(美元)
// let currentGoldPriceData;
// let currentGoldPrice="";
// function getCurrentGoldPriceData() {
//   axios
//     .get(
//       `https://api.finmindtrade.com/api/v4/data?dataset=GoldPrice&start_date=${currentDateStr}&end_date=${currentDateStr}`
//     )
//     .then(function (response) {
//       currentGoldPriceData = response.data.data;
//       //如果當天報價異常
//       if (
//         currentGoldPriceData.length === 1 &&
//         currentGoldPriceData[0].Price > 7
//       ) {
//         // console.log("報價異常");
//         getNearGoldPriceData();
//       }else{
//         currentGoldPriceData.forEach(function (item, index) {
//           let targetTime=`${beforeDateStr} 00:00:00`;
//           if (item.date === targetTime) {
//             currentGoldPrice = item.Price;
//             renderGoldPrice(currentGoldPrice);
//           }
//         });
//       }
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

//取得前日金價(美元)
// function getNearGoldPriceData() {
//   axios
//     .get(
//       `https://api.finmindtrade.com/api/v4/data?dataset=GoldPrice&start_date=${beforeDateStr}&end_date=${beforeDateStr}`
//     )
//     .then(function (response) {
//       currentGoldPriceData = response.data.data;
//       currentGoldPriceData.forEach(function (item, index) {
//         let targetTime=`${beforeDateStr} 00:00:00`;
//         if (item.date === targetTime) {
//           currentGoldPrice = item.Price;
//           renderGoldPrice(currentGoldPrice,exchangeRate);
//           renderGetPriceTime(beforeDateStr);
//         }
//       });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

//渲染當前金價
// const buyPrice=document.querySelector(".buy-price");
// const soldPrice=document.querySelector(".sold-price");
// function renderGoldPrice(price,exchangeRate){
//   // console.log(price,exchangeRate)
//   // console.log(price*exchangeRate)
//   let GoldPrice=((price*exchangeRate/8.29426).toFixed()/10).toFixed()*10;
//   buyPrice.textContent=`NT$${GoldPrice+390}/錢`;
//   soldPrice.textContent=`NT$${GoldPrice-210}/錢`;
// }
//渲染更新時間
// const refreshTime=document.querySelector(".refresh-time")
// function renderGetPriceTime(beforeDateStr){
//   refreshTime.textContent=`更新時間：${beforeDateStr} 10:00`
// }