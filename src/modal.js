const modal = document.querySelector("#modal")
const btn = document.querySelector("#signup")

document.querySelector("#signup").addEventListener("click", () => {
  modal.style.display = "block"
  userFetch(1)
  
})

// Hide the form
modal.addEventListener("click", e => {
  if (e.target.dataset.action === "close") {
    modal.style.display = "none"
  }
})

