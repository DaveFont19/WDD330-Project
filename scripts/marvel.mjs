//It calls the Marvel API and returns a promise
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
//It calls the Marvel API with an ID and returns a promise
export async function getDataMarvelID(param) {
    const ts = new Date().getTime();
    //The Marvel API requiers this information to work
    const publicKey = "61f53ec99c1d9b65a277c201efca440b";
    const privateKey = "e49a216f4e0a8850de8d759fe44027057b928c2d"
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const url = `https://gateway.marvel.com/v1/public/comics/${param}?apikey=${publicKey}&ts=${ts}&hash=${hash}`;

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
//Function to provide a template for the marvel carts
export function cartTemplateMarvelURL(marvelComic) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
        <a href="./card/index.html?card=marvel-${marvelComic.id}">
            <h2>${marvelComic.title}</h2>
            <img src="${marvelComic.images[0].path}/portrait_uncanny.jpg" loading="lazy"/>
        </a>`;
    return figure
}
export function cartTemplateMarvel(marvelComic) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
            <h2>${marvelComic.title}</h2>
            <img src="${marvelComic.images[0].path}/portrait_uncanny.jpg" loading="lazy"/>
            <p><strong>Creator(s): </strong>${marvelComic.creators.items.map(item => `${item.name} <strong>Role:</strong> ${item.role}`).join(', ')}<br>
            <strong>Description: </strong>${marvelComic.textObjects != 0? marvelComic.textObjects[0].text: "Unknow"}<br>
            <strong>Synapse: </strong>${marvelComic.description != 0? marvelComic.description: "Unknow"}<br>
            <strong>Price: </strong> $${marvelComic.prices[0].price}</p>`;
    return figure
}