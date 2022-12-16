const baseUrl = "https://json-server-vercel-teal-seven.vercel.app/";
// const baseUrl = "http://localhost:3000/";

//畫面初始化
let userId = parseInt(localStorage.getItem("userId"));
function init() {
  getFavoriteData();
}
init();

//取得會員最愛典藏
const favoriteList = document.querySelector(".favorite-list");
let data;
function getFavoriteData() {
  axios
    .get(`${baseUrl}bookmarks?_expand=product`)
    .then(function (response) {
      data = response.data;
      let favoriteData = data.filter(function (item) {
        if (item.userId === userId) {
          return item;
        }
      });
      renderFavoriteData(favoriteData);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//渲染會員最愛典藏
function renderFavoriteData(favoriteData) {
  let str = "";
  if (favoriteData.length === 0) {
    str = `<p class="fs-5 text-center py-6">您尚無收藏任何商品</p>`;
  } else {
    favoriteData.forEach(function (item) {
      if (item.product.remark === "") {
        str += `<div class="col-lg-4 col-md-6">
        <div class="position-relative">
          <a
            href="productInfo.html?id=${item.product.id}"
            class="d-block rounded-3 mb-3 bg-position-center bg-size-cover bg-repeat-none"
            style="
              background-image: url('${item.product.imgUrl}');
              max-width: 100%;
              height: 312px;
            "
          ></a>
          <a href="#" class="position-absolute top-0 end-0 m-4 me-3" data-id="${item.id}"
            ><i class="fa-sharp fa-solid fa-heart fs-6"></i
          ></a>
        </div>
        <h4
          class="border-bottom border-primary pb-2 mb-2 fw-bold fs-5 text-center"
        >
          ${item.product.title}
        </h4>
        <div class="d-flex justify-content-between align-items-end">
          <div>
            <span class="fs-6 text-start fw-bold me-1">NT$${item.product.price}</span>
            <span
              class="text-decoration-line-through text-originalPrice text-start mb-2"
              >NT$${item.product.originPrice}</span
            >
          </div>
          <button
            class="btn btn-outline-primary rounded-pill"
            title="心動不如馬上行動！" data-btn="add-cart" data-id="${item.product.id}"
            >加入購物車</button
          >
        </div>
      </div>`;
      } else if (item.product.remark === "熱銷") {
        str += `<div class="col-lg-4 col-md-6">
        <div class="position-relative">
          <a
            href="productInfo.html?id=${item.product.id}"
            class="d-block rounded-3 mb-3 bg-position-center bg-size-cover bg-repeat-none"
            style="
              background-image: url('${item.product.imgUrl}');
              max-width: 100%;
              height: 312px;
            "
          ></a>
          <div class="d-flex justify-content-between align-items-center position-absolute top-0 w-100 p-2 pe-3">
            <p class="fs-6 text-nowrap bg-size-contain bg-repeat-none bg-position-center mb-0 p-3"
                style="background-image: url('./images/hotSales.svg');">${item.product.remark}</p>
            <a href="#"><i class="fa-sharp fa-solid fa-heart fs-6" data-id="${item.id}"></i
            ></a>
          </div>
        </div>
        <h4
          class="border-bottom border-primary pb-2 mb-2 fw-bold fs-5 text-center"
        >
        ${item.product.title}
        </h4>
        <div class="d-flex justify-content-between align-items-end">
          <div>
            <span class="fs-6 text-start fw-bold me-1">NT$${item.product.price}</span>
            <span
              class="text-decoration-line-through text-originalPrice text-start mb-2"
              >NT$${item.product.originPrice}</span
            >
          </div>
          <button
            class="btn btn-outline-primary rounded-pill"
            title="心動不如馬上行動！" data-btn="add-cart" data-id="${item.product.id}"
            >加入購物車</button
          >
        </div>
      </div>`;
      } else if (item.product.remark === "新品") {
        str += `<div class="col-lg-4 col-md-6">
        <div class="position-relative">
          <a
            href="productInfo.html?id=${item.product.id}"
            class="d-block rounded-3 mb-3 bg-position-center bg-size-cover bg-repeat-none"
            style="
              background-image: url('${item.product.imgUrl}');
              max-width: 100%;
              height: 312px;
            "
          ></a>
          <div class="d-flex justify-content-between align-items-center position-absolute top-0 w-100 p-2 pe-3">
            <p class="fs-6 text-nowrap bg-size-contain bg-repeat-none bg-position-center mb-0 p-3"
                style="background-image: url('./images/hotSales.svg');">${item.product.remark}</p>
            <a href="#"><i class="fa-sharp fa-solid fa-heart fs-6" data-id="${item.id}"></i
            ></a>
          </div>
        </div>
        <h4
          class="border-bottom border-primary pb-2 mb-2 fw-bold fs-5 text-center"
        >
        ${item.product.title}
        </h4>
        <div class="d-flex justify-content-between align-items-end">
          <div>
            <span class="fs-6 text-start fw-bold me-1">NT$${item.product.price}</span>
            <span
              class="text-decoration-line-through text-originalPrice text-start mb-2"
              >NT$${item.product.originPrice}</span
            >
          </div>
          <button
            class="btn btn-outline-primary rounded-pill"
            title="心動不如馬上行動！" data-btn="add-cart" data-id="${item.product.id}"
            >加入購物車</button
          >
        </div>
      </div>`;
      }
    });
  }
  favoriteList.innerHTML = str;
}

//移除最愛典藏
favoriteList.addEventListener("click", function (e) {
  console.log(e.target);
  let bookmarkId = e.target.dataset.id;
  delFavoriteItem(bookmarkId);
});
function delFavoriteItem(bookmarkId) {
  axios
    .delete(`${baseUrl}bookmarks/${bookmarkId}`)
    .then(function (response) {
      // console.log(response);
      alert("移除成功！");
    })
    .catch(function (error) {
      console.log(error);
    });
}

//如果點選登出
const logout = document.querySelectorAll(".logout");
logout.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("token");
    swal({
      title: "登出成功!",
      text: "3秒後返回首頁",
      icon: "success",
    });
    setTimeout(function () {
      location.href = "index.html";
    }, 3000);
  });
});
// http://localhost:3000/bookmarks/1?_expand=product
