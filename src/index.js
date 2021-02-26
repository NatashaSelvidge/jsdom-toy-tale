let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
  toyForm();
});

const baseUrl = "http://localhost:3000/toys";

function getToys() {
  document.querySelector("#toy-collection").innerHTML = "";
  fetch(baseUrl)
    .then((r) => r.json())
    .then((data) => data.forEach(showToys));
}

function showToys(toy) {
  let toyBox = document.querySelector("#toy-collection");

  let card = document.createElement("div");
  card.classList.add("card");

  let toyName = document.createElement("h2");
  toyName.innerHTML = toy.name;

  let toyImg = document.createElement("img");
  toyImg.classList.add("toy-avatar");
  toyImg.src = toy.image;

  let toyLikes = document.createElement("p");
  toyLikes.innerHTML = toy.likes + " " + "Likes ";
  toyLikes.id = `toyLikes-${toy.id}`;

  let toyButton = document.createElement("button");
  toyButton.classList.add("like-btn");
  toyButton.innerHTML = "Like ❤️";

  card.append(toyName, toyImg, toyLikes, toyButton);
  toyBox.appendChild(card);
}

// <div class="card">
//   <h2>Woody</h2>
//   <img src=toy_image_url class="toy-avatar" />
//   <p>4 Likes </p>
//   <button class="like-btn">Like <3</button>
// </div>


function toyForm() {
  const toyForm = document.querySelector("form");
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0,
    };

    obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
      body: JSON.stringify(newToy),
    };
    fetch(baseUrl, obj)
      .then(function (resp) {})
      .then(function (json) {})
      .then(function (showToys) {});
    toyForm.reset();
  });
}

function updateLikes(toy) {
  let likes = parseInt(
    document.querySelector(`toyLikes-${toy.id}`).innerText.split(" ")[0]
  );
  let newLikes = {
    likes: likes + 1,
  };

  let obj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newLikes),
  };
  fetch(baseUrl + `/${toy.id}`, obj)
    .then(function (resp) {})
    .then(function (json) {})
    .then(function (toyObj) {
      document.getElementById(
        (`toyLikes-${toy.id}`.innerText = newLikes.likes + "Likes")
      );
    });
}
