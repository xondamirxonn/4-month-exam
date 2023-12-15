document.addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("form");
  let main = document.querySelector("main");
  let profiles = document.querySelector("#profiles");
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
    let text = form[0].value;

    let data = await axios.post(
      "https://nt-devconnector.onrender.com/api/posts",
      {
        text,
      },
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("register-token")}`,
        },
      }
    );

    window.location.reload();

    console.log(data);

    createAlert("Post created");
  
    form.reset();
  });

  let { data: datas } = await axios.get(
    "https://nt-devconnector.onrender.com/api/profile",
    {}
  );

  let { data: response } = await axios.get(
    "https://nt-devconnector.onrender.com/api/posts",
    {
      headers: {
        "x-auth-token": `${localStorage.getItem("register-token")}`,
      },
    }
  );
  response.forEach(async (profile) => {
    let asosiyDiv = document.createElement("div");
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    let dateDiv = document.createElement("div");
    let btnDiv = document.createElement("div");
    let avatar = document.createElement("img");
    let post = document.createElement("p");
    let postOn = document.createElement("small");
    let date = document.createElement("small");
    let like = document.createElement("button");
    let unlike = document.createElement("button");
    let discussion = document.createElement("button");
    discussion.textContent = "Discussion";
    discussion.classList.add("btn", "text-white");
    discussion.style.backgroundColor = "#17a2b8";
    let datee = new Date(profile.date);
    date.textContent = `${datee.toLocaleDateString()}`;
    avatar.setAttribute("src", profile.avatar);
    avatar.classList.add("rounded-circle", "object-fit-cover");
    avatar.style.objectFit = "cover";
    avatar.style.width = "100px";
    avatar.style.height = "100px";
    let name = document.createElement("small");
    name.classList.add("w-75", "text-center");
    like.textContent = profile.likes.length;
    like.classList.add("btn", "btn-light", "w-50", "my-3");

    unlike.classList.add("btn", "btn-light", "w-50", "p-3");
    name.textContent = profile.name;
    post.textContent = profile.text;
    postOn.textContent = "Post on: ";
    div.classList.add("d-flex", "flex-column", "align-items-center");
    btnDiv.classList.add("d-flex", "gap-3", "align-items-center");
    asosiyDiv.classList.add("d-flex");
    asosiyDiv.classList.add("border", "my-3", "p-3", "rounded-2");
    btnDiv.append(like, unlike, discussion);
    div.append(avatar, name);
    div2.append(post, dateDiv, btnDiv);
    dateDiv.classList.add("d-flex", "gap-1", "text-secondary");
    dateDiv.append(postOn, date);
    div2.classList.add(
      "d-flex",
      "flex-column",
      "px-5",
      "justify-content-start",
      "py-3"
    );
    profiles.classList.add("p-4", "w-75", "m-auto");
    asosiyDiv.append(div, div2);
    profiles.append(asosiyDiv);


    discussion.addEventListener("click" , async (e) => {
      let {data : response} = await axios.get(
        `https://nt-devconnector.onrender.com/api/posts/${profile._id}`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("register-token")}`,
          },
        }
      );
localStorage.setItem("profile-id" , profile._id)
window.location.replace("/pages/comment.html")
      console.log(response);
    })

  });
  // console.log(response);

  logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("register-token");
    window.location.replace("/pages/login.html");
  });
});
