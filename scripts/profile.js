import User from "./user.mjs";
import { loadHeaderFooter, getLocalStorage, setLocalStorage, logInTemplateProfile } from "./utils.mjs";
//Load header and footer
try {
    await loadHeaderFooter();
    const hamburgerElement = document.getElementById('myButton');
    const navElement = document.querySelector('#animate');
    //It controls the menu to display it when is clicked it
    hamburgerElement.addEventListener('click', () => {
        navElement.classList.toggle('open');
        hamburgerElement.classList.toggle('open');
    })
} catch (error) {
    console.log(error);
}
//Function ro verify if the userName already exist
function verifyStorage(object) {
    return object.userName == user.userName
}
function verifyPassword(object) {
    return object.userName == user.userName && object.password == user.password;
}
const getString = window.location.search;
const myInfo = new URLSearchParams(getString);
const section = document.querySelector('.section-profile');
//We instance an object from the class User
const user = new User(myInfo.get('first-name'),
    myInfo.get('last-name'),
    myInfo.get('user-name'),
    myInfo.get('email'),
    myInfo.get('phone'),
    myInfo.get('password'),
    myInfo.get('description'));

//Create an array to store the users
const users = [];
//We recibe the localStorage
const response = getLocalStorage('users');
//If we have data in localstorage we inser it in the empty array
if (response) {
    response.forEach(element => {
        users.push(element)
    });
}
if (myInfo.get('form') == 'sign-up') {
    //We verify if there is a similar userName 
    const condition = users.filter(verifyStorage);
    if (condition.length > 0) {
        console.log("Ya existe un usuario con ese nombre");
    } else {
        users.push(user);
        //We store the array in the localStorage
        setLocalStorage('users', users);
        setLocalStorage('sessionActive', [user]);
        section.innerHTML = user.welcomeMessage(user);
        user.logout();
    }
}//Here finish the form sign in conditional 

//We verify if the form that we recibe is a log in
else if (myInfo.get('form') == 'log-in') {
    const session = users.filter(verifyPassword)
    if (session.length > 0) {
        setLocalStorage('sessionActive', session);
        section.innerHTML = user.welcomeMessage(session[0])
        user.logout();
    } else {
        console.log("Contraseña incorrecta");
    }
}
//If the user enter to the page without completing a form
 else {
    const session = getLocalStorage('sessionActive')

    if (!session) {
        section.classList.add('open');
        section.innerHTML = logInTemplateProfile();
    } else {  
        section.innerHTML = user.welcomeMessage(session[0])
        user.logout();

    }

}