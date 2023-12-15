document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("form");

   let  element  = await axios.get(
     "https://nt-devconnector.onrender.com/api/profile/me",
     {
       headers: {
         "x-auth-token": `${localStorage.getItem("register-token")}`,
       },
     }
   );

    
     

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
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
  

    let { data } = await axios.post(
      "https://nt-devconnector.onrender.com/api/profile",
      {
        status,
        company,
        location,
        skills,
        githubUsername,
        bio: textBio,
      },
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("register-token")}`,
        },
      }
    );
    if (data) {
      window.location.replace("/pages/dashboard.html");
    }
    form.reset();
    console.log(data);
  });

   form[0].value = element.data.status;
   form[1].value = element.data.company;
   form[2].value = element.data.website;
   form[3].value = element.data.location;
   form[4].value = element.data.skills;
   form[5].value = element.data.githubUsername;
   form[6].value = element.data.textBio;
   form[7].value = element.data.twitter;
   form[8].value = element.data.facebook;
   form[9].value = element.data.youtube;
   form[10].value = element.data.linkedin;
   form[11].value = element.data.instagram;
  

     logout.addEventListener("click", (e) => {
       e.preventDefault();
       localStorage.removeItem("register-token");
       window.location.replace("/pages/login.html");
     });
});
