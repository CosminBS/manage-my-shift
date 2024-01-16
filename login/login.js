import {username, password, submitBtn} from "../modules/htmlselect.js";
import { preventBack } from "../modules/auth.js";

// window.onload = () => {
//     preventBack();
// };

let userDB = JSON.parse(localStorage.getItem('userDB')) || [];

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginUser();
});

function loginUser() {
    const verifyUser = userDB.find((element) => element.username === username.value && element.password === password.value);
    if(!verifyUser){
        alert('Wrong username or password')
    } else {
        localStorage.setItem('loggedUser', JSON.stringify(verifyUser));
        alert('User logged')
    }
}


console.log(userDB);
