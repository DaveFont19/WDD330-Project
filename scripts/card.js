import { loadHeaderFooter, getParam  } from "./utils.mjs";
import { cardTemplateAnime, getDataAnime } from "./anime.mjs";
import { getDataMarvelID, cardTemplateMarvel } from "./marvel.mjs";

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
//Recibes the information from the URL
const param = getParam('card');
const data = param.split('-');

const div = document.querySelector('.card');
//Conditional to know if is anime or marvel
if (data[0] == "anime") {
    const anime = getDataAnime(`anime/${data[1]}`)
    anime.then(anime => {
        const data = anime.data;
        const figure = cardTemplateAnime(data);
        div.appendChild(figure);
    })
} else {
    const marvel = getDataMarvelID(data[1]);
    marvel.then(marvel =>{
        const figure = cardTemplateMarvel(marvel.data.results[0]);
        div.appendChild(figure);
    })
}