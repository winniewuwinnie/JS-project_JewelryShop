const baseUrl = "https://json-server-vercel-ebon.vercel.app/";
//首頁
//初始化畫面
function init() {
  getHotSalesProductsData();
}
init();

//取得當前日期(年-月-日)
let Today = new Date(); //Sun Dec 04 2022 00:26:30 GMT+0800 (台北標準時間)
let year = Today.getFullYear(); //年
let month = Today.getMonth() + 1; //月
let date = Today.getDate(); //日
let week = Today.getDay(); //星期日:0
let currentDateStr;
let beforeDateStr;
function getCurrentDate() {
  //如果是禮拜日、禮拜六則取得禮拜五的報價
  if (week === 0) {
    date -= 2;
  } else if (week === 1) {
    date -= 1;
  }
  let dayBeforeDate=date-1;//前一日
  if (date.toString().length === 1) {
    date = `0${date}`;
    dayBeforeDate=`0${dayBeforeDate}`;
  } else {
    return;
  }
  currentDateStr = `${year}-${month}-${date}`;
  beforeDateStr=`${year}-${month}-${dayBeforeDate}`;  
  getCurrentGoldPriceData(currentDateStr);
  getBeforeExchangeRate(beforeDateStr);
}
getCurrentDate();

//取得當日金價(美元)
let currentGoldPriceData;
let currentGoldPrice="";
function getCurrentGoldPriceData() {
  axios
    .get(
      `https://api.finmindtrade.com/api/v4/data?dataset=GoldPrice&start_date=${currentDateStr}&end_date=${currentDateStr}`
    )
    .then(function (response) {
      currentGoldPriceData = response.data.data;
      //如果當天報價異常
      if (
        currentGoldPriceData.length === 1 &&
        currentGoldPriceData[0].Price > 7
      ) {
        console.log("報價異常");
        getNearGoldPriceData();
      }else{
        currentGoldPriceData.forEach(function (item, index) {
          let targetTime=`${beforeDateStr} 09:00:00`;
          if (item.date === targetTime) {
            currentGoldPrice = item.Price;
            renderGoldPrice(currentGoldPrice);
          }
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

//取得前日金價(美元)
function getNearGoldPriceData() {
  axios
    .get(
      `https://api.finmindtrade.com/api/v4/data?dataset=GoldPrice&start_date=${beforeDateStr}&end_date=${beforeDateStr}`
    )
    .then(function (response) {
      currentGoldPriceData = response.data.data;
      currentGoldPriceData.forEach(function (item, index) {
        let targetTime=`${beforeDateStr} 09:00:00`;
        if (item.date === targetTime) {
          currentGoldPrice = item.Price;
          renderGoldPrice(currentGoldPrice,exchangeRate);
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

let exchangeRate;
//取得當前的美金兌換台幣匯率
function getBeforeExchangeRate(beforeDateStr){
  axios.get("https://api.finmindtrade.com/api/v3/data?dataset=TaiwanExchangeRate&data_id=USD&date=2022-12-01")
  .then(function(response){
    exchangeRate=response.data.data;
    exchangeRate.forEach(function(item){
      if(item.date===beforeDateStr){
        exchangeRate=item.spot_buy;        
        renderGoldPrice(currentGoldPrice,exchangeRate);
      }
    })
  })
  .catch(function(error){
    console.log(error);
  })
}

//渲染當前金價
const test=document.querySelector(".render-test");
console.log(test)
function renderGoldPrice(price,exchangeRate){
  // console.log(price,exchangeRate)
  console.log(price*exchangeRate)
  let GoldPrice=((price*exchangeRate/8.29426).toFixed()/10).toFixed()*10;
  test.textContent=GoldPrice;
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
