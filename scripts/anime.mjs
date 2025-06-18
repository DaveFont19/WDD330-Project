//It call de Anime API and returns a promise
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
//Cardtemplate displays the anime card 
export function cardTemplateAnime(anime) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
        <h2>${anime.title_english} - <strong>${anime.title_japanese}</strong></h2>
        <img src="${anime.images.webp.image_url}" loading="lazy"/>`;
    return figure;
}
//We return a template for details card
export function detailsAnime(anime) {
    const p = document.createElement('p');
    p.innerHTML = `<strong>Rating: </strong> ${anime.rating? anime.rating : "Unknow"}<br><strong>Year: </strong> ${anime.year ? anime.year : "Unknow"}<br>
    <strong>Genre(s): </strong> ${displayArray(anime.genres)}<br>
    <strong>Producer(s): </strong> ${anime.producers.length ? displayArray(anime.producers) : "Unknow"}<br>
    <strong>Studio(s): </strong> ${anime.studios.length ? displayArray(anime.studios) : "Unknow"}<br>
    <strong>Theme(s): </strong> ${anime.themes.length ? displayArray(anime.themes) : "Unknow"}<br>
    <strong>Trailer: </strong> ${anime.trailer ? `<a href="${anime.trailer.url}">${anime.trailer.url}</a>` : "Unknow"} `;
    return p;
}
//We return a template for details card but with a link
export function cardTemplateAnimeURL(anime) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
    <a href="./card/index.html?card=anime-${anime.mal_id}">
        <h2>${anime.title_english} - <strong>${anime.title_japanese}</strong></h2>
        <img src="${anime.images.webp.image_url}" loading="lazy"/>
        <figcaption>${anime.rating}</figcaption>
    </a>`;
    return figure;
}
//It returns a new string element to displays it
function displayArray(element) {
    return element.map(item => item.name).join(', ');
}
export function checkRating(data) {
    return data.rating != "R+ - Mild Nudity"
}
export const callsArray = ["top/anime?sfw","seasons/2021/summer?sfw","top/anime?type=ova", "top/anime?type=movie", "seasons/upcoming", "seasons/2024/spring?sfw"];