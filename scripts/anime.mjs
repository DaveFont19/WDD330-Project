export function cardTemplate(anime) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
    <a href="./card/index.html?card=anime-${anime.mal_id}">
        <h2>${anime.title_english} - <strong>${anime.title_japanese}</strong></h2>
        <img src="${anime.images.webp.image_url}" loading="lazy"/>
        <figcaption>${anime.rating}</figcaption>
    </a>`;
    return figure;
}