document.addEventListener("DOMContentLoaded", async () => {
  let main = document.querySelector("#main");
  let backBtn = document.querySelector("#backBtn");
  let { data } = await axios.get(
    `https://nt-devconnector.onrender.com/api/profile/user/${localStorage.getItem(
      "user-id"
    )}`,
    {
      headers: {
        "x-auth-token": `${localStorage.getItem("user-id")}`,
      },
    }
  );

  console.log(data);

  let asosiyDiv = document.createElement("div");
  let skillsDiv = document.createElement("div");
  asosiyDiv.classList.add(
    "w-75",
    "py-5",
    "p-5",
    "m-auto",
    "text-center",
    "text-white",
    "juntify-content-center",
    "bg-info"
  );
  let img = document.createElement("img");
  img.classList.add("rounded-circle");
  img.setAttribute("src", data.user.avatar);
  let h1 = document.createElement("h1");
  let status = document.createElement("h5");
  let span = document.createElement("span");
  h1.textContent = data.user.name;
  status.textContent = data.status + " at " + data.company;
  span.textContent = data.location;
  asosiyDiv.append(img, h1, status, span);
  skillsDiv.classList.add(
    "border",
    "bg-ligth",
    "w-50",
    "m-auto",
    "my-3",
    "text-center",
    "p-4"
  );
  let bio = document.createElement("h4");
  let bioText = document.createElement("h2");
  let bottomDiv = document.createElement("div");
  let skillsText = document.createElement("h3");
  skillsDiv.classList.add("w-75");
  skillsText.textContent = "Skills";
  let skills = document.createElement("p");
  bottomDiv.classList.add("p-3");
  skillsText.classList.add("p-3");
  skills.textContent = data.skills;
  bottomDiv.classList.add("border-bottom");
  bioText.textContent = "Bio";
  bio.textContent = data.bio;
  skillsDiv.append(bioText, bio, bottomDiv, skillsText, skills);

  let threeDiv = document.createElement("div");
  threeDiv.classList.add("d-flex", "gap-4", "w-75", "m-auto");
  let experienceDiv = document.createElement("div");
  let educationDiv = document.createElement("div");
  let experienceText = document.createElement("h1");
  experienceText.textContent = "Experience";
  threeDiv.append(experienceDiv, educationDiv);

  experienceDiv.classList.add("border", "w-75", "p-5");
  educationDiv.classList.add("border", "w-75", "p-5");
  data.experience.forEach((expriences) => {
    let company = document.createElement("h3");
    let from = document.createElement("p");
    let title = document.createElement("h5");
    let location = document.createElement("h5");
    let description = document.createElement("h5");
    let toDate = new Date(expriences.to);
    let fromDate = new Date(expriences.from);
    from.textContent = `${fromDate.toLocaleDateString()}`;
    if (expriences.current) {
      from.textContent = `${fromDate.toLocaleDateString()} - Now`;
    } else {
      from.textContent = `${fromDate.toLocaleDateString()}- ${toDate.toLocaleDateString()}`;
    }

    company.textContent = expriences.company;
    title.textContent = "Position: " + expriences.title;
    location.textContent = "Location: " + expriences.location;
    description.textContent = "Description: " + expriences.description;
    experienceDiv.append(company, from, title, location, description);
  });

  data.education.forEach((edu) => {
    let companyEdu = document.createElement("h3");
    let fromEdu = document.createElement("p");
    let titleEdu = document.createElement("h5");
    let locationEdu = document.createElement("h5");
    let descriptionEdu = document.createElement("h5");
    let toDate = new Date(edu.to);
    let fromDate = new Date(edu.from);
    fromEdu.textContent = `${fromDate.toLocaleDateString()}`;
    if (edu.current) {
      fromEdu.textContent = `${fromDate.toLocaleDateString()} - Now`;
    } else {
      fromEdu.textContent = `${fromDate.toLocaleDateString()}- ${toDate.toLocaleDateString()}`;
    }

      

    companyEdu.textContent = edu.school;
    titleEdu.textContent = "Degree " + edu.degree;
    locationEdu.textContent = "Field of Study: " + edu.fieldofstudy;
    descriptionEdu.textContent = "Description: " + edu.description;
    educationDiv.append(
      companyEdu,
      fromEdu,
      titleEdu,
      locationEdu,
      descriptionEdu
      
    );
 
  });
  main.append(asosiyDiv, skillsDiv, threeDiv);

  let {data: datas}  = await axios.get(
    `https://nt-devconnector.onrender.com/api/profile/github/${data.githubusername}`,
    {
      headers: {
        "x-auth-token": `${localStorage.getItem("register-token")}`,
      },
    }
  );

   

   datas.forEach((username) => {
    let div = document.createElement("div")
     let h3 = document.createElement("h3");
     let a = document.createElement("a")
     let star = document.createElement("p")
     let watcher = document.createElement("p")
     let forks = document.createElement("p")
     forks.textContent = "Forks: " + username.forks_count;
    let div2 = document.createElement("div")
     watcher.textContent = "Watchers: " + username.watchers_count;
     star.textContent = "Stars: " +  username.stargazers_count;
     a.setAttribute("href" , username.html_url);
     a.setAttribute("target",  username.html_url);
 div.classList.add("border" , "w-75", "rounded-2" , "p-3", "my-3", "m-auto" , "d-flex" , "justify-content-between" , "align-items-center")
 div2.classList.add("text-center")
 star.classList.add(  "px-4" , "text-white")
 star.style.backgroundColor = "#17a2b8";
 watcher.classList.add("bg-dark" , "px-4" , "text-white")
 forks.classList.add("bg-light", "px-4", "text-dark" , "border");
     a.textContent = username.full_name;
     a.classList.add("text-black" , "text-decoration-none")
     div2.append(star , watcher , forks)
div.append(a , div2)
main.append(div)
   });

  console.log(datas);

});
