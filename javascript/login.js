
const baseUrl = "https://json-server-vercel-ebon.vercel.app/";
// const baseUrl = "http://localhost:3000/";

//validate
let constraints = {
  帳號名稱: {
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
      message: "至少6個字元",
    },
  },
};
const form=document.querySelector("form");
const username=document.querySelector(".username");
const password=document.querySelector(".password");
const errorMessage=document.querySelectorAll(".error-message");
const loginBtn=document.querySelector(".login-btn");
loginBtn.addEventListener("click",function(e){
  e.preventDefault();
  let error=validate(form, constraints);
  if(error){
    showErrors(error);
  }else{

    //比對有沒有註冊過
    location.href="index.html"
  }
})

function showErrors(errors) {
  errorMessage.forEach(function (item) {
    if(errors[item.dataset.msg]===undefined){
      return;
    }else if(errors[item.dataset.msg]){
      item.innerHTML = `<i class="bi bi-exclamation-circle me-1"></i>${errors[item.dataset.msg]}`;
    }
  });
}