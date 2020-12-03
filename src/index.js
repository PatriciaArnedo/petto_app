
//------State-----//

let petId = 0
let currentUser = false



//------elements------//
const username = document.querySelector("#username")
const userPets = document.querySelector("#pets-container")
const petHunger = document.querySelector("#hunger")
const petCleanliness = document.querySelector("#cleanliness")
const petEnergy = document.querySelector("#energy")
const petHappiness = document.querySelector("#happiness")
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



//-------fetches-------//

const userFetch = (id) => {
    const btn = document.querySelector("#signup")

    fetch(`http://localhost:3000/api/users/${id}`)
        .then(r => r.json())
        .then(userObj => {
            console.log(userObj)
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
        .then(petObj => {
            console.log(petObj)
            renderPet(petObj)
        })
}

const allPetFetch = () => {
    fetch('http://localhost:3000/api/pets/')
        .then(r => r.json())
        .then(petArray => {
            console.log(petArray)
            petArray.forEach(pet => { 
                containerList.textContent = ""
                renderFriend(pet) })
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
    const happyLI = document.createElement("li")
    const hungerLI = document.createElement("li")
    const energyLI = document.createElement("li")
    const cleanLI = document.createElement("li")

    const petHappiness = document.createElement("progress")
    const petHunger = document.createElement("progress")
    const petCleanliness = document.createElement("progress")
    const petEnergy = document.createElement("progress")
    
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

    if(pet.happiness >= 50 ){
        petImg.src = pet.happy_img
    } else if(pet.happiness < 50 ){
        petImg.src = pet.sad_img
    }
    
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
    console.log(event)
    if (event.target.tagName === 'LI') {
        console.log("list item clicked")
        const id = event.target.dataset.id
        petFetch(id)
    }
})

petList.addEventListener("click", (event) => {
    console.log(event)
    if (event.target.tagName === 'LI') {
        console.log("list item clicked")
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
            happiness: happiness + 20
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

    if (!userName){
        alert("Enter Username")
    }
    else{
    fetch(`http://localhost:3000/api/users/${userName}`)
    .then(r => r.json())
    .then(loginUser => {
        
        currentUser = true
        renderUser(loginUser)
        
            loginUser.pets.forEach(pet =>{
                renderUserPet(pet)
            })
        
        renderPet(loginUser.pets[0])
            
        allPetFetch()
    })
}
})
//-----initialize------//

// allPetFetch()
// // userFetch(2)
// petFetch(25)
renderButtons(currentUser)

