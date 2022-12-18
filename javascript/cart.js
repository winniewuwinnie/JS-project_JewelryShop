const baseUrl = "https://json-server-vercel-teal-seven.vercel.app/";
// const baseUrl = "http://localhost:3000/";

let userId = parseInt(localStorage.getItem("userId"));

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
  getCartsData();
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

//取得購物車資料
let cartsData;
const confirmBtn = document.querySelector(".confirm-btn");
function getCartsData() {
  axios
    .get(`${baseUrl}carts?_expand=product`)
    .then(function (response) {
      cartsData = response.data;
      cartsData = cartsData.filter(function (item) {
        return item.userId === userId;
      });
      renderCartsData(cartsData);
      //如果購物車內沒有任何商品
      confirmBtn.addEventListener("click", function (e) {
        if (cartsData.length === 0) {
          e.preventDefault();
          swal({
            title: "購物車內尚無任何商品，請先至商品專區選購",
            text: "3秒後跳轉至商品專區",
            icon: "info",
          });
          setTimeout(function () {
            location.href = "products.html";
          }, 3000);
        } else {
          location.href = "customerInfo.html";
        }
      });
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
    // renderCartsData(cartsData,soldPrice);
  }
}

//渲染購物車資料
const cartList = document.querySelector(".cart-list");
const cartTotalNum = document.querySelector(".cart-total-num");
const cartTotalPrice = document.querySelector(".cart-total-price");
let totalNum = 0;
let totalPrice = 0;
function renderCartsData(data) {
  let str = "";
  if (data.length === 0) {
    str = `<tr><th colspan="5" class="text-center">購物車內尚無任何商品</th></tr>`;
  } else {
    data.forEach(function (item) {
      // console.log(soldPrice)
      str += `<tr>
      <th scope="row" class="d-flex align-items-center p-3">
        <img
          src="${item.product.imgUrl}"
          alt="${item.product.title}"
          width="100px"
          height="100%"
          class="rounded-3 me-3"
        />
        <h3 class="h6 fw-bold text-nowrap">${item.product.title}</h3>
      </th>
      <td class="p-3">${((item.product.price+item.product.weight*6930).toFixed()/10).toFixed()*10}</td>
      <td class="p-3 text-nowrap">
        <a href="#" class="link-dark"
          ><i class="fa-solid fa-plus me-3" data-status="plus" data-cartid=${
            item.id
          }></i
        ></a>
        <span class="me-3">${item.quantity}</span>
        <a href="#" class="link-dark"
          ><i class="fa-solid fa-minus" data-status="minus" data-cartid=${
            item.id
          }></i
        ></a>
      </td>
      <td class="p-3">${((item.product.price+item.product.weight*6930).toFixed()/10).toFixed()*10 * item.quantity}</td>
      <td>
        <a href="#" class="link-dark"
          ><i class="fa-solid fa-xmark fs-6" data-btn="delete" data-cartid=${
            item.id
          }></i
        ></a>
      </td>
    </tr>`;
    // totalNum += item.quantity/2;
    totalNum += item.quantity;
    totalPrice += ((item.product.price+item.product.weight*6930).toFixed()/10).toFixed()*10 * item.quantity ;
    // if(item.product.weight*soldPrice===0){
    //   return;
    // }else{
    //   totalPrice += ((item.product.price+item.product.weight*6930).toFixed()/10).toFixed()*10 * item.quantity ;
    // }
    });
  }
  cartList.innerHTML = str;
  //計算商品總數量
  cartTotalNum.textContent = `商品數量：總共 ${totalNum} 件`;
  cartTotalPrice.textContent = `總金額：NT$${totalPrice}`;
}

//增減商品數量
cartList.addEventListener("click", function (e) {
  e.preventDefault();
  let target = e.target.dataset;
  let status = target.status;
  let cartId = target.cartid;
  if (target.status) {
    axios
      .get(`${baseUrl}carts/${cartId}`)
      .then(function (response) {
        let reviseQuantity = response.data.quantity;
        if (status === "plus") {
          reviseQuantity++;
        } else if (status === "minus") {
          if (reviseQuantity == 1) {
            alert("數量不可少於1件");
            return;
          } else {
            reviseQuantity--;
          }
        }
        alert("已為您修改數量");
        patchProductNum(cartId, reviseQuantity);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});
function patchProductNum(cartId, reviseQuantity) {
  axios
    .patch(`${baseUrl}carts/${cartId}`, { quantity: reviseQuantity })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//刪除商品
cartList.addEventListener("click", function (e) {
  e.preventDefault();
  let target = e.target.dataset;
  let cartId = target.cartid;
  if (target.btn === "delete") {
    deleteCartItem(cartId);
  } else {
    return;
  }
});
function deleteCartItem(cartId) {
  axios
    .delete(`${baseUrl}carts/${cartId}`)
    .then(function (response) {
      console.log(response);
      alert("成功刪除該筆商品");
    })
    .catch(function (error) {
      console.log(error);
    });
}
