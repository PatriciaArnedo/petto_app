const modal = document.querySelector("#modal")
const modal2 = document.querySelector("#modal2")
const btn = document.querySelector("#signup")
const usernameSignup = document.querySelector("#sign-up")

document.querySelector("#signup").addEventListener("click", () => {
  modal.style.display = "block"

})

usernameSignup.addEventListener("submit", (e)=>{
  e.preventDefault()

  const name = usernameSignup.name.value 

  const userObj = {
    name: name
  }

  // fetch(`http://localhost:3000/api/users`, {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userObj),
  //   })
  //       .then(response => response.json())
  //       .then(data => {

  //           console.log(data)
  //       })

  modal2.style.display = "block"
})

// Hide the form
modal.addEventListener("click", e => {
  if (e.target.dataset.action === "close") {
    modal.style.display = "none"
  }
})

modal2.addEventListener("click", e => {
  if (e.target.dataset.action === "close") {
    modal.style.display = "none"
  }
})
