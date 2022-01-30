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
});

// define variables here
let toyUrl = "http://localhost:3000/toys"
let toyBox = document.getElementById("toy-collection")


// function to fetch toys array.
let fetchToys = () => fetch(toyUrl).then(response => response.json())

     // function to post toy.  Attributes we are using is name, image, and likes so those should be in body.
function submitToy(toy_data) {fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify( {
    "name": toy_data.name.value,                // based off of example in instructions
    "image": toy_data.image.value,
    "likes": 0
  } )
  })
  .then(resp => resp.json())
  .then(new_toy => {
    renderToys(new_toy)
  })
}

// function to render the toys
function renderToys(toy) {           //needs h2 with name.  <img src> with image url. <p> with likes. and finally a button for like.
  const h2 = document.createElement("h2")
  h2.innerText = toy.name
  
  const img = document.createElement("img")
  img.setAttribute("src", toy.image)
  img.setAttribute("class", "toy-avatar")

  const p = document.createElement("p")
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement("button")
  btn.setAttribute("class", "like-btn")
  btn.setAttribute("id", toy.id)
  btn.innerText = "like"
  btn.addEventListener("click", (event) => {
    console.log(event.target.dataset);
    likes(event)
  })

  const divCard = document.createElement("div")
  divCard.setAttribute("class", "card")
  //divCard.appendChild(h2)
  //divCard.appendChild(img)
  //divCard.appendChild(p)
  //divCard.appendChild(btn)
  divCard.append(h2, img, p, btn)   // parentNode.append(children) saves lines of code
  toyBox.append(divCard)
}
// function to increase likes (event)
function likes(event) {
  event.preventDefault()
  const increase = parseInt(event.target.previousElementSibling.innerText) + 1
  
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": increase
    })
  })
  .then(resp => resp.json())
  .then((likea => {
    event.target.previousElementSibling.innerText = `${increase} likes`;
  }))


}

// display all toys

fetchToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })
})
