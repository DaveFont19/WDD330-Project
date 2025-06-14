import { loadHeaderFooter } from "./utils.mjs";
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