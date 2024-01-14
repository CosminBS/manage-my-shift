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

    let errorMessage = [];

    if(!isValideEmail(email)){
        errorMessage.push('Invalid email syntax')
        email.style.border = '2px solid red'
        email.placeholder = 'Invalid email syntax'
        email.style.fontSize = '16px'
    }

    if(!isValideUsername(username)){
        errorMessage.push('Username must contain at least 6 characters long')
        username.style.border = '2px solid red'
        username.placeholder = 'Username must contain at least 6 characters long'
        username.style.fontSize = '16px'
    }

    if(!isValidePassword(password)){
        errorMessage.push('Password must contain at least 6 characters long')
        password.style.border = '2px solid red'
        password.placeholder = 'Password must contain at least 6 characters long'
        password.style.fontSize = '16px'
    }

    if(!isValideFirstName(firstName)){
        errorMessage.push('First name must contain at least 2 character long')
        firstName.style.border = '2px solid red'
        firstName.placeholder = 'First name must contain at least 2 character long'
        firstName.style.fontSize = '16px'
    }

    if(!isValideLastName(lastName)){
        errorMessage.push('Last name must contain at least 2 characters long')
        lastName.placeholder = 'Last name must contain at least 2 characters long'
        lastName.style.fontSize = '16px'
        lastName.style.border = '2px solid red'
    }

    if(!isValideAge(age)){
        errorMessage.push('Age must be between 18 and 65')
        age.placeholder = 'Age must be between 18 and 65'
        age.style.fontSize = '16px'
        age.style.border = '2px solid red'
    }

    if(errorMessage.length > 0){
        displayErrorMessage(errorMessage)
    } else {
        userDB.push(newUser);
        localStorage.setItem('userDB', JSON.stringify(userDB));
        succesfulPopup()
    };
    

};

function isValideEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    email.style.border = '2px solid green';
    email.style.fontSize = '14px'

    return emailRegex.test(email.value)
    
}

function isValideUsername(username){
    if(username.value.length >= 6){
        username.style.border = '2px solid green';
        username.style.fontSize = '14px';
        return true    
    }
};

function isValidePassword(password){
    if(password.value.length >= 6){
        password.style.border = '2px solid green';
        password.style.fontSize = '14px';
        return true
    }
};

function isValideFirstName(firstName){
    if(firstName.value.length >= 2){
        firstName.style.border = '2px solid green';
        firstName.style.fontSize = '14px';
        return true
    }
};

function isValideLastName(lastName){
    if(lastName.value.length >= 2){
        lastName.style.border = '2px solid green';
        lastName.style.fontSize = '14px';
        return true
    }
};

function isValideAge(age){
    if(age.value >= 18 && age.value <= 65){
        age.style.border = '2px solid green';
        age.style.fontSize = '14px';
        return true
    }
}

function displayErrorMessage(errorMessage){
    console.log(errorMessage)
};



function succesfulPopup() {
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
