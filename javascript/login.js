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
      message: "帳號密碼長度須至少6個字元",
    },
  },
};
const form=document.querySelector("form");
const username=document.querySelector(".username");
const email=document.querySelector(".tel");
const address=document.querySelector(".address");
const password=document.querySelector(".password");
const checkPassword=document.querySelector(".checkPassword");
form.addEventListener("submit",function(e){
  e.preventDefault();
  console.log(validate(form, constraints))
})