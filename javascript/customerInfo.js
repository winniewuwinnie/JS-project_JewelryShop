const baseUrl = "https://json-server-vercel-teal-seven.vercel.app/";
// const baseUrl = "http://localhost:3000/";

let userId=parseInt(localStorage.getItem("userId"));

//畫面初始化
function init(){
  getCartsData();
}
init();

//取得購物車資料
let cartsData;
function getCartsData(){
  axios.get(`${baseUrl}carts?_expand=product`)
  .then(function(response){
    cartsData=response.data;
    cartsData=cartsData.filter(function(item){
      return item.userId===userId;
    })
    renderCartsData(cartsData)
  })
  .catch(function(error){
    console.log(error);
  })
}

//渲染購物車資料
const cartList=document.querySelector(".cart-list");
const cartTotalNum=document.querySelector(".cart-total-num");
const cartTotalPrice=document.querySelector(".cart-total-price");
let totalNum=0;
let totalPrice=0;
function renderCartsData(cartsData){
  let str="";
  if(cartsData.length===0){
    str=`<tr><th colspan="5" class="text-center">購物車內尚無任何商品</th></tr>`
  }else{
    cartsData.forEach(function(item){
      totalNum+=item.quantity;
      totalPrice+=item.product.price*item.quantity;
      str+=`<tr>
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
      <td class="p-3">${item.quantity}</td>
      <td class="p-3">NT$${item.product.price*item.quantity}</td>
    </tr>`;
    })
  }
  cartList.innerHTML=str;
//計算商品總數量
cartTotalNum.textContent=`商品數量：總共 ${totalNum} 件`;
cartTotalPrice.textContent=`總金額：NT$${totalPrice}`;
}

//收件地址
const twzipcode = new TWzipcode(".twzipcode");

// twzipcode.set({
//   // 縣市
//   county: {
//     label: 縣市, // (string) 預設 `縣市`
//     css: (width:50%,) // (string)
//     required: true,// 是否為表單必須
//   },
//   // 鄉鎮市區
//   district: {
//     label: 鄉鎮市區, // (string) 預設 `鄉鎮市區`
//     css: "CSS 樣式", // (string)
//     required: true, // 是否為表單必須
//     },
// });