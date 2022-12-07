// const baseUrl = "https://json-server-vercel-ebon.vercel.app/";
const baseUrl = "http://localhost:3000/";

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
      // console.log(response);
      alert("登入成功");
      location.href="index.html";
    })
    .catch(function (error) {
      // console.log(error)
      if(error.response.data==="Incorrect password"){
        alert("密碼輸入錯誤");
        password.value="";
      }else if(error.response.data==="Cannot find user"){
        alert("此帳號尚未註冊，請先註冊");
        location.href="register.html";
      };
    });
}
