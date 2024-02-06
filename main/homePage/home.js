import { navLinks, openMenu, closeMenu, showLoggedUsername, submitBtn, dynamicTable} from '/modules/htmlselect.js';

const tbody = dynamicTable.getElementsByTagName('tbody')[0];
let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
let masterDataTable = JSON.parse(localStorage.getItem('masterDataTable'));

// filter

const findPlace = document.getElementById('filterByPlace');
const findDate = document.getElementById('filterByDate');
const resetBtn = document.getElementById('reset')

// open/close navbar
openMenu.onclick = function() {
    navLinks.style.left = '0';
}

closeMenu.onclick = function () {
    navLinks.style.left = '-100%'
}

// only for developer when accidentaly clear localstorage:))
if(!loggedUser){
    window.location.href = '/login/login.html'
}

// show logged User

showLoggedUsername.innerHTML = 'Hello, ' + `${loggedUser.username}`

// logOut
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = '/login/login.html'
    localStorage.removeItem('loggedUser');
})


// add data in table

function showUserData(data) {
    const newRow = tbody.insertRow();

    const cells = [
        data.username, data.date, data.startTime, data.endTime, data.workPlace
    ];

    cells.forEach((cellContent, index) => {
        const cell = newRow.insertCell(index);
        cell.textContent = cellContent;
    });
}

if(masterDataTable){
    masterDataTable.forEach(data=> {
        showUserData(data)
    })
}


function filterByPlace() {
    const selectedPlace = document.getElementById('workplace').value;

    // clear the current table content
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // filter data based on the selected place and display it in the table
    masterDataTable.forEach(data => {
        if(data.workPlace === selectedPlace){
            showUserData(data);
        }
    });

}

function filterByDate() {
    const selectedDate = document.getElementById('selectDate').value;

    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    }

    masterDataTable.forEach(data => {
        if(data.date === selectedDate){
            showUserData(data);
        }
    });

}

function resetFilter(){
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    };

    masterDataTable.forEach(data => {
        showUserData(data)
    });
};

resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetFilter();
});

findPlace.addEventListener('click', (e) =>{
    e.preventDefault();
    filterByPlace();
});

findDate.addEventListener('click', (e) =>{
    e.preventDefault();
    filterByDate();
});