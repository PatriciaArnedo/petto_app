
//------State-----//

let petId = 0
let currentUser = false
let petCurrent


//------elements------//
const username = document.querySelector("#username")
const userPets = document.querySelector("#pets-container")
const petHunger = document.querySelector("#hunger-progress")
const petCleanliness = document.querySelector("#clean-progress")
const petEnergy = document.querySelector("#energy-progress")
const petHappiness = document.querySelector("#happy-progress")
const petImg = document.querySelector(".petimg")
const petTitle = document.querySelector("#pet-title")
const actionsTitle = document.querySelector("#actions-title")
const friendList = document.querySelector("#friend-container")
const petList = document.querySelector("#pets-container")
const heartIcon = document.querySelector("#heart")
const logIn = document.querySelector("#log-in")
const petsContainerText = document.querySelector("#pets-container-text")
const statsList = document.querySelector("#stats-list")
const containerList = document.querySelector("#container-title")
let displayButton = document.querySelectorAll(".button_display")
const userDiv = document.querySelector("#user-div")
const htmlBody = document.querySelector("body")
const logOutBtn = document.querySelector("#log-out")
const statBtns = document.querySelector("#button-container")
const background = document.querySelector(".petbackground")

//-------fetches-------//

const userFetch = (id) => {
    const btn = document.querySelector("#signup")

    fetch(`http://localhost:3000/api/users/${id}`)
        .then(r => r.json())
        .then(userObj => {
            renderUser(userObj)
            userObj.pets.forEach(pet => { renderUserPet(pet) })
        })
    currentUser = true


    displayButton.forEach((button) => {
        button.style.display = " "
    })
    btn.style.display = "none"

}

const petFetch = (id) => {
    fetch(`http://localhost:3000/api/pets/${id}`)
        .then(r => r.json())
        .then(petObject => {
            renderPet(petObject)
        })
}

const allPetFetch = () => {
    fetch('http://localhost:3000/api/pets/')
        .then(r => r.json())
        .then(petArray => {
            petArray.forEach(pet => {
                containerList.textContent = ""
                renderFriend(pet)
            })
        })
}


//--------render functions----------//

function renderButtons(buttonflag) {


    if (!buttonflag) {
        displayButton.forEach((button) => {
            button.style.display = "none"
        })

    } else if (buttonflag) {
        displayButton.forEach((button) => {
            button.style.display = ""
        })
        btn.style.display = "none"
    }
}

const renderUser = ({ name }) => {
    username.textContent = name
    currentUser = true
    logIn.innerHTML = ""
    renderButtons(currentUser)
}

const renderUserPet = (pet) => {
    petsContainerText.textContent = "Your Pets"
    let petLi = document.createElement("li")
    petLi.textContent = pet.name
    petLi.dataset.id = pet.id
    userPets.append(petLi)
}



const renderPet = (pet) => {
    petCurrent = pet
    const happyLI = document.createElement("li")
    const hungerLI = document.createElement("li")
    const energyLI = document.createElement("li")
    const cleanLI = document.createElement("li")

    const petHappiness = document.createElement("progress")
    petHappiness.id = "happy-progress"
    const petHunger = document.createElement("progress")
    petHunger.id = "hunger-progress"
    const petCleanliness = document.createElement("progress")
    petCleanliness.id = "clean-progress"
    const petEnergy = document.createElement("progress")
    petEnergy.id = "energy-progress"

    petHunger.value = 0
    petCleanliness.value = 0
    petEnergy.value = 0
    petHappiness.value = 0
    petHunger.max = 100
    petCleanliness.max = 100
    petEnergy.max = 100
    petHappiness.max = 100

    petId = pet.id
    petHunger.value = pet.hunger
    petCleanliness.value = pet.cleanliness
    petEnergy.value = pet.energy
    petHappiness.value = pet.happiness

    happyLI.textContent = "Happiness:"
    hungerLI.textContent = "Hunger:"
    energyLI.textContent = "Energy:"
    cleanLI.textContent = "Cleanliness:"


    happyLI.append(petHappiness)
    hungerLI.append(petHunger)
    energyLI.append(petEnergy)
    cleanLI.append(petCleanliness)

    statsList.innerHTML = ""
    statsList.append(happyLI, hungerLI, energyLI, cleanLI)

    petImg.src = pet.happy_img
    petTitle.textContent = pet.name
    actionsTitle.textContent = `What Will You Do With ${pet.name}?`
}

