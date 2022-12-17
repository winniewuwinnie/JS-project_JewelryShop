const baseUrl = "https://json-server-vercel-teal-seven.vercel.app/";
// const baseUrl = "http://localhost:3000/";

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
let userId = parseInt(localStorage.getItem("userId"));
function init() {
  getGoldPrice();
  getExchangeRate();
  getFavoriteData();
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





//取得會員最愛典藏
const favoriteList = document.querySelector(".favorite-list");
let data;
function getFavoriteData() {
  axios
    .get(`${baseUrl}bookmarks?_expand=product`)
    .then(function (response) {
      data = response.data;
      let favoriteData = data.filter(function (item) {
        if (item.userId === userId) {
          return item;
        }
      });
      renderFavoriteData(favoriteData,soldPrice);
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
      renderFavoriteData(favoriteData,soldPrice);
  }
}


//渲染會員最愛典藏
function renderFavoriteData(favoriteData,soldPrice) {
  console.log(soldPrice)
  let str = "";
  if (favoriteData.length === 0) {
    str = `<p class="fs-5 text-center py-6">您尚無收藏任何商品</p>`;
  } else {
    favoriteData.forEach(function (item) {
      if (item.product.remark === "") {
        str += `<div class="col-lg-4 col-md-6">
        <div class="position-relative">
          <a
            href="productInfo.html?id=${item.product.id}"
            class="d-block rounded-3 mb-3 bg-position-center bg-size-cover bg-repeat-none"
            style="
              background-image: url('${item.product.imgUrl}');
              max-width: 100%;
              height: 312px;
            "
          ></a>
          <a href="#" class="position-absolute top-0 end-0 m-4 me-3" data-id="${item.id}"
            ><i class="fa-sharp fa-solid fa-heart fs-6"></i
          ></a>
        </div>
        <h4
          class="border-bottom border-primary pb-2 mb-2 fw-bold fs-5 text-center"
        >
          ${item.product.title}
        </h4>
        <div class="d-flex justify-content-between align-items-end">
          <div>
            <span class="fs-6 text-start fw-bold me-1">NT$${((item.product.price+item.product.weight*6930).toFixed()/10).toFixed()*10}</span>
            <span
              class="text-decoration-line-through text-originalPrice text-start mb-2"
              >NT$${((item.product.originPrice+item.product.weight*6930).toFixed()/10).toFixed()*10}</span
            >
          </div>
          <button
            class="btn btn-outline-primary rounded-pill"
            title="心動不如馬上行動！" data-btn="add-cart" data-id="${item.product.id}"
            >加入購物車</button
          >
        </div>
      </div>`;
      } else if (item.product.remark === "熱銷") {
        str += `<div class="col-lg-4 col-md-6">
        <div class="position-relative">
          <a
            href="productInfo.html?id=${item.product.id}"
            class="d-block rounded-3 mb-3 bg-position-center bg-size-cover bg-repeat-none"
            style="
              background-image: url('${item.product.imgUrl}');
              max-width: 100%;
              height: 312px;
            "
          ></a>
          <div class="d-flex justify-content-between align-items-center position-absolute top-0 w-100 p-2 pe-3">
            <p class="fs-6 text-nowrap bg-size-contain bg-repeat-none bg-position-center mb-0 p-3"
                style="background-image: url('./images/hotSales.svg');">${item.product.remark}</p>
            <a href="#"><i class="fa-sharp fa-solid fa-heart fs-6" data-id="${item.id}"></i
            ></a>
          </div>
        </div>
        <h4
          class="border-bottom border-primary pb-2 mb-2 fw-bold fs-5 text-center"
        >
        ${item.product.title}
        </h4>
        <div class="d-flex justify-content-between align-items-end">
          <div>
            <span class="fs-6 text-start fw-bold me-1">NT$${((item.product.price+item.product.weight*6930).toFixed()/10).toFixed()*10}</span>
            <span
              class="text-decoration-line-through text-originalPrice text-start mb-2"
              >NT$${((item.product.originPrice+item.product.weight*6930).toFixed()/10).toFixed()*10}</span
            >
          </div>
          <button
            class="btn btn-outline-primary rounded-pill"
            title="心動不如馬上行動！" data-btn="add-cart" data-id="${item.product.id}"
            >加入購物車</button
          >
        </div>
      </div>`;
      } else if (item.product.remark === "新品") {
        str += `<div class="col-lg-4 col-md-6">
        <div class="position-relative">
          <a
            href="productInfo.html?id=${item.product.id}"
            class="d-block rounded-3 mb-3 bg-position-center bg-size-cover bg-repeat-none"
            style="
              background-image: url('${item.product.imgUrl}');
              max-width: 100%;
              height: 312px;
            "
          ></a>
          <div class="d-flex justify-content-between align-items-center position-absolute top-0 w-100 p-2 pe-3">
            <p class="fs-6 text-nowrap bg-size-contain bg-repeat-none bg-position-center mb-0 p-3"
                style="background-image: url('./images/hotSales.svg');">${item.product.remark}</p>
            <a href="#"><i class="fa-sharp fa-solid fa-heart fs-6" data-id="${item.id}"></i
            ></a>
          </div>
        </div>
        <h4
          class="border-bottom border-primary pb-2 mb-2 fw-bold fs-5 text-center"
        >
        ${item.product.title}
        </h4>
        <div class="d-flex justify-content-between align-items-end">
          <div>
            <span class="fs-6 text-start fw-bold me-1">NT$${((item.product.price+item.product.weight*6930).toFixed()/10).toFixed()*10}</span>
            <span
              class="text-decoration-line-through text-originalPrice text-start mb-2"
              >NT$${((item.product.originPrice+item.product.weight*6930).toFixed()/10).toFixed()*10}</span
            >
          </div>
          <button
            class="btn btn-outline-primary rounded-pill"
            title="心動不如馬上行動！" data-btn="add-cart" data-id="${item.product.id}"
            >加入購物車</button
          >
        </div>
      </div>`;
      }
    });
  }
  favoriteList.innerHTML = str;
}

//移除最愛典藏
favoriteList.addEventListener("click", function (e) {
  console.log(e.target);
  let bookmarkId = e.target.dataset.id;
  delFavoriteItem(bookmarkId);
});
function delFavoriteItem(bookmarkId) {
  axios
    .delete(`${baseUrl}bookmarks/${bookmarkId}`)
    .then(function (response) {
      // console.log(response);
      alert("移除成功！");
    })
    .catch(function (error) {
      console.log(error);
    });
}

//點選加入購物車
let cartsData;
favoriteList.addEventListener("click", function (e) {
  let target = e.target.dataset;
  if (target.btn === "add-cart") {
        getCartsData(target);
  }else{
    return;
  }
});

let cartObj = {};
function getCartsData(target) {
  axios
    .get(`${baseUrl}carts`)
    .then(function (response) {
      cartsData = response.data;
      let cartItem = {
        quantity: 1,
        productId: parseInt(target.id),
        userId:userId,
      };
      addCart(cartItem);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//新增產品至購物車
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


//如果點選登出
const logout = document.querySelectorAll(".logout");
logout.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    swal({
      title: "登出成功!",
      text: "3秒後返回首頁",
      icon: "success",
    });
    setTimeout(function () {
      location.href = "index.html";
    }, 3000);
  });
});
