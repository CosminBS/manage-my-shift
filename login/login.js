import {submitBtn, username, password } from "../modules/htmlselect.js";

function preventBack(){
    window.history.forward();
}

setTimeout('preventBack()', 0);
window.onunload = function() {null};

preventBack();

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    loginUser();

});

let userDB = JSON.parse(localStorage.getItem('userDB')) || [];

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

function loginUser() {
    const verifyUser = userDB.find((element) => element.username === username.value && element.password === password.value);

    if(!verifyUser){
        setError(username, 'Invalid username or password');
    } else {
        setSucces(username)
        localStorage.setItem('loggedUser', JSON.stringify(verifyUser));
        alert('User logged');
        window.location.href = '/main/homePage/homepage.html'
    }


}

