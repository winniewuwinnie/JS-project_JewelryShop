const baseUrl = "https://json-server-vercel-teal-seven.vercel.app/";
// const baseUrl = "http://localhost:3000/";

//validate
let constraints = {
  電子信箱: {
    presence: {
      message: "必填",
    },
    email: {
      message: "格式有誤",
    },
  },
  帳號密碼: {
    presence: {
      message: "必填",
    },
    length: {
      minimum: 6,
      message: "至少6個字元",
    },
  },
};
const form = document.querySelector("form");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const errorMessage = document.querySelectorAll(".error-message");
const loginBtn = document.querySelector(".login-btn");
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let error = validate(form, constraints);
  if (error) {
    showErrors(error);
  } else {
    let loginData = {
      "email": email.value.trim(),
      "password": password.value.trim()
    }
    login(loginData);
  }
});

function showErrors(errors) {
  errorMessage.forEach(function (item) {
    if (errors[item.dataset.msg] === undefined) {
      return;
    } else if (errors[item.dataset.msg]) {
      item.innerHTML = `<i class="bi bi-exclamation-circle me-1"></i>${
        errors[item.dataset.msg]
      }`;
    }
  });
}

function login(loginData) {
  axios
    .post(`${baseUrl}login`, loginData)
    .then(function (response) {
      console.log(response);
      console.log(response.data.user.id)
      let token=response.data.accessToken;
      localStorage.setItem("token",token);
      let userId=response.data.user.id;
      localStorage.setItem("userId",userId)
      swal({
        title: "歡迎回來!",
        text: "3秒後返回首頁",
        icon: "success",
      });
      setTimeout(function(){
        location.href="index.html"},3000);
    })
    .catch(function (error) {
      // console.log(error)
      if(error.response.data==="Incorrect password"){
        swal({
          title: "密碼錯誤",
          text: "請重新輸入",
          icon: "error",
        });
        password.value="";
      }else if(error.response.data==="Cannot find user"){
        swal({
          text: "帳號尚未註冊，請先註冊會員",
          icon: "info"});
          // setTimeout(function(){
          //   location.href="register.html"},3000);
      };
    });
}
