
//Choose a random element from an array and return it
export function randomPick(data) {
    const number = Math.floor(Math.random() * data.length);
    const suggestion = data[number];
    return suggestion
}
//Render the header 
export function renderWithTemplate(template, parentElement) {
    parentElement.innerHTML = template;
}
//It fetchs the header from other file
export async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template;
}
    //It render date with the last time that the project was modified
function lastModified(){
    const year = document.querySelector("#year");
    let oLastModif = new Date(document.lastModified);
    year.innerHTML = `<span class="highlight">${oLastModif.getDate()}/${oLastModif.getMonth() + 1}/${oLastModif.getFullYear()} ${oLastModif.getHours()}:${oLastModif.getMinutes()}:${oLastModif.getSeconds()}</span>`;
}
//It calls the classes and call a function to render the heather
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("/public/partials/header.html");
    const footerTemplate = await loadTemplate("/public/partials/footer.html");
    const headerElement = document.querySelector(".header");
    const footerElement = document.querySelector(".footer");
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);

    lastModified();
}
//Get a param and it takes the information from the URL and it returns data
export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const getData = urlParams.get(param);
    return getData;
}
//It renders the log in template for Register page
export function logInTemplate() {
    const template = ` <h1>Log In Now!</h1>
                        <form method="get" action="/profile.html">
                                <label>User Name<input type="text" name="user-name" 
                                                title="Your username"></label>
                                <label>Password<input type="password" name="password" required
                                                title="The Password for your account"></label>
                                                <input type="text" hidden value="log-in" name="form">
                                <button type="submit" class="submit-log">Log In</button>
                        </form>
                        <p>Haven't you registered yet? <button type="button" class="button-sign">Sign Up</button></p>`;
    return template;
} //It renders the log in template for Profile page
export function logInTemplateProfile(){
     const template = ` <h1>Log In Now!</h1>
                        <form method="get" action="/profile.html">
                                <label>User Name<input type="text" name="user-name"
                                                title="Your username"></label>
                                <label>Password<input type="password" name="password" required
                                                title="The Password for your account"></label>
                                                <input type="text" hidden value="log-in" name="form">
                                <button type="submit" class="submit-log">Log In</button>
                        </form>`;
    return template;
}
// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}