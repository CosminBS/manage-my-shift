import {username, password, submitBtn} from "../modules/htmlselect.js";
import { preventBack } from "../modules/auth.js";

// window.onload = () => {
//     preventBack();
// };

let usersDB = JSON.parse(localStorage.getItem('usersDB') || []);
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginUser();
});

function loginUser() {
    const verifyUser = usersDB.find((element) => element.username === username.value && element.password === password.value);
    if(!verifyUser){
        alert('Wrong username or password')
    } else {
        localStorage.setItem('loggedUser', JSON.stringify(verifyUser));
        window.location.href = "./homepage/home.html";
    }
}