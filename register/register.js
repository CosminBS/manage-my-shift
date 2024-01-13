import {email, username, password, firstName, lastName, age, submitBtn, hiddenScreen} from "../modules/htmlselect.js";
import {preventBack} from '../modules/auth.js';

window.onload = () => {
    preventBack()
}

let userDB = JSON.parse(localStorage.getItem('userDB')) || [];

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    registerUser()
});

function registerUser() {

    const newUser = {
        email: email.value,
        username: username.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        age: parseFloat(age.value)
    };


    if(validateUser(newUser)){
        userDB.push(newUser);
        localStorage.setItem('userDB', JSON.stringify(userDB));
        showPopup();
    } else {
        alert('All field need to be completed')
    }

};

function validateUser(user){
    return(
        user.username.length >= 6 &&
        user.password.length >= 6 &&
        user.firstName.length >= 2 &&
        user.lastName.length >= 2 &&
        user.age >= 18 &&
        user.age <= 65
    )
}

function showPopup() {
    hiddenScreen.style.display = 'flex';

    setTimeout(function () {
        hiddenScreen.style.opacity = '1';
    }, 100)

    setTimeout(function () {
        hiddenScreen.style.opacity = '0';
        setTimeout(function() {
            hiddenScreen.style.display = 'none';
        }, 500)
    }, 2000)

}