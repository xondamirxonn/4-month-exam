document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    let status = form[0].value;
    let company = form[1].value;
    let website = form[2].value;
    let location = form[3].value;
    let skills = form[4].value;
    let githubUsername = form[5].value;
    let textBio = form[6].value;
    let twitter = form[7].value;
    let facebook = form[8].value;
    let youtube = form[9].value;
    let linkedin = form[10].value;
    let instagram = form[11].value;

    let { data } = await axios.post("https://nt-devconnector.onrender.com/api/profile" , {
      status,
      company,
      location,
      skills,
      githubUsername,
      bio: textBio
    },
    {
      headers: {
        "x-auth-token": `${localStorage.getItem("register-token")}`
      }
    });
    if(data){
      window.location.replace("/pages/dashboard.html")
    }
    form.reset()
    console.log(data);
  });
});
