
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
//It calls the classes and call a function to render the heather
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("/public/partials/header.html");
    const footerTemplate = await loadTemplate("/public/partials/footer.html");
    const headerElement = document.querySelector(".header");
    const footerElement = document.querySelector(".footer");
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}
//Get a param and it takes the information from the URL and it returns data
export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const getData = urlParams.get(param);
    return getData;
}