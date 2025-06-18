import { loadHeaderFooter, getParam, randomPick } from "./utils.mjs";
import { getDataAnime, cardTemplateAnimeURL, checkRating, callsArray } from "./anime.mjs";
import { getDataMarvel, cardTemplateMarvelURL } from "./marvel.mjs";

//Load header and footer
try {
    const log = await loadHeaderFooter();
    const hamburgerElement = document.getElementById('myButton');
    const navElement = document.getElementById('animate');
    //It controls the menu to displays it when is clicked it
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
//Boolean to verify if is Anime or Marvel
if (param == "anime") {
    main.innerHTML = `<h1>Anime List</h1>`
    const anime = getDataAnime(randomPick(callsArray));
   
    anime.then(anime => {
        const div = document.createElement('div');
        //Verify if the content is not +18
        const less18 = anime.data.filter(checkRating);
        less18.forEach(element => {
             //Render the Anime Template
            const figure = cardTemplateAnimeURL(element);
            div.appendChild(figure);
        });
        main.appendChild(div);
    })
} else {
    main.innerHTML = `<h1>Marvel List</h1>`
    const marvel = getDataMarvel();
    marvel.then(marvel => {
        const div = document.createElement('div');
        const comics = marvel.data.results;
        for (let index = 0; index < 20;) {
            //To always render random comics
            const number = Math.floor(Math.random() * comics.length);
            const comic = comics[number];
            comics.splice(number, comics);
            //It verifies if the item has images
            if (comic.images.length > 0) {
                //Render the marvel template
                const figure = cardTemplateMarvelURL(comic);
                div.appendChild(figure);
                index++
            }
        }
        main.appendChild(div);
    })
}