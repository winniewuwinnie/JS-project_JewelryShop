//如果點選登出
const logout = document.querySelectorAll(".logout");
logout.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("token");    
    localStorage.removeItem("userId");
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