const renderFriend = (pet) => {
    let friendLi = document.createElement("li")
    friendLi.textContent = pet.name
    friendLi.dataset.id = pet.id
    friendList.append(friendLi)
}




//---------event handlers----------//


logOutBtn.addEventListener("click", () => {
    location.reload()
})

friendList.addEventListener("click", (event) => {
    if (event.target.tagName === 'LI') {
        const id = event.target.dataset.id
        petFetch(id)
    }
})

petList.addEventListener("click", (event) => {
    if (event.target.tagName === 'LI') {
        const id = event.target.dataset.id
        petFetch(id)
    }
})

heartIcon.addEventListener("click", () => {

    fetch(`http://localhost:3000/api/pets/${petId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            happiness: petCurrent.happiness + 20
        }),
    })
        .then(response => response.json())
        .then(data => {
            renderPet(data)
        })
})


logIn.addEventListener("submit", (e) => {
    e.preventDefault()
    const userName = e.target.name.value

    if (!userName) {
        alert("Enter Username")
    }
    else {
        fetch(`http://localhost:3000/api/users/${userName}`)
            .then(r => r.json())
            .then(loginUser => {

                currentUser = true
                renderUser(loginUser)

                loginUser.pets.forEach(pet => {
                    renderUserPet(pet)
                })

                renderPet(loginUser.pets[0])

                allPetFetch()
            })
    }
})

statBtns.addEventListener("click", (e) => {
    const petHunger = document.querySelector("#hunger-progress")
    const petCleanliness = document.querySelector("#clean-progress")
    const petEnergy = document.querySelector("#energy-progress")
    const petHappiness = document.querySelector("#happy-progress")

    let hunger = petHunger.value
    let energy = petEnergy.value
    let happiness = petHappiness.value
    let cleanliness = petCleanliness.value

    if (e.target.dataset.id === "Feed") {
        if (petHunger.value < 100 || petCleanliness.value > 0) {
            hunger = hunger + 10
            cleanliness = cleanliness - 10
        }
        petObject = {
            hunger: hunger,
            cleanliness: cleanliness
        }
    } else if (e.target.dataset.id === "Play") {
        if (petEnergy.value > 0 || petCleanliness.value > 0) {
            energy = energy - 10
            cleanliness = cleanliness - 10
        }
        petObject = {
            energy: energy,
            cleanliness: cleanliness
        }
    } else if (e.target.dataset.id === "Clean") {
        if (petCleanliness.value < 100 || petHappiness.value > 0) {
            cleanliness = cleanliness + 20
            happiness = happiness - 20
        }
        petObject = {
            cleanliness: cleanliness,
            happiness: happiness
        }
    } else if (e.target.dataset.id === "Rest") {
        background.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eaeb2983-14d8-43be-afa3-f21a68d73b60/d6me6v4-369be347-5b26-4611-9109-18dfd9a3b8d7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZWFlYjI5ODMtMTRkOC00M2JlLWFmYTMtZjIxYTY4ZDczYjYwXC9kNm1lNnY0LTM2OWJlMzQ3LTViMjYtNDYxMS05MTA5LTE4ZGZkOWEzYjhkNy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.mYt3fEe_qI4lpwUYZqkSfNWi4tAO-hRfC5dRJfsE6JM"

        if (petEnergy.value < 100 || petHunger.value > 0) {
            energy = energy + 20
            hunger = hunger - 20
        }
        petObject = {
            energy: energy,
            hunger: hunger
        }
    }
    console.log(petId)
    fetch(`http://localhost:3000/api/pets/${petId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(petObject),
    })
        .then(response => response.json())
        .then(newPetData => {
            renderPet(newPetData);
        })
})
//-----initialize------//

// allPetFetch()
// // userFetch(2)
// petFetch(25)
renderButtons(currentUser)

