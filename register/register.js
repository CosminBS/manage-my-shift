import { submitBtn, email, username, password, firstName, lastName, age } from '/modules/htmlselect.js';

function preventBack(){
    window.history.forward();
}

setTimeout('preventBack()', 0);
window.onunload = function() {null};

preventBack()

submitBtn.addEventListener('click', (e) =>{
    e.preventDefault();

    if(!isExistedUser(username.value)){
        registerUser();
    }
});

let userDB = JSON.parse(localStorage.getItem('userDB')) || [];
let errorCounter = 0;

// display errors and delte errors
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorCounter += 1;

    errorDisplay.innerText = message;
    inputControl.classList.add('error')
    inputControl.classList.remove('success');
}

const setSucces = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorCounter = 0;

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

function registerUser() {

    const newUser = {
        id: Math.floor(Math.random() * 1000 ) + 1,
        email: email.value.trim(),
        username: username.value.trim(),
        password: password.value.trim(),
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        age: parseFloat(age.value)
    }

    // validation
    if(newUser.email === ''){
        setError(email, 'Email is required')
    } else if (!isValideEmail(newUser.email)){
        setError(email, 'Provide a valid email address')
    } else {
        setSucces(email)
    }

    if(newUser.username.length < 6){
        setError(username, 'Must contain at least 6 characters long');
    }else if (!isValideUsername(newUser.username)){
        setError(username, 'Must contain numbers and a special character')
    } 
    else {
        setSucces(username)
    }

    if(newUser.password.length < 6){
        setError(password, 'Must contain at least 6 characters')
    } else {
        setSucces(password)
    }

    if(newUser.firstName.length < 2){
        setError(firstName, 'Must contain at least 2 characters')
    } else {
        setSucces(firstName)
    }

    if(newUser.lastName.length < 2){
        setError(lastName, 'Must contain at least 2 characters')
    } else {
        setSucces(lastName)
    }

    if(!isValideAge(age)){
        setError(age, 'Age must be between 18 and 65')
    } else {
        setSucces(age)
    }

    if(errorCounter > 0){
        return false
    } else {
        userDB.push(newUser);
        localStorage.setItem('userDB', JSON.stringify(userDB));
        alert('Registered successfully!')
        window.location.href = '/login/login.html';
    }

}

// valide age function
function isValideAge(age){
    if(age.value >= 18 && age.value <= 65){
        return true
    }
}

// verify if user already exist
function isExistedUser(username) {
    const existentUsers = JSON.parse(localStorage.getItem('userDB')) || [];

    const existingUser = existentUsers.find((user) => user.username === username);

    if (existingUser !== null && existingUser !== undefined) {
        alert('User already exists. Please choose another username.');
        location.reload()
        return true;
    }

    return false;
}


