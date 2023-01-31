// const baseUrl = "https://json-server-vercel-teal-seven.vercel.app/";
const baseUrl = "http://localhost:3000/";

let productId = location.href.split("=")[1];
let userId=parseInt(localStorage.getItem("userId"));

//取得當天日期
let today = new Date(); //Tue Dec 13 2022 15:10:45 GMT+0800 (台北標準時間)
let year = today.getFullYear(); //年
let month = today.getMonth() + 1; //月
let date = today.getDate(); //日
if (date.toString().length === 1) {
  date = `0${date}`;
}
let todayStr = `${year}-${month}-${date}`; //2022-12-13

//畫面初始化
function init() {
  getGoldPrice();
  getExchangeRate();
  getProductInfoData();
}
init();

//取得最新黃金價格(美元)
let goldPriceData;
let goldPrice;
function getGoldPrice() {
  axios
    .get(
      `https://api.finmindtrade.com/api/v4/data?dataset=GoldPrice&start_date=2022-12-01&end_date=${todayStr}`
    )
    .then(function (response) {
      goldPriceData = response.data.data;
      goldPrice = goldPriceData[goldPriceData.length - 2].Price;
      renderGoldPrice(goldPrice, exchangeRate);
    })
    .catch(function (error) {
      console.log(error);
    });
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
      renderGoldPrice(goldPrice, exchangeRate);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//渲染最新金價
let soldPrice = "";
function renderGoldPrice(goldPrice, exchangeRate) {
  if (goldPrice && exchangeRate) {
    soldPrice =
      (((goldPrice * exchangeRate) / 8.29426).toFixed() / 10).toFixed() * 10 +
      360;
      // renderProductInfoData(soldPrice);
  }
}


//取得商品資訊
let productInfoData;
function getProductInfoData() {
  axios
    .get(`${baseUrl}products?id=${productId}`)
    .then(function (response) {
      productInfoData = response.data;
      renderProductInfoData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// 渲染商品資訊
const productInfo = document.querySelector(".product-info");
function renderProductInfoData() {
  let str = "";
  productInfoData.forEach(function (item) {
    str = `<div class="row gy-0 align-items-center">
      <div
        class="col-md-5 col-12 bg-position-center bg-size-cover"
        style="
          background-image: url('${item.imgUrl}');
          height: 425px;
        "
      ></div>
      <div class="col-md-7 col-12">
        <div class="card-body py-5 px-0 px-md-3">
          <h4 class="h3 card-title fw-bold text-primary mb-3">
          ${item.title}
          </h4>
          <p class="mb-0 text-primary fs-6 mb-3">黃金重量：約${item.weight}錢</p>
          <div class="mb-8">
            <span class="fs-4 text-start fw-bold me-2 text-primary"
            >NT$${((item.price+item.weight*6930).toFixed()/10).toFixed()*10}</span
            >
            <span
            class="fs-6 text-decoration-line-through text-primary text-start"
            >NT$${((item.originPrice+item.weight*6930).toFixed()/10).toFixed()*10}</span
            >
          </div>
          <div class="d-flex flex-column flex-md-row">
            <a
              href="#"
              class="btn btn-outline-primary rounded-pill me-3 w-md-50 w-100 fs-6 mb-3 mb-md-0" data-btn="favorite" data-productid="${item.id}"
              >加入收藏<i class="fa-regular fa-heart ms-1" data-btn="favorite" data-productid="${item.id}"></i
            ></a>
            <a
              href="#"
              class="btn btn-outline-primary rounded-pill w-md-50 w-100 fs-6" data-btn="add-cart" data-id="${item.id}"
              title="心動不如馬上行動！"
              >加入購物車<i class="bi bi-bag ms-1" data-btn="add-cart" data-id="${item.id}"></i>
            </a>
          </div>
        </div>
      </div>
    </div>`;
  });
  productInfo.innerHTML = str;
}


//收藏商品
productInfo.addEventListener("click",function(e){
  e.preventDefault();
  let target=e.target.dataset;
  if(target.btn==="favorite"){
    //登出狀態
    if(localStorage.getItem("token") === null){
      swal({
        title: "請先登入會員",
        text: "3秒後跳轉至登入頁面",
      });
      setTimeout(function () {
        location.href = "login.html";
      }, 3000);
    }
    //登入狀態
    else{
      let favoriteItem={
        "userId": parseInt(localStorage.getItem("userId")),
        "productId": parseInt(target.productid),
      }
      favoriteProduct(favoriteItem);
    }
  }
})

//點選收藏
function favoriteProduct(favoriteItem){
  axios.post(`${baseUrl}bookmarks`,favoriteItem)
  .then(function(response){
    console.log(response);
    alert("已加入收藏！")
  })
  .catch(function(error){
    console.log(error);
  })
}


//點選加入購物車
let cartsData;
productInfo.addEventListener("click", function (e) {
  e.preventDefault();
  let target = e.target.dataset;
  if (target.btn === "add-cart") {
    //登出狀態
    if (localStorage.getItem("token") === null) {
      swal({
        title: "請先登入會員",
        text: "3秒後跳轉至登入頁面",
      });
      setTimeout(function () {
        location.href = "login.html";
      }, 3000);
    }
    //登入狀態
    else {
      console.log("click")
        let cartItem = {
          quantity: 1,
          productId: parseInt(target.id),
          userId:userId,
        };
        addCart(cartItem);
    }
  }else{
    return;
  }
});
function addCart(cartItem) {
  axios
    .post(`${baseUrl}carts`, cartItem)
    .then(function (response) {
      console.log(response);
      alert("成功加入購物車！")
    })
    .catch(function (error) {
      console.log(error);
    });
}