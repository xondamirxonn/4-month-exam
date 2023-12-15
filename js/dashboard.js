document.addEventListener("DOMContentLoaded", async () => {
  let asosiyDiv = document.querySelector("#dashboardDiv");
  let logout = document.querySelector("#logout");
  let userP = document.querySelector("#userP");
  let yetP = document.querySelector("#yetP");
  let creatBtn = document.querySelector("#createProfile");
  let tbody = document.querySelector("#tbody");
  let tbody2 = document.querySelector("#tbody2");
  let btns = document.querySelector("#btns");
  let deleteAccount = document.querySelector("#deletemyaccount");
  let table = document.querySelector("#tableDiv")
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
    let className = `fs-3 ps-2 py-2 pe-4 rounded-3 border border-${color} text-${color} bg-${color}`

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

  creatBtn.classList.add("d-none");

  let data = await axios.get("https://nt-devconnector.onrender.com/api/auth", {
    headers: {
      "x-auth-token": `${localStorage.getItem("register-token")}`,
    },
  });
  // console.log(data);

  let respone = data.data;

  let div = document.createElement("div");

  userP.textContent = "Welcome " + `${respone.name}`

  // div.append(p);
  // asosiyDiv.prepend(div);

  logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("register-token");
    window.location.replace("/pages/login.html");
  });

  const token = localStorage.getItem("register-token");
  console.log(token);
  // (async function getData() {
  try {
    let { data: create } = await axios.get(
      "https://nt-devconnector.onrender.com/api/profile/me",
      {
        headers: {
          "x-auth-token": `${token}`,
        },
      }
    );
    table.classList.remove("d-none")
    let editBtn = document.createElement("button");
    let addBtn = document.createElement("button");
    let addEducationBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-light");
    addBtn.classList.add("btn", "btn-light");
    addEducationBtn.classList.add("btn", "btn-light");
    editBtn.textContent = "Edit Profile";
    addBtn.textContent = "Add Experience";
    addEducationBtn.textContent = "Add Education";

    btns.append(editBtn, addBtn, addEducationBtn);
    // asosiyDiv(btns)

    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.replace("/pages/add-experience.html");

    });
    addEducationBtn.addEventListener("click" , (e) => {
      e.preventDefault()
      window.location.replace("/pages/add-education.html")
    })

    editBtn.addEventListener("click" , (e) => {
      e.preventDefault()
      window.location.replace("/pages/edit-profile.html")
    })
    create.experience.forEach((element) => {
      let tr = document.createElement("tr");
      let title = document.createElement("td");
      let company = document.createElement("td");
      let from = document.createElement("td");
      let deleteTd = document.createElement("td")
      let deleteBtn = document.createElement("button")
      deleteBtn.textContent = "Delete"
      deleteBtn.classList.add("btn" , "btn-danger")
      // let to = document.createElement("td");
      let fromDate = new Date(element.from);
      let toDate = new Date(element.to);
      company.textContent = element.company;
      title.textContent = element.title;
      if (element.current) {
        from.textContent = `${fromDate.toLocaleDateString()} - Now`;
      } else {
        from.textContent = `${fromDate.toLocaleDateString()}- ${toDate.toLocaleDateString()}`;
      }
      deleteTd.append(deleteBtn)
      tr.append(company, title , from , deleteTd);
      tbody.append(tr);

      deleteBtn.addEventListener("click" , async(e) => {
          e.preventDefault()
          let data = axios.delete(
            `https://nt-devconnector.onrender.com/api/profile/experience/${element._id}`,
            {
              headers: {
                "x-auth-token": `${token}`,
              },
            }
          );
          tr.remove()
      })
    })

      create.education.forEach((education) => {
        let tr = document.createElement("tr");
      let school = document.createElement("td");
      let degree = document.createElement("td");
      let from = document.createElement("td");
      let deleteTd = document.createElement("td")
      let deleteBtn = document.createElement("button")
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("btn", "btn-danger" )
      // let to = document.createElement("td");
      let fromDate = new Date(education.from);
      let toDate = new Date(education.to);
      school.textContent = education.school
      degree.textContent = education.degree;
      if (education.current) {
        from.textContent = `${fromDate.toLocaleDateString()} - Now`;
      } else {
        from.textContent = `${fromDate.toLocaleDateString()}- ${toDate.toLocaleDateString()}`;
      }
      deleteTd.append(deleteBtn)
      tr.append(school, degree , from , deleteTd);
      tbody2.append(tr);

           deleteBtn.addEventListener("click", async (e) => {
             e.preventDefault();
             let data = axios.delete(
               `https://nt-devconnector.onrender.com/api/profile/education/${education._id}`,
               {
                 headers: {
                   "x-auth-token": `${token}`,
                 },
               }
             );
             tr.remove();
           });
    });

       let myAccountDeleteBtn = document.createElement("button");

       myAccountDeleteBtn.textContent = "Delete My Account";
       myAccountDeleteBtn.classList.add("btn", "btn-danger");

       deleteAccount.append(myAccountDeleteBtn);

       myAccountDeleteBtn.addEventListener("click", async (e) => {
         let confirmm = confirm(
           "Are you sure you want to delete your account?"
         );
         if (confirmm) {
           await axios.delete(
             "https://nt-devconnector.onrender.com/api/profile",
             {
               headers: {
                 "x-auth-token": `${localStorage.getItem("register-token")}`,
               },
             }
           );
           localStorage.removeItem("register-token");
           window.location.replace("/pages/login.html");
         } else {
           console.log("Ochirish bekor qilindi");
         }
       });


    console.log(create);
  } catch (error) {

    yetP.textContent = "You have not yet setup a profile, please add some info";
    let creatBtnn = document.createElement("button");
    creatBtnn.textContent = "Create Profile";
    creatBtnn.classList.add("btn", "btn-success");
    asosiyDiv.append(creatBtnn , );
    creatBtnn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.replace("/pages/create-profile.html");
    });
  }

   
 
});
