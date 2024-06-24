import { dynamicTable, date, startTime, endTime, hourlyWage, workPlace, shiftSlug, comments, submitBtn, showAddForm } from '/modules/htmlselect.js';

const tbody = dynamicTable.getElementsByTagName('tbody')[0];
const addForm = document.getElementById('addForm');
const animation = document.getElementById('rotatingBar');
const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
const closeBTn = document.getElementById('closeBtn');
const p = document.getElementById('bestMonth');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addDataTable();
});

closeBTn.addEventListener('click', () =>{
    addForm.style.top = '-100%';
})

function addDataTable() {
    let totalPayd = 0;

    // Calculate total profit
    const startTimeValue = startTime.value;
    const endTimeValue = endTime.value;

    // Split value into hours and minutes
    const startTimeArray = startTimeValue.split(':');
    const endTimeArray = endTimeValue.split(':');

    // Convert hours and minutes to minutes
    const startTimeInMinutes = parseInt(startTimeArray[0], 10) * 60 + parseInt(startTimeArray[1], 10);
    const endTimeInMinutes = parseInt(endTimeArray[0], 10) * 60 + parseInt(endTimeArray[1], 10);

    // Calculate the difference in minutes
    let timeDifferenceInMinutes = endTimeInMinutes - startTimeInMinutes;

    // Adjust for overnight shifts
    if (endTimeInMinutes < startTimeInMinutes) {
        timeDifferenceInMinutes += 24 * 60;
    }

    // Convert difference in hours and minutes
    const hours = Math.floor(timeDifferenceInMinutes / 60);
    const minutes = timeDifferenceInMinutes % 60;

    totalPayd += hours * hourlyWage.value + minutes * (hourlyWage.value / 60);

    let userDataTable = JSON.parse(localStorage.getItem(`dataTableUser#${loggedUser.username}`)) || [];

    // Define tableValue
    const tableValue = {
        date: date.value.trim(),
        startTime: startTime.value,
        endTime: endTime.value,
        hourlyWage: parseFloat(hourlyWage.value),
        workPlace: workPlace.value.trim(),
        shiftSlug: shiftSlug.value.trim(),
        comments: comments.value,
        totalProfit: totalPayd,
        username: loggedUser.username
    };

    const masterUser = JSON.parse(localStorage.getItem('masterDataTable')) || [];
    const findSlug = masterUser.some((user) => user.shiftSlug === tableValue.shiftSlug);

    if(findSlug){
        console.error('Shift slug already exists')
        alert('Shift slug already exists');
        location.reload();
    } else {
        addRow(tableValue)
        userDataTable.push(tableValue);
        localStorage.setItem(`dataTableUser#${loggedUser.username}`, JSON.stringify(userDataTable));
        updateMasterDataTable();
        animation.style.display = 'flex';
        updateAnimation();
    }

    addForm.style.top = '-100%';

}


// Save data animation
function updateAnimation() {
    setTimeout(function () {
        animation.style.display = 'none';
        location.reload();
    }, 5000);
}

// Function to add new row to the table
function addRow(data) {
    const newRow = tbody.insertRow();

    const cells = [
        data.date, data.startTime, data.endTime, data.hourlyWage + '$', data.workPlace
    ];

    cells.forEach((cellContent, index) => {
        const cell = newRow.insertCell(index);
        cell.textContent = cellContent;
    });

    // Check if totalProfit is defined before calling toFixed()
    const totalProfit = data.totalProfit ? data.totalProfit.toFixed(2) + "$" : "";
    const totalProfitCell = newRow.insertCell(cells.length);
    totalProfitCell.textContent = totalProfit;

    const trashIcon = document.createElement('i');
    trashIcon.classList = 'fa fa-trash';

    const deleteCell = newRow.insertCell(cells.length + 1);
    deleteCell.appendChild(trashIcon);

    trashIcon.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const rowIndex = row.rowIndex - 1;
        let userDataTable = JSON.parse(localStorage.getItem(`dataTableUser#${loggedUser.username}`)) || [];
        userDataTable.splice(rowIndex, 1);
        localStorage.setItem(`dataTableUser#${loggedUser.username}`, JSON.stringify(userDataTable));
        updateMasterDataTable();
        row.remove();
        location.reload();
    });
}


// Show saved data
const saveData = JSON.parse(localStorage.getItem(`dataTableUser#${loggedUser.username}`));

if (saveData && loggedUser) {
    saveData.forEach(data => {
        if (data.username === loggedUser.username) {
            addRow(data);
        }
    });
}

// Show add form
showAddForm.addEventListener('click', (e) => {
    addForm.style.top = '10vh';
});

// collect all data user for homepage table
function updateMasterDataTable() {
    const allUserData = [];
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
        if (key.startsWith('dataTableUser#')) {
            const userData = JSON.parse(localStorage.getItem(key));
            allUserData.push(...userData);
        }
    });
    localStorage.setItem('masterDataTable', JSON.stringify(allUserData));
}

p.textContent = 'Best month for you is';


// calculate best month
function calculateBestMonth() {
    const saveData = JSON.parse(localStorage.getItem(`dataTableUser#${loggedUser.username}`));
    const monthNames = ['January', 'February', 'March', 'April', "May", 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const monthlyProfits = {};
    saveData.forEach(entry => {
        const date = new Date(entry.date);
        const month = date.getMonth();
        const totalProfit = entry.totalProfit || 0;

        if (!monthlyProfits[month]) {
            monthlyProfits[month] = totalProfit;
        } else {
            monthlyProfits[month] += totalProfit;
        }
    });

        let bestMonthIndex = 0;
        let bestMonthProfit = 0;

        Object.keys(monthlyProfits).forEach(monthIndex => {
            const profit = monthlyProfits[monthIndex];
            if(profit > bestMonthProfit){
                bestMonthProfit = profit;
                bestMonthIndex = monthIndex
            }
        })

        const bestMonthName = monthNames[bestMonthIndex];
        p.textContent = 'Your best month is ' + `${bestMonthName}` + ' with an avarage of: ' + `${bestMonthProfit}` + ' $';
        console.log(bestMonthName)
        console.log(bestMonthProfit);
}

calculateBestMonth();