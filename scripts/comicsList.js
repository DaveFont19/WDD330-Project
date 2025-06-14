import { loadHeaderFooter, getParam, randomPick } from "./utils.mjs";
import { getDataAnime, cardTemplateAnimeURL, checkRating, callsArray } from "./anime.mjs";
import { getDataMarvel, cardTemplateMarvelURL } from "./marvel.mjs";

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
    const anime = getDataAnime(randomPick(callsArray));
    anime.then(anime => {
        const div = document.createElement('div');
        const less18 = anime.data.filter(checkRating);
        less18.forEach(element => {
            const figure = cardTemplateAnimeURL(element);
            div.appendChild(figure);
        });
        main.appendChild(div);
    })
} else {
    const marvel = getDataMarvel();
    marvel.then(marvel => {
        const div = document.createElement('div');
        const comics = marvel.data.results;
        for (let index = 0; index < 20;) {
            const number = Math.floor(Math.random() * comics.length);
            const comic = comics[number];
            comics.splice(number, comics);

            if (comic.images.length > 0) {
                const figure = cardTemplateMarvelURL(comic);
                div.appendChild(figure);
                index++
            }
        }
        main.appendChild(div);
    })
}