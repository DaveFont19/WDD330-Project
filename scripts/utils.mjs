//It call de Anime API and return a promise
export async function getDataAnime(request) {
    try {
        //it makes the calls to the API, after "v4/" it can be different calls to receive specific data
        const response = await fetch(`https://api.jikan.moe/v4/${request}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;

    } catch (error) {
        throw error;
    }
}
//It calls the Marvel API and return a promise
export async function getDataMarvel() {
    const ts = new Date().getTime();
    //The Marvel API requiers this information to work
    const publicKey = "61f53ec99c1d9b65a277c201efca440b";
    const privateKey = "e49a216f4e0a8850de8d759fe44027057b928c2d"
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const url = `https://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=100&offset=0`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;

    } catch (error) {
        throw error;
    }
}
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