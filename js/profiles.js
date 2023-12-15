document.addEventListener("DOMContentLoaded", async () => {
  let profiles = document.querySelector("#profiles");
  let main = document.querySelector("main");

  let { data: data } = await axios.get(
    "https://nt-devconnector.onrender.com/api/profile",
    {
      headers: {
        "x-auth-token": `${localStorage.getItem("register-token")}`,
      },
    }
  );

  data.forEach((profile) => {
    profiles.innerHTML += `<div class="d-flex align-items-center p-3 mb-5 px-4 border rounded-2">
            <img
                src="${profile.user.avatar}"
                alt=""
                class="rounded-circle "
            />
            <div class="d-flex justify-content-between mx-5 w-100">
              <div class="my-3">
                <h1 >${profile.user.name}</h1>
                <p class="fs-5 mt-3">${profile.status} at ${profile.company}</p>
                <p class="fs-5 mt-3">${profile.location}</p>
                <button class="btn btn-info text-white" id="${profile._id}">View Profile</button>
              </div>
              <ul class="col-1 text-primary list-unstyled align-items-center my-3 mx-5"><li>${profile.skills}</li></ul>
            </div>
        </div>`;

    document.addEventListener("click", (e) => {
      if (e.target.id === profile._id) {
        localStorage.setItem("user-id" , profile.user._id)
        window.location.replace("/pages/profile.html")
        console.log(profile);
      }
    }); 
  });

    logout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("register-token");
      window.location.replace("/pages/login.html");
    });

  console.log(data);
});
