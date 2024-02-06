import {submitBtn, email, username, password, firstName, lastName, age, currentEmail, 
currentUsername, currentPassword, currentLastName, currentFirstName, currentAge} from "/modules/htmlselect.js";

let loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || [];
let userDB = JSON.parse(localStorage.getItem('userDB')) || [];
const animation = document.getElementById('rotatingBar');


// generate * for password length
let character = '';
let counter = loggedUser.password.length;

for(let i = 0; i < counter; i++){
    character += '*' 
};


// show logged user data
currentEmail.innerHTML = 'Email: ' + `${loggedUser.email}`;
currentUsername.innerHTML = 'Username: ' + `${loggedUser.username}`;
currentPassword.innerHTML = 'Password: ' + `${character}`;
currentFirstName.innerHTML = 'First Name: ' + `${loggedUser.firstName}`;
currentLastName.innerHTML = 'Last Name: ' + `${loggedUser.lastName}`;
currentAge.innerHTML = 'Age: ' + `${loggedUser.age}`;

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updateUser();
    updateUserDB();
});



// display errors and delte errors
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error')
    inputControl.classList.remove('success');
}

const setSucces = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}



// Regex validation email and username
const isValideEmail = email => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}

const isValideUsername = username => {
    const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?& #])[A-Za-z\d@$!%*?& #]*$/;
    return usernameRegex.test(username);
}


function updateUser() {

    const userData = {
        email: email.value.trim(),
        username: username.value.trim(),
        password: password.value.trim(),
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        age: parseFloat(age.value)
    } 

    // validation

    if(userData.email === ''){
        setError(email, 'Email is required')
    } else if (!isValideEmail(userData.email)){
        setError(email, 'Provide a valid email address')
    } else {
        setSucces(email)
        loggedUser.email = userData.email;
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }

    if(userData.username.length < 6){
        setError(username, 'Must contain at least 6 characters long');
    }else if (!isValideUsername(userData.username)){
        setError(username, 'Must contain numbers and a special character')
    } 
    else {
        setSucces(username)
        loggedUser.username = userData.username
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }

    if(userData.password.length < 6){
        setError(password, 'Must contain at least 6 characters')
    } else {
        setSucces(password)        
        loggedUser.password = userData.password
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }

    if(userData.firstName.length < 2){
        setError(firstName, 'Must contain at least 2 characters')
    } else {
        setSucces(firstName)
        loggedUser.firstName = userData.firstName
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }

    if(userData.lastName.length < 2){
        setError(lastName, 'Must contain at least 2 characters')
    } else {
        setSucces(lastName)
        loggedUser.lastName = userData.lastName
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }

    if(!isValideAge(age)){
        setError(age, 'Age must be between 18 and 65')
    } else {
        setSucces(age)
        loggedUser.age = userData.age
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }
    
    // loading animation
    animation.style.display = 'flex';

    // Start save data animation
    updateAnimation();

}

// Save data animation
function updateAnimation() {
    setTimeout(function () {
        animation.style.display = 'none';
        location.reload();
    }, 5000);
}


// valide age function
function isValideAge(age){
    if(age.value >= 18 && age.value <= 65){
        return true
    }
}

// update userDB 
function updateUserDB() {
    const loggedUserData = JSON.parse(localStorage.getItem('loggedUser'));
    const userKey = `dataTableUser#${loggedUserData.username}`;
    const userDB = JSON.parse(localStorage.getItem('userDB')) || [];

    // serach logged user index
    const userIndex = userDB.findIndex(user => user.username === loggedUserData.username);

    //  update users data in DB
    if (userIndex !== -1) {
        userDB[userIndex] = {...loggedUserData}; 
        localStorage.setItem('userDB', JSON.stringify(userDB));
    }
}
