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
    if(item.remark===""){
      str+=`<div class="col-lg-4 col-md-6">
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
          ><i class="fa-regular fa-heart fs-6"></i
        ></a>
      </div>
      <h4
        class="border-bottom border-primary pb-2 mb-2 fw-bold fs-5 text-center"
      >
        ${item.title}
      </h4>
      <div class="d-flex justify-content-between align-items-end">
        <div>
          <span class="fs-6 text-start fw-bold me-1">NT$${item.price}</span>
          <span
            class="text-decoration-line-through text-originalPrice text-start mb-2"
            >NT$${item.originPrice}</span
          >
        </div>
        <a
          href="#"
          class="btn btn-outline-primary rounded-pill"
          title="心動不如馬上行動！"
          >加入購物車</a
        >
      </div>
    </div>`;
    }else if(item.remark==="熱銷"){
      str+=`<div class="col-lg-4 col-md-6">
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
            ><i class="fa-regular fa-heart fs-6"></i
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
          <span class="fs-6 text-start fw-bold me-1">NT$${item.price}</span>
          <span
            class="text-decoration-line-through text-originalPrice text-start mb-2"
            >NT$${item.originPrice}</span
          >
        </div>
        <a
          href="#"
          class="btn btn-outline-primary rounded-pill"
          title="心動不如馬上行動！"
          >加入購物車</a
        >
      </div>
    </div>`;
    }else if(item.remark==="新品"){
      str+=`<div class="col-lg-4 col-md-6">
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
            ><i class="fa-regular fa-heart fs-6"></i
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
          <span class="fs-6 text-start fw-bold me-1">NT$${item.price}</span>
          <span
            class="text-decoration-line-through text-originalPrice text-start mb-2"
            >NT$${item.originPrice}</span
          >
        </div>
        <a
          href="#"
          class="btn btn-outline-primary rounded-pill"
          title="心動不如馬上行動！"
          >加入購物車</a
        >
      </div>
    </div>`;
    }
  });
  productsList.innerHTML=str;
}

//點選側選單
menu.addEventListener("click",function(e){
  e.preventDefault();
  let targetText=e.target.textContent
  if(targetText==="全部"){
    getAllProductsData()
  }else if(targetText==="熱銷商品"){
    let hotSalesProductsData=allProductsData.filter(function(item){
      return item.remark==="熱銷";
    })
    renderProductsData(hotSalesProductsData);
  }else if(targetText==="最新商品"){
    let newProductsData=allProductsData.filter(function(item){
      return item.remark==="新品";
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

//從首頁熱門分類過來
const category=location.href.split("=")[1];
if(location.href.split("=")[1])
axios.get(`${baseUrl}products?category=${category}`)
.then(function(response){
  // console.log(response.data)
  renderProductsData(response.data)
})
.catch(function(error){
  console.log(error)
})