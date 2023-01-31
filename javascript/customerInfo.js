const baseUrl = "https://json-server-vercel-teal-seven.vercel.app/";
// const baseUrl = "http://localhost:3000/";

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
function getCartsData() {
  axios
    .get(`${baseUrl}carts?_expand=product`)
    .then(function (response) {
      cartsData = response.data;
      cartsData = cartsData.filter(function (item) {
        return item.userId === userId;
      });
      renderCartsData(cartsData);
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
      <td class="p-3 text-nowrap">${item.quantity}</td>
      <td class="p-3">${((item.product.price+item.product.weight*6930).toFixed()/10).toFixed()*10 * item.quantity}</td>
    </tr>`;
    // totalNum += item.quantity/2;
    // if(item.product.weight*soldPrice===0){
    //   return;
    // }else{
    //   totalPrice += ((item.product.price+item.product.weight*soldPrice).toFixed()/10).toFixed()*10 * item.quantity ;
    // }
    totalNum += item.quantity;
        totalPrice += ((item.product.price+item.product.weight*6930).toFixed()/10).toFixed()*10 * item.quantity ;
    });
  cartList.innerHTML = str;
  //計算商品總數量
  cartTotalNum.textContent = `商品數量：總共 ${totalNum} 件`;
  cartTotalPrice.textContent = `總金額：NT$${totalPrice}`;
}

//顧客資料
//validate
let constraints = {
  訂購人姓名: {
    presence: {
      message: "必填",
    },
  },
  電子信箱: {
    presence: {
      message: "必填",
    },
    email: {
      message: "格式有誤",
    },
  },
  聯絡電話: {
    presence: {
      message: "必填",
    },
    length: {
      minimum: 8,
      message: "號碼需超過 8 碼",
    },
  },
  收件地址: {
    presence: {
      message: "必填",
    },
  }
};

const form = document.querySelector("form");
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const tel=document.querySelector(".tel");
const address = document.querySelector(".address");
const pay=document.querySelector(".pay");
const remark=document.querySelector(".remark");
const confirmBtn=document.querySelector(".confirm-btn");
const errorMessage = document.querySelectorAll(".error-message");
let hour=today.getHours();//時
let minute=today.getMinutes();//分

confirmBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let error = validate(form, constraints);
  if (error) {
    showErrors(error);
  } else {
    location.href="confirmOrder.html";
    localStorage.setItem("time",`${year}/${month}/${date} ${hour}:${minute}`);
    localStorage.setItem("name",name.value.trim());
    localStorage.setItem("email",email.value.trim());
    localStorage.setItem("tel",tel.value.trim());
    localStorage.setItem("address",address.value.trim());
    localStorage.setItem("pay",pay.value);
    localStorage.setItem("remark",remark.value.trim());
  }
});


function showErrors(errors) {
  errorMessage.forEach(function (item) {
    if (errors[item.dataset.msg] === undefined) {
      return;
    } else if (errors[item.dataset.msg]) {
      item.innerHTML = `<i class="bi bi-exclamation-circle me-1"></i>${
        errors[item.dataset.msg]
      }`;
    }
  });
}
