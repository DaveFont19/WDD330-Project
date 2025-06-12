import { loadHeaderFooter, getParam, getDataAnime, getDataMarvel } from "./utils.mjs";
import { cardTemplate,extraInformationAnime } from "./anime.mjs";

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
//Conditional to know if is anime or marvel
if (data[0] == "anime") {
    const anime = getDataAnime(`anime/${data[1]}`)
    anime.then(anime => {
        const data = anime.data;
        const div = document.querySelector('.card');
        const figure = cardTemplate(data);
        const p = extraInformationAnime(data);
        div.appendChild(figure);
        div.appendChild(p);
    })
} else {
    console.log("es marvel" + data[0]);
}