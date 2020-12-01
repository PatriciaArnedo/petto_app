


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

//-------fetches-------//

const userFetch = (id) => {
    fetch(`http://localhost:3000/api/users/${id}`)
    .then(r => r.json())
    .then(userObj => {
        console.log(userObj)
        renderUser(userObj)
        userObj.pets.forEach(pet => {renderUserPet(pet)})
    })
}

const petFetch = (id) => {
    fetch(`http://localhost:3000/api/pets/${id}`)
    .then(r => r.json())
    .then(petObj =>{
        console.log(petObj)
        renderPet(petObj)
    })
}

const allPetFetch = () => {
    fetch('http://localhost:3000/api/pets/')
    .then(r => r.json())
    .then(petArray => {
        console.log(petArray)
        petArray.forEach(pet => {renderFriend(pet)})
    })
}
    

//--------render functions----------//

const renderUser = ({name}) => {
    username.textContent = name
}

const renderUserPet = (pet) => {
    let petLi = document.createElement("li")
    petLi.textContent = pet.name
    userPets.append(petLi)
}



const renderPet = (pet) =>{
    petHunger.value = pet.hunger
    petCleanliness.value = pet.cleanliness
    petEnergy.value = pet.energy
    petHappiness.value = pet.happiness

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

friendList.addEventListener("click", (event) => {
    console.log(event)
    if(event.target.tagName === 'LI' ){
        console.log("list item clicked")
        const id = event.target.dataset.id
        petFetch(id)
    }
})




//-----initialize------//

allPetFetch()
userFetch(2)
petFetch(7)


