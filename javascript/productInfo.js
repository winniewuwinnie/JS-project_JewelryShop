const baseUrl = "https://json-server-vercel-teal-seven.vercel.app/";
// const baseUrl = "http://localhost:3000/";

let productId = location.href.split("=")[1];

//畫面初始化
function init() {
  getProductInfoData();
}
init();

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
            >NT$${item.price}</span
            >
            <span
            class="fs-6 text-decoration-line-through text-primary text-start"
            >NT$${item.originPrice}</span
            >
          </div>
          <div class="d-flex flex-column flex-md-row">
            <a
              href="#"
              class="btn btn-outline-primary rounded-pill me-3 w-md-50 w-100 fs-6 mb-3 mb-md-0"
              >加入收藏<i class="fa-regular fa-heart ms-1"></i
            ></a>
            <a
              href="#"
              class="btn btn-outline-primary rounded-pill w-md-50 w-100 fs-6" data-btn="addCart"
              title="心動不如馬上行動！"
              >加入購物車<i class="bi bi-bag ms-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>`;
  });
  productInfo.innerHTML = str;
}

//加入購物車
productInfo.addEventListener("click", function (e) {
  e.preventDefault();
  let target = e.target.dataset.btn;
  if (target === undefined) {
    return;
  } else if (target === "addCart") {
    let cartItemData = {
      quantity: 1,
      productId: productId,
    };
    // console.log(cartItemData)
    addCart(cartItemData);
  }
});

let cartsData;
function addCart(cartItemData) {
  axios
    .get(`${baseUrl}carts`)
    .then(function (response) {
      // cartItemData.productId
      cartsData = response.data;
      cartsData.forEach(function (item) {
        if (item.productId === undefined) {
          postCartProduct(cartItemData);
        } else if (item.productId === cartItemData.productId) {
          let cartQuantity=item.quantity;
          cartQuantity+=1;
          let patchCartItemData={
            quantity: cartQuantity,
            productId: productId,
          }
          patchCartProductNum(patchCartItemData);
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

//新增購物車中產品
function postCartProduct() {
  axios
    .post(`${baseUrl}carts`, cartItemData)
    .then(function (response) {
      console.log(response);
      alert("成功加入購物車！");
    })
    .catch(function (error) {
      console.log(error);
    });
}

//修改購物車中產品數量
function patchCartProductNum(patchCartItemData) {
  axios
    .patch(`${baseUrl}carts`,patchCartItemData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//數量增減
// const orderNum=document.querySelector(".order-num");
// console.log(orderNum)
// const orderNumInput=document.querySelector(".order-num-input");
// productInfo.addEventListener("click",function(e){
//   let target=e.target.dataset.btn;
//   let num=Number(orderNumInput.value);
//   if(target===undefined){
//     return;
//   }else{
//     if(target==="plus"){
//       num+=1;
//     }else if(target==="minus"){
//       if(num>0){
//         num-=1;
//       }else if(num<=0){
//         alert("訂購數量不可小於0件");
//         return;
//       }
//     }
//     orderNumInput.value=num;
//   }
// })
