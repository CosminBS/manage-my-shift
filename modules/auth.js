function preventBack(){
    if(localStorage.getItem('loggedUser')){
        window.location.href = "login.html"
    }
}

export {preventBack}