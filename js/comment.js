document.addEventListener("DOMContentLoaded", async (e) => {
  let profiles = document.querySelector("#profiles");
  let commentText = document.querySelector("commentText");
  let form = document.querySelector("form");
  let { data: response } = await axios.get(
    "https://nt-devconnector.onrender.com/api/posts",
    {
      headers: {
        "x-auth-token": `${localStorage.getItem("register-token")}`,
      },
    }
  );

  response.forEach(async (profile) => {
    if (profile._id === localStorage.getItem("profile-id")) {
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

      form.addEventListener("submit", async (e) => {
        let text = form[0].value;

        let { data: data } = await axios.post(
          `https://nt-devconnector.onrender.com/api/comment/${profile._id}`,
          {
            text,
          },
          {
            headers: {
              "x-auth-token": `${localStorage.getItem("register-token")}`,
            },
          }
        );

        form.reset();
        // window.location.reload();
        console.log(response);
      });
      let comment = await axios.get(
        `https://nt-devconnector.onrender.com/api/comment/${profile._id}`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("register-token")}`,
          },
        }
      );
    }
  });

  logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("register-token");
    window.location.replace("/pages/login.html");
  });
});
