const modal = document.querySelector("#modal")
const modal2 = document.querySelector("#modal2")
const btn = document.querySelector("#signup")
const usernameSignup = document.querySelector("#sign-up")
const petSignup = document.querySelector("#select-pet")
const petFormImage = document.querySelector(".pet_form_image")
let userId 
let petObj
let userName

petFormImage.addEventListener("click",(e)=>{
  if(e.target.matches("input")){
    petObj =  {
      name: "",
      happy_img: e.target.dataset.happyimg,
      sad_img: e.target.dataset.sadimg,
      bio: e.target.dataset.bio,
      happiness: 50,
      hunger: 50,
      energy: 50,
      cleanliness: 50,
      user_id: userId
    }
  }
})


document.querySelector("#signup").addEventListener("click", () => {
  modal.style.display = "block"
})

usernameSignup.addEventListener("submit", (e)=>{
  e.preventDefault()

  const name = usernameSignup.name.value 

  const userObj = {
    name: name
  }

  fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj),
    })
        .then(response => response.json())
        .then(data => {
            userName = data.name
            userId = data.id
        })

  modal2.style.display = "block"
})

petSignup.addEventListener("submit", (e)=>{
  e.preventDefault()
  
    petObj.name = petSignup.name.value

  console.log(userId)
  fetch(`http://localhost:3000/api/pets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(petObj),
    })
        .then(r => r.json())
        .then(newPet => {
          renderPet(newPet)
          userFetch(userName)
          allPetFetch()
        })
        initialize()
    modal.style.display = "none"    
    modal2.style.display = "none"
})

// Hide the form
modal.addEventListener("click", e => {
  if (e.target.dataset.action === "close") {
    modal.style.display = "none"
  }
})

modal2.addEventListener("click", e => {
  if (e.target.dataset.action === "close") {
    modal2.style.display = "none"
  }
})
