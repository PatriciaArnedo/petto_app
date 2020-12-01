


//------elements------//
const username = document.querySelector("#username")
const userPets = document.querySelector("#pets-container")

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


//--------render functions----------//

const renderUser = ({name}) => {
    username.textContent = name
}

const renderUserPet = (pet) => {
    let petLi = document.createElement("li")
    petLi.textContent = pet.name
    userPets.append(petLi)
}




//---------event handlers----------//




//-----initialize------//

userFetch(1)


