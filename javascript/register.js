

const baseUrl = "https://json-server-vercel-ebon.vercel.app/";
// const baseUrl = "http://localhost:3000/";


//modal
var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

//validate
let constraints = {
  帳號名稱: {
    presence: {
      message: "必填",
    },
  },
  電子信箱: {
    presence: {
      message: "必填",
    },
    email: {
      message: "格式有誤",
    },
  },
  聯絡電話: {
    presence: {
      message: "必填",
    },
    length: {
      minimum: 8,
      message: "號碼需超過 8 碼",
    },
  },
  通訊地址: {
    presence: {
      message: "必填",
    },
  },
  帳號密碼: {
    presence: {
      message: "必填",
    },
    length: {
      minimum: 6,
      message: "長度須至少6個字元",
    },
  },
  兩次帳號密碼: {
    presence: {
      message: "必填",
    },
    equality: {
      attribute: "帳號密碼",
      message: "輸入不相同",
    },
  },
};
const form = document.querySelector("form");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const tel=document.querySelector(".tel");
const address = document.querySelector(".address");
const password = document.querySelector(".password");
const checkPassword = document.querySelector(".checkPassword");
const registerBtn=document.querySelector(".register-btn");
const errorMessage = document.querySelectorAll(".error-message");

registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let error = validate(form, constraints);
  if (error) {
    showErrors(error);
  } else {
    let userData={
      "username":username.value.trim(),
      "email":email.value.trim(),
      "tel":tel.value.trim(),
      "address":address.value.trim(),
      "password":password.value.trim()
    }
    addUser(userData);
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

function addUser(userData){
  axios.post(`${baseUrl}register`,userData)
  .then(function(response){
    location.href="login.html";
    alert("註冊成功！")
    // if(response.status===201){
    //   console.log(response)
    //   alert("註冊成功！")
    //   location.href="login.html"
    // }
  })
  .catch(function(error){
    console.log(error.response)
    if(error.response.status===400){
      if(error.response.data==="Email already exists"){
        alert("此電子信箱已被註冊過")
      }
    };
  })
}
