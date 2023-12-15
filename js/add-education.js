document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let school = form[0].value;
    let degree = form[1].value;
    let fieldofstudy = form[2].value;
    let from = form[3].value;
    let check = form[4].value;
    let to = form[5].value;
    let bio = form[6].value;

    let data = axios.put(
      "https://nt-devconnector.onrender.com/api/profile/education",
      {
        school,
        degree,
        fieldofstudy,
        from,
        to,
      },
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("register-token")}`,
        },
      }
    );
    console.log(data);

    form.reset();
  });
});
