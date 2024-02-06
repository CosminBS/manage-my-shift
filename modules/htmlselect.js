const submitBtn = document.getElementById('submitBtn');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const newPassword = document.getElementById('newPassword');
const repeatNewPassword = document.getElementById('repeatPassword');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');

// navigation bar
const navLinks = document.querySelector(".nav_container");
const openMenu = document.querySelector(".navbar #openNav");
const closeMenu = document.querySelector(".nav_container #closeNav");
const showLoggedUsername = document.getElementById('showUsername');

// edit profile labels
const currentEmail = document.getElementById('currentEmail');
const currentUsername = document.getElementById('currentUsername');
const currentPassword = document.getElementById('currentPass');
const currentFirstName = document.getElementById('currentFirstName');
const currentLastName = document.getElementById('currentLastName');
const currentAge = document.getElementById('currentAge');

// add shifts
const dynamicTable = document.getElementById('table');
const date = document.getElementById('date');
const startTime = document.getElementById('start_time');
const endTime = document.getElementById('end_tine');
const hourlyWage = document.getElementById('hourly_wage');
const workPlace = document.getElementById('workplace');
const shiftSlug = document.getElementById('shift_slug');
const comments = document.getElementById('comments');
const showAddForm = document.getElementById('showAddForm');


export {submitBtn, email, username, password, firstName, lastName, age, repeatNewPassword,
newPassword, showLoggedUsername, navLinks, openMenu, closeMenu, currentEmail, currentUsername,
currentPassword, currentLastName, currentFirstName, currentAge, dynamicTable, date, startTime, endTime,
hourlyWage, workPlace, shiftSlug, comments, showAddForm };
