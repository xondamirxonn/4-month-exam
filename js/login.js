document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let email = form[0].value;
    let password = form[1].value;
    let {
      data: { token },
    } = await axios.post(
      "https://nt-devconnector.onrender.com/api/auth",
      {
        email,
        password,
      },

      );
      localStorage.setItem("register-token" , token)

    // let {
    //   data
    // } = await axios.get(
    //   "https://nt-devconnector.onrender.com/api/auth",{
    //     headers: {
    //       `${localStorage.getItem("register-token")}`
    //     }

    //   })

    // console.log(token);

    if (window.localStorage.getItem("register-token")) {
      window.location.replace("/pages/dashboard.html");
    }
    console.log(token);
  });
});
