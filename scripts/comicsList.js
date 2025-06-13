import { loadHeaderFooter, getParam, randomPick } from "./utils.mjs";
import { getDataAnime, cardTemplateAnimeURL, checkRating, callsArray } from "./anime.mjs";
//Load header and footer
try {
    const log = await loadHeaderFooter();
    const hamburgerElement = document.getElementById('myButton');
    const navElement = document.getElementById('animate');
    //It controls the menu to display it when is clicked it
    hamburgerElement.addEventListener('click', () => {
        navElement.classList.toggle('open');
        hamburgerElement.classList.toggle('open');
    })
} catch (error) {
    console.log(error);
}

const main = document.querySelector("main")
//Recibes the information from the URL
const param = getParam('category');
if (param == "anime") {
    main.innerHTML = `<h1>Anime List</h1>`
    const upcomingAnime = getDataAnime(randomPick(callsArray));
    upcomingAnime.then(anime => {
        const div = document.createElement('div');
        const less18 = anime.data.filter(checkRating);
        less18.forEach(element => {
            const figure = cardTemplateAnimeURL(element);
            div.appendChild(figure);
        });
        main.appendChild(div);
    })
} else {
    main.innerHTML = `${param}`;
}