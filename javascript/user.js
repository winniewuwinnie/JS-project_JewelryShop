const baseUrl = "https://json-server-vercel-teal-seven.vercel.app/";
// const baseUrl = "http://localhost:3000/";

//取得用戶資料
let userId = localStorage.getItem("userId");
let userData;
function getUserData() {
  axios
    .get(`${baseUrl}users/${userId}`)
    .then(function (response) {
      userData = response.data;
      renderUserData(userData);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getUserData();

//渲染用戶資料
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const tel = document.querySelector(".tel");
const address = document.querySelector(".address");
function renderUserData(userData) {
  name.value = userData.username.trim();
  email.value = userData.email.trim();
  tel.value = userData.tel.trim();
  address.value = userData.address.trim();
}

//修改用戶資料
let token = localStorage.getItem("token");
const reviseBtn = document.querySelector(".revise-btn");
reviseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let target = e.target.dataset.btn;
  if (target === "revise") {
    updateUserData();
  } else if (target === "no-revise") {
    renderUserData(userData);
  }
});
function updateUserData() {
  axios
    .patch(
      `${baseUrl}users/${userId}`,
      {
        username: name.value.trim(),
        email: email.value.trim(),
        tel: tel.value.trim(),
        address: address.value.trim(),
        password:"12345678"
      },
      // { headers: `Bearer ${token}` }
    )
    .then(function (response) {
      console.log(response);
      alert("修改成功")
    })
    .catch(function (error) {
      console.log(error);
    });
}

//如果點選登出
const logout = document.querySelector(".logout");
logout.addEventListener("click", function (e) {
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