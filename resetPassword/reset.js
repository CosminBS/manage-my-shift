import { submitBtn, username, newPassword, repeatNewPassword } from '/modules/htmlselect.js';

function preventBack(){
    window.history.forward();
}

setTimeout('preventBack()', 0);
window.onunload = function() {null};

preventBack()

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetPassword();
});

let userDB = JSON.parse(localStorage.getItem('userDB')) || [];
let errorCounter = 0;

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

function resetPassword() {
    let existingUser = userDB.find((user) => user.username === username.value);

    if (!existingUser) {
        setError(username, 'Username ' + `${username.value}` + ' does not exist')
        return;
    } else {
        setSucces(username)
    }


    if (!isValidNewPassword(newPassword.value)) {
        setError(newPassword, 'At least 6 characters long')
    } else {
        setSucces(newPassword)
    }

    if (!isValidRepeatPassword(newPassword.value, repeatNewPassword.value)) {
        setError(repeatNewPassword, 'Passwords do not match ')
    }

    if (errorCounter > 0) {
        return false
    } else {
        existingUser.password = newPassword.value;
        localStorage.setItem('userDB', JSON.stringify(userDB));
        alert('Password has been reset');
        window.location.href = '/login/login.html';
    }
}

function isValidNewPassword(newPassword) {
    return newPassword.length >= 6;
}

function isValidRepeatPassword(newPassword, repeatPassword) {
    return newPassword === repeatPassword;
}
