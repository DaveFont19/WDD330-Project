//Cardtemplate displays the anime card 
export function cardTemplate(anime) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
        <h2>${anime.title_english} - <strong>${anime.title_japanese}</strong></h2>
        <img src="${anime.images.webp.image_url}" loading="lazy"/>`;
    return figure;
}
export function cardTemplateURL(anime) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
    <a href="./card/index.html?card=anime-${anime.mal_id}">
        <h2>${anime.title_english} - <strong>${anime.title_japanese}</strong></h2>
        <img src="${anime.images.webp.image_url}" loading="lazy"/>
        <figcaption>${anime.rating}</figcaption>
    </a>`;
    return figure;
}
//It displays the additional information about anime in the card
export function extraInformationAnime(data) {
    const p = document.createElement('p');
    p.innerHTML = `<strong>Rating: </strong> ${data.rating}<br><strong>Year: </strong> ${data.year ? data.year : "Unknow"}<br>
    <strong>Genre(s): </strong> ${displayArray(data.genres)}<br>
    <strong>Producer(s): </strong> ${data.producers.length ? displayArray(data.producers) : "Unknow"}<br>
    <strong>Studio(s): </strong> ${data.studios.length ? displayArray(data.studios) : "Unknow"}<br>
    <strong>Theme(s): </strong> ${data.themes.length ? displayArray(data.themes) : "Unknow"}<br>
    <strong>Trailer: </strong> ${data.trailer ? `<a href="${data.trailer.url}">${data.trailer.url}</a>` : "Unknow"}`;
    return p;
}
//It returns a new string element to displays it
function displayArray(element) {
    return element.map(item => item.name).join(', ');
}