document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("form");
  let alerts = document.querySelector(".alerts");


    function createAlert(msg, type = "error") {
      let alertElement = document.createElement("div");
      let color =
        type === "error"
          ? "danger"
          : type === "success"
          ? "success"
          : type === "info"
          ? "primary"
          : "warning";
      // let className = text-xl ,ps-8 ,py-2 pe-4 rounded-lg border border-${color}-900 text-${color}-900 bg-${color}-200;
      let className = `fs-5 ps-2 py-2 pe-4 rounded-2 border border-${color} bg-${color}`;

      alertElement.classList.add(...className.split(" "));
      alertElement.innerText = msg;
      let closeBtn = document.createElement("button");
      closeBtn.classList.add("ms-4");
      closeBtn.innerHTML = "<i class='fa-regular fa-circle-xmark'></i>";
      alertElement.append(closeBtn);
      alerts.append(alertElement);
      closeBtn.addEventListener("click", () => alertElement.remove());
      setTimeout(() => alertElement.remove(), 3_000);
    }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let name = form[0].value;
    let email = form[1].value;
    let password = form[2].value;
    let ConfirmPassword = form[3].value;

    if (password !== ConfirmPassword) {
      return createAlert("Wrong Password");
    } else if (localStorage.getItem("register-token")) {
      window.location.replace("/pages/dashboard.html");
    }

    if(password.length < 6) return createAlert("Password must be at least 6 characters long");

    if(!name) return createAlert("Username is not entered");
    if(name.length < 9) return createAlert("Username must be at least 9 characters long");

    try {
      let { data } = await axios.post(
        "https://nt-devconnector.onrender.com/api/users",
        {
          name,
          email,
          password,
        }
      );
      localStorage.setItem("register-token", data.token);
      window.location.replace("/pages/dashboard.html");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    form.reset();
  });
});
