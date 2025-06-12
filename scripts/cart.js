import { loadHeaderFooter, getParam, getDataAnime, getDataMarvel } from "./utils.mjs";
import { cardTemplate } from "./anime.mjs";

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
        const div = document.querySelector('.cart');
        const p = document.createElement('p');
        const figure = cardTemplate(data)
        figure.classList = `card`;
        div.appendChild(figure);
        p.innerHTML = `<strong>Genre(s): </strong> ${data.genres[0].name}<br><strong>Year: </strong> ${data.year? data.year : "Unknow"}<br><strong>Producer(s): </strong> ${data.producers.length >= 1 ? data.producers[0].name : "Unknow"}, ${data.producers.length > 1? data.producers[1].name : "" } <br>
        <strong>Studio(s): </strong> ${ data.studios.length >= 1? data.studios[0].name : "Unknow"}`;
        div.appendChild(p);
    })
} else {
    console.log("es marvel" + data[0]);
}