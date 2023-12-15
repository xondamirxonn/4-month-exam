document.addEventListener("DOMContentLoaded" , async () => {
  let form = document.querySelector("form")

  form.addEventListener("submit" , (e) => {
    e.preventDefault()
    let title = form[0].value;
    let company = form[1].value
    let location = form[2].value
    let from = form[3].value
    let check = form[4].value
    let to = form[5].value
    let bio = form[6].value


     let data = axios.put(
       "https://nt-devconnector.onrender.com/api/profile/experience",
       {
         title,
         company,
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
 
form.reset()
  })

    logout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("register-token");
      window.location.replace("/pages/login.html");
    });
})