const baseUrl = "https://json-server-vercel-teal-seven.vercel.app/";
// const baseUrl = "http://localhost:3000/";

AOS.init();

let userId=parseInt(localStorage.getItem("userId"));

//取得當天日期
let today = new Date(); //Tue Dec 13 2022 15:10:45 GMT+0800 (台北標準時間)
let year = today.getFullYear(); //年
let month = today.getMonth() + 1; //月
let date = today.getDate(); //日
if (date.toString().length === 1) {
  date = `0${date}`;
}
let todayStr=`${year}-${month}-${date}`;//2022-12-13

//初始化畫面
function init() {  
  getGoldPrice();
  getExchangeRate();
}
init();

const menu = document.querySelector(".menu");
const productsList = document.querySelector(".products-list");


//取得最新黃金價格(美元)
let goldPriceData;
let goldPrice;
function getGoldPrice() {
  axios.get(
    `https://api.finmindtrade.com/api/v4/data?dataset=GoldPrice&start_date=2022-12-12&end_date=${todayStr}`
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




//取得全部商品
let allProductsData;
function getAllProductsData() {
  axios
  .get(`${baseUrl}products`)
    .then(function (response) {
      allProductsData = response.data;
      renderProductsData(allProductsData,soldPrice);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  


//關鍵字搜尋
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let productsTitle = [];
  let searchProductsData = [];
  if (searchInput.value === "") {
    swal({
      text:"請輸入搜尋內容",
      icon:"info"});
    return;
  } else {
    allProductsData.forEach(function (item) {
      productsTitle.push(item.title);
    });
    productsTitle.forEach(function (title) {
      if (title.match(searchInput.value.trim())) {
        allProductsData.forEach(function (item) {
          if (item.title === title) {
            searchProductsData.push(item);
          }
        });
      } 
    });
    if(searchProductsData.length===0){
      swal({
        title: "查無此商品",
        icon: "error",
      });
    }else{
      renderProductsData(searchProductsData);
    }
    searchInput.value = "";
  }
});

  //渲染最新金價
  let soldPrice="";
  function renderGoldPrice(goldPrice,exchangeRate){
    if(goldPrice&&exchangeRate){ 
    soldPrice=((goldPrice*exchangeRate/8.29426).toFixed()/10).toFixed()*10+360;
    renderProductsData(allProductsData,soldPrice)
  }
}
  
  //渲染商品
  function renderProductsData(data,soldPrice) {
  let str = "";
  data.forEach(function (item) {
    if (item.remark === "") {
      str += `<div class="col-lg-4 col-md-6">
      <div class="position-relative">
        <a
          href="productInfo.html?id=${item.id}"
          class="d-block rounded-3 mb-3 bg-position-center bg-size-cover bg-repeat-none"
          style="
            background-image: url('${item.imgUrl}');
            max-width: 100%;
            height: 312px;
          "
        ></a>
        <a href="#" title="加入為收藏！" class="position-absolute top-0 end-0 m-4 me-3"
          ><i class="fa-regular fa-heart fs-6" data-btn="favorite" data-productid="${item.id}"></i
        ></a>
      </div>
      <h4
        class="border-bottom border-primary pb-2 mb-2 fw-bold fs-5 text-center"
      >
        ${item.title}
      </h4>
      <div class="d-flex justify-content-between align-items-end">
        <div>
          <span class="fs-6 text-start fw-bold me-1">NT$${((item.price+item.weight*6930).toFixed()/10).toFixed()*10}</span>
          <span
            class="text-decoration-line-through text-originalPrice text-start mb-2"
            >NT$${((item.originPrice+item.weight*6930).toFixed()/10).toFixed()*10}</span
          >
        </div>
        <button
          class="btn btn-outline-primary rounded-pill"
          title="心動不如馬上行動！" data-btn="add-cart" data-id="${item.id}"
          >加入購物車</button
        >
      </div>
    </div>`;
    } else if (item.remark === "熱銷") {
      str += `<div class="col-lg-4 col-md-6">
      <div class="position-relative">
        <a
          href="productInfo.html?id=${item.id}"
          class="d-block rounded-3 mb-3 bg-position-center bg-size-cover bg-repeat-none"
          style="
            background-image: url('${item.imgUrl}');
            max-width: 100%;
            height: 312px;
          "
        ></a>
        <div class="d-flex justify-content-between align-items-center position-absolute top-0 w-100 p-2 pe-3">
          <p class="fs-6 text-nowrap bg-size-contain bg-repeat-none bg-position-center mb-0 p-3"
              style="background-image: url('./images/hotSales.svg');">${item.remark}</p>
          <a href="#" title="加入為收藏！"
            ><i class="fa-regular fa-heart fs-6" data-btn="favorite" data-productid="${item.id}"></i
          ></a>
        </div>
      </div>
      <h4
        class="border-bottom border-primary pb-2 mb-2 fw-bold fs-5 text-center"
      >
      ${item.title}
      </h4>
      <div class="d-flex justify-content-between align-items-end">
        <div>
          <span class="fs-6 text-start fw-bold me-1">NT$${((item.price+item.weight*6930).toFixed()/10).toFixed()*10}</span>
          <span
            class="text-decoration-line-through text-originalPrice text-start mb-2"
            >NT$${((item.originPrice+item.weight*6930).toFixed()/10).toFixed()*10}</span
          >
        </div>
        <button
          class="btn btn-outline-primary rounded-pill"
          title="心動不如馬上行動！" data-btn="add-cart" data-id="${item.id}"
          >加入購物車</button
        >
      </div>
    </div>`;
    } else if (item.remark === "新品") {
      str += `<div class="col-lg-4 col-md-6">
      <div class="position-relative">
        <a
          href="productInfo.html?id=${item.id}"
          class="d-block rounded-3 mb-3 bg-position-center bg-size-cover bg-repeat-none"
          style="
            background-image: url('${item.imgUrl}');
            max-width: 100%;
            height: 312px;
          "
        ></a>
        <div class="d-flex justify-content-between align-items-center position-absolute top-0 w-100 p-2 pe-3">
          <p class="fs-6 text-nowrap bg-size-contain bg-repeat-none bg-position-center mb-0 p-3"
              style="background-image: url('./images/hotSales.svg');">${item.remark}</p>
          <a href="#" title="加入為收藏！"
            ><i class="fa-regular fa-heart fs-6" data-btn="favorite" data-productid="${item.id}"></i
          ></a>
        </div>
      </div>
      <h4
        class="border-bottom border-primary pb-2 mb-2 fw-bold fs-5 text-center"
      >
      ${item.title}
      </h4>
      <div class="d-flex justify-content-between align-items-end">
        <div>
          <span class="fs-6 text-start fw-bold me-1">NT$${((item.price+item.weight*6930).toFixed()/10).toFixed()*10}</span>
          <span
            class="text-decoration-line-through text-originalPrice text-start mb-2"
            >NT$${((item.originPrice+item.weight*6930).toFixed()/10).toFixed()*10}</span
          >
        </div>
        <button
          class="btn btn-outline-primary rounded-pill"
          title="心動不如馬上行動！" data-btn="add-cart" data-id="${item.id}"
          >加入購物車</button
        >
      </div>
    </div>`;
    }
  });
  productsList.innerHTML = str;
}

//點選側選單
menu.addEventListener("click", function (e) {
  e.preventDefault();
  let targetText = e.target.textContent;
  if (targetText === "全部") {
    getAllProductsData();
  } else if (targetText === "熱銷商品") {    
    // location.href="products.html?remark=熱銷";
    let hotSalesProductsData = allProductsData.filter(function (item) {
      return item.remark === "熱銷";
    });
    renderProductsData(hotSalesProductsData,soldPrice);
  } else if (targetText === "最新商品") {
    // location.href="products.html?remark=新品";
    let newProductsData = allProductsData.filter(function (item) {
      return item.remark === "新品";
    });
    renderProductsData(newProductsData,soldPrice);
  } else if (targetText === "日常配戴") {
    return;
  } else if (targetText === "項鍊") {
    // location.href="products.html?category=necklace";
    let necklacesData = allProductsData.filter(function (item) {
      return item.category === "necklace";
    });
    renderProductsData(necklacesData,soldPrice);
  } else if (targetText === "耳環") {
    // location.href="products.html?category=earing";
    let earingsData = allProductsData.filter(function (item) {
      return item.category === "earing";
    });
    renderProductsData(earingsData,soldPrice);
  } else if (targetText === "戒指") {
    // location.href="products.html?category=ring";
    let ringsData = allProductsData.filter(function (item) {
      return item.category === "ring";
    });
    renderProductsData(ringsData,soldPrice);
  } else if (targetText === "墜飾") {
    // location.href="products.html?category=pendant";
    let pendantsData = allProductsData.filter(function (item) {
      return item.category === "pendant";
    });
    renderProductsData(pendantsData,soldPrice);
  } else if (targetText === "手鍊") {
    // location.href="products.html?category=bracelet";
    let braceletsData = allProductsData.filter(function (item) {
      return item.category === "bracelet";
    });
    renderProductsData(braceletsData,soldPrice);
  }
});

//判斷網址
let categoryData;
if(location.href.split("=")[1]===undefined){
  getAllProductsData();}
  else if (location.href.split("=")[1]) {
    let category = location.href.split("=")[1];
    let type=location.href.split("?")[1].split("=")[0];
    axios
    .get(`${baseUrl}products?${type}=${category}`)
    .then(function (response) {
      categoryData=response.data;
      console.log(categoryData)
      renderProductsData(categoryData,soldPrice);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// let category = location.href.split("=")[1];
// let type=location.href.split("?")[1].split("=")[0];
// //網址為products.html時
// if(location.href.split("?")[1]===undefined){
//   getAllProductsData();
// //網址為products.html?xx=xx時
// }else if(location.href.split("?")[1].split("=")[1]){
//   //新品或熱銷
//   if(location.href.split("?")[1].split("=")[0]==="remark"){
//     axios
//     .get(`${baseUrl}products?${type}=${category}`)
//     .then(function (response) {
//       categoryData=response.data;
//       console.log(categoryData)
//       renderProductsData(categoryData);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//     //產品類別
//   }else if(location.href.split("?")[1].split("=")[0]==="category"){
//     axios
//     .get(`${baseUrl}products?${type}=${category}`)
//     .then(function (response) {
//       categoryData=response.data;
//       console.log(categoryData)
//       renderProductsData(categoryData);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }
//   //關鍵字搜尋
//   else if(location.href.split("?")[1].split("=")[0]==="title"){
//   let productsTitle = [];
//   let searchProductsData = [];
//   allProductsData.forEach(function (item) {
//     productsTitle.push(item.title);
//   });
//   productsTitle.forEach(function (title) {
//     if (title.match(searchInput.value.trim())) {
//       allProductsData.forEach(function (item) {
//         if (item.title === title) {
//           searchProductsData.push(item);
//         } 
//       });
//       renderProductsData(searchProductsData);
//     } 
//   });
//   }
// }


//收藏商品
productsList.addEventListener("click",function(e){
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
      e.target.setAttribute("class","fa-sharp fa-solid fa-heart fs-6")
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
productsList.addEventListener("click", function (e) {
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
      if (target.btn === "add-cart") {
        getCartsData(target);
      }
    }
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
      // //如果購物車內原本為空
      // if (cartsData.length === 0) {
      //   addCart(cartItem);
      // }
      // //如果購物車內原本有產品
      // else {
      //   console.log(cartItem.productId)
      //   cartsData.forEach(function (item) {
      //     console.log(item.id)
      //     //準備要加入的商品購物車內原本沒有
      //     if (cartObj[cartItem.productId] === undefined) {
      //       cartObj[cartItem.productId] = 1;
      //       // cartObj.cartId=item.id;
      //       //準備要加入的商品購物車內原本有
      //     } else if(cartObj[cartItem.productId]) {
      //       cartObj[cartItem.productId] += 1;
      //     }
      //     // console.log(obj[item.productId]);
      //   });
      //   console.log(cartObj);
      //   if (cartObj[cartItem.productId] === undefined) {
      //     addCart(cartItem);
      //   } else if (cartObj[cartItem.productId]) {
      //     productId=cartItem.productId;
      //     quantity=cartObj[cartItem.productId];
      //     console.log(quantity)
      //     patchCart(quantity);
      //   }
      // }
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




// //修改購物車內產品數量
// function patchCart(quantity) {
//   axios
//     .patch(`${baseUrl}carts/1`, {"quantity":quantity})
//     .then(function (response) {
//       console.log(response);
//       alert("成功加入購物車")
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }