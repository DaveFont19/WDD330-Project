import { loadHeaderFooter, logInTemplate } from "./utils.mjs";
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
const section = document.querySelector('.log-in');
const dialog = document.querySelector('.dialog-sign');

document.querySelector('.button-log').addEventListener('click', ()=>{
    section.classList.remove('hide');
    section.classList.add('open');
    dialog.classList.remove('open');
    dialog.classList.add('hide');
})

document.querySelector('.log-in').innerHTML = logInTemplate();
document.querySelector('.button-sign').addEventListener('click', ()=>{
    
    dialog.classList.remove('hide');
    dialog.classList.add('open');
    section.classList.remove('open');
    section.classList.add('hide');
})