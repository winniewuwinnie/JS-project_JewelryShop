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
}
init();

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
      renderGoldPrice(goldPrice,exchangeRate)
    })
    .catch(function (error) {
      console.log(error);
    });
}

//渲染最新金價
const buyPrice=document.querySelector(".buy-price");
const soldPrice=document.querySelector(".sold-price");
let newestPrice;
function renderGoldPrice(goldPrice,exchangeRate){
  if(goldPrice&&exchangeRate){ 
  newestPrice=((goldPrice*exchangeRate/8.29426).toFixed()/10).toFixed()*10;
  buyPrice.textContent=`NT$${newestPrice+360}/錢`;
  soldPrice.textContent=`NT$${newestPrice-240}/錢`;
  }
}


//黃金回收試算
const calGoldWeight = document.querySelector(".goldWeight");
const calGoldPrice = document.querySelector(".goldPrice");
calGoldWeight.addEventListener("keyup", function (e) {
  if (calGoldWeight.value < 0) {
    alert("請輸入正確數值");
    calGoldWeight.value = "";
    return;
  } else {
    calGoldPrice.value = (Number(calGoldWeight.value) * (newestPrice-240)).toFixed();
  }
});


//單位換算
const unit = document.querySelector(".unit");
const g = document.querySelector(".g");
const kg = document.querySelector(".kg");
const tkg = document.querySelector(".tkg");
const tl = document.querySelector(".tl");
const oz = document.querySelector(".oz");
unit.addEventListener("keyup", function (e) {
  //判斷輸入數值為正數或負數
  if (
    g.value < 0 ||
    kg.value < 0 ||
    tkg.value < 0 ||
    tl.value < 0 ||
    oz.value < 0
  ) {
    alert("請輸入正確數值");
    g.value = "";
    kg.value = "";
    tkg.value = "";
    tl.value = "";
    oz.value = "";
    return;
  } else {
    //在公克輸入數值
    if (e.target.dataset.unit === "g") {
      let gValue = Number(e.target.value);
      kg.value = (gValue * 0.001).toFixed(2);
      tkg.value = (gValue * 0.26667).toFixed(2);
      tl.value = (gValue * 0.02667).toFixed(2);
      oz.value = (gValue * 0.03215).toFixed(2);
    }
    //在公斤輸入數值
    else if (e.target.dataset.unit === "kg") {
      let kgValue = Number(e.target.value);
      g.value = (kgValue * 1000).toFixed(2);
      tkg.value = (kgValue * 266.66667).toFixed(2);
      tl.value = (kgValue * 26.66667).toFixed(2);
      oz.value = (kgValue * 32.15074).toFixed(2);
    }
    //在臺錢輸入數值
    else if (e.target.dataset.unit === "tkg") {
      let tkgValue = Number(e.target.value);
      g.value = (tkgValue * 3.75).toFixed(2);
      kg.value = (tkgValue * 0.00375).toFixed(2);
      tl.value = (tkgValue * 0.1).toFixed(2);
      oz.value = (tkgValue * 0.12057).toFixed(2);
    }
    //在臺兩輸入數值
    else if (e.target.dataset.unit === "tl") {
      let tlValue = Number(e.target.value);
      g.value = (tlValue * 37.5).toFixed(2);
      kg.value = (tlValue * 0.0375).toFixed(2);
      tkg.value = (tlValue * 10).toFixed(2);
      oz.value = (tlValue * 1.20565).toFixed(2);
    }
    //在盎司輸入數值
    else if (e.target.dataset.unit === "oz") {
      let ozValue = Number(e.target.value);
      g.value = (ozValue * 31.10348).toFixed(2);
      kg.value = (ozValue * 0.0311).toFixed(2);
      tkg.value = (ozValue * 8.29426).toFixed(2);
      tl.value = (ozValue * 0.82943).toFixed(2);
    }
  }
});


