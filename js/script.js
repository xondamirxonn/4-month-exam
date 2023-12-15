document.addEventListener("DOMContentLoaded", async () => {
  let signBtn = document.querySelector("#btn-sign");
  let LoginBtn = document.querySelector("#btn-login");

  signBtn.addEventListener("click" , (e) => {
    e.preventDefault()
    window.location.replace("/pages/sign-up.html")
  })

  LoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.replace("/pages/login.html");
  });
});
