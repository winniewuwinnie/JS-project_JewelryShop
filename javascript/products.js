const baseUrl = "https://json-server-vercel-ebon.vercel.app/";
// const baseUrl = "http://localhost:3000/";

//初始化畫面
function init(){
  getAllProductsData();
};
init();

const menu=document.querySelector(".menu");
const productsList=document.querySelector(".products-list");




//取得全部商品
let allProductsData;
function getAllProductsData(){
  axios.get(`${baseUrl}products`)
  .then(function(response){
    allProductsData=response.data;
    renderProductsData(allProductsData);
  })
  .catch(function(error){
    console.log(error)
  })
}
//渲染商品
function renderProductsData(data){
  let str="";
  data.forEach(function(item){
    str+=`<div class="col-lg-4 col-md-6">
    <div
    class="rounded-3 mb-3 position-relative"
    style="
    background-image: url('${item.imgUrl}');
    max-width: 100%;
    height: 312px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    "
    ><a href="#" title="加入為收藏！" class="position-absolute end-5 top-5"
    ><i class="fa-regular fa-heart fs-6"></i
    ></a>
    </div>
    <h4 class="border-bottom border-primary pb-2 mb-2 fw-bold fs-5 text-center">
    ${item.title}
    </h4>
    <div class="d-flex justify-content-between align-items-end">
    <div>
    <span class="fs-6 text-start fw-bold me-1">NT$${item.price}</span>
    <span class="text-decoration-line-through text-originalPrice text-start mb-2">NT$${item.originPrice}</span>
    </div>
    <a
    href="#"
    class="btn btn-outline-primary rounded-pill"
    title="心動不如馬上行動！"
    >加入購物車</a
    >
    </div>
    </div>`
  });
  productsList.innerHTML=str;
}

//點選側選單
menu.addEventListener("click",function(e){
  e.preventDefault();
  let targetText=e.target.textContent
  // location.href="products.html?category=necklace";
  if(targetText==="全部"){
    getAllProductsData()
  }else if(targetText==="熱銷商品"){
    let hotSalesProductsData=allProductsData.filter(function(item){
      return item.remark==="hotSales";
    })
    renderProductsData(hotSalesProductsData);
  }else if(targetText==="最新商品"){
    let newProductsData=allProductsData.filter(function(item){
      return item.remark==="new";
    })
    renderProductsData(newProductsData);
  }else if(targetText==="日常配戴"){
    return;
  }else if(targetText==="項鍊"){
    let necklacesData=allProductsData.filter(function(item){
      return item.category==="necklace";
    })
    renderProductsData(necklacesData);
  }else if(targetText==="耳環"){
    let earingsData=allProductsData.filter(function(item){
      return item.category==="earing";
    })
    renderProductsData(earingsData);
  }else if(targetText==="戒指"){
    let ringsData=allProductsData.filter(function(item){
      return item.category==="ring";
    })
    renderProductsData(ringsData);
  }else if(targetText==="墜飾"){
    let pendantsData=allProductsData.filter(function(item){
      return item.category==="pendant";
    })
    renderProductsData(pendantsData);
  }else if(targetText==="手鍊"){
    let braceletsData=allProductsData.filter(function(item){
      return item.category==="bracelet";
    })
    renderProductsData(braceletsData);
  }
})