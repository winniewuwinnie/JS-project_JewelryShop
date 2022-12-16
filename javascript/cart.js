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
      <td class="p-3">${item.product.price}</td>
      <td class="p-3 text-nowrap">
        <a href="#" class="link-dark"
          ><i class="fa-solid fa-plus me-3" data-status="plus" data-cartid=${item.id}></i
        ></a>
        <span class="me-3">${item.quantity}</span>
        <a href="#" class="link-dark"
          ><i class="fa-solid fa-minus" data-status="minus" data-cartid=${item.id}></i
        ></a>
      </td>
      <td class="p-3">${item.product.price*item.quantity}</td>
      <td>
        <a href="#" class="link-dark"
          ><i class="fa-solid fa-xmark fs-6" data-btn="delete" data-cartid=${item.id}></i
        ></a>
      </td>
    </tr>`;
    })
  }
  cartList.innerHTML=str;
//計算商品總數量
cartTotalNum.textContent=`商品數量：總共 ${totalNum} 件`;
cartTotalPrice.textContent=`總金額：NT$${totalPrice}`;
}

//增減商品數量
cartList.addEventListener("click",function(e){
  e.preventDefault();
  let target=e.target.dataset;
  let status=target.status;
  let cartId=target.cartid;
  if(target.status){
    axios.get(`${baseUrl}carts/${cartId}`)
    .then(function(response){
      let reviseQuantity=response.data.quantity;
      if(status==="plus"){
        reviseQuantity++;
      }else if(status==="minus"){
        if(reviseQuantity==1){
          alert("數量不可少於1件");
          return;
        }else{
          reviseQuantity--;
        }
      }
      patchProductNum(cartId,reviseQuantity)
    })
    .catch(function(error){
      console.log(error)
    })
  }
})
function patchProductNum(cartId,reviseQuantity){
  axios.patch(`${baseUrl}carts/${cartId}`,{quantity:reviseQuantity})
  .then(function(response){
    console.log(response);
  })
  .catch(function(error){
    console.log(error);
  })
}

//刪除商品
cartList.addEventListener("click",function(e){
  e.preventDefault();
  let target=e.target.dataset;
  let cartId=target.cartid;
  if(target.btn==="delete"){
    deleteCartItem(cartId);
  }else{
    return;
  }
})
function deleteCartItem(cartId){
  axios.delete(`${baseUrl}carts/${cartId}`)
  .then(function(response){
    console.log(response)
    alert("成功刪除該筆商品");
  })
  .catch(function(error){
    console.log(error);
  })
}

