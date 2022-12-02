//priceInformation
//黃金回收試算
const goldWeight = document.querySelector(".goldWeight");
const goldPrice = document.querySelector(".goldPrice");
goldWeight.addEventListener("keyup", function (e) {
  if (goldWeight.value < 0) {
    alert("請輸入正確數值");
    goldWeight.value = "";
    return;
  } else {
    goldPrice.value = (Number(goldWeight.value) * 6530).toFixed();
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


