import {email, username, password, firstName, lastName, age, submitBtn} from "../modules/htmlselect.js";
import {preventBack} from '../modules/auth.js';

window.onload = () => {
    preventBack()
}

let usersDB = JSON.parse(localStorage.getItem("usersDB")) || [];

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  registerUser();
});

function registerUser() {
    let newUser = {
        email: email.value,
        username: username.value,
        password: password.value, 
        firstName: firstName.value, 
        lastName: lastName.value, 
        age: age.value
    };

    usersDB.push(newUser);
    localStorage.setItem('usersDB', JSON.stringify(usersDB));
}
