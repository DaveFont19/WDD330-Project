import { getDataAnime, randomPick, getDataMarvel, loadHeaderFooter } from "./utils.mjs";
import { cardTemplate } from "./anime.mjs";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//Load header and footer
try {
    await loadHeaderFooter();
    const hamburgerElement = document.getElementById('myButton');
    const navElement = document.querySelector('#animate');
    //It controls the menu to display it when is clicked it
    hamburgerElement.addEventListener('click', () => {
        navElement.classList.toggle('open');
        hamburgerElement.classList.toggle('open');
    })
} catch (error) {
    console.log(error);
}

// Pass the parameter to recibe a promise with data
const recommendationsAnime = getDataAnime("recommendations/anime");
const upcomingAnime = getDataAnime("seasons/upcoming");
const marvel = getDataMarvel();

//Use the promise that is stored in upcomingAnime
upcomingAnime.then(item => {
    const div = document.querySelector('.anime-promotion');
    let promotion = ""
    //Loop to recibe an anime that is not +18
    do {
        promotion = randomPick(item.data);
    }
    while (promotion.rating.charAt(0) == "R");
    //Create the template and insert it in the html file
    const figure = document.createElement('figure');
    figure.innerHTML = `
    <a href="./card/index.html?card=anime-${promotion.mal_id}"">
        <h2> <span class="new">NEW!</span> <br>${promotion.title_english} - <strong>${promotion.title_japanese}</strong></h2>
        <img src="${promotion.images.webp.image_url}" loading="lazy"/>
        <figcaption>${promotion.rating}</figcaption>
        </a>`;
        
    div.appendChild(figure);
})

//Use the promise that is stored in recommendationsAnime
recommendationsAnime.then(async anime => {
    const div = document.querySelector('.anime-suggestion');
    //The counter helps to do not have an infinite loop
    let counter = 0
    //Renders 5 cards
    for (let index = 0; index < 6; index++) {
        const animeSuggestion = randomPick(anime.data);
        const anime1 = animeSuggestion.entry[0].url;

        //Delete the element to do not repeat it
        const url = anime1.split('/');
        await delay(500);

        //It calls the api but it request a specific anime and stored a promise
        const newAnime1 = getDataAnime(`${url[3]}/${url[4]}`);

        //Use the promise stored
        newAnime1.then(item => {

            //This conditional filter the animes +18, and if the counter is 4 it finishes
            if (item.data.rating.charAt(0) !== "R" && counter !== 4) {
               const figure = cardTemplate(item.data)
                figure.classList = `card card${counter + 1}`
                div.appendChild(figure);
                counter++
            }
        })
    }
})
//Use the promise from marvel 
marvel.then(async data => {
    const divProm = document.querySelector('.marvel-promotion');
    const divSugg = document.querySelector('.marvel-suggestion');
    //A loop for render 5 cards
    for (let index = 0; index < 5; index++) {
        const figure = document.createElement('figure')
        //Create a variable to use in the loop and later use it
        let marvelComics = ""
        do { marvelComics = randomPick(data.data.results); }
        //It verifies if the comic has images if not it repeat it
        while (marvelComics.images.length == 0);
        figure.innerHTML = `
        <a href="./card/index.html?card=marvel-${marvelComics.id}">
            <h2>${marvelComics.title}</h2>
            <img src="${marvelComics.images[0].path}/portrait_uncanny.jpg" loading="lazy"/>
        </a>`;
        if (index == 0) {
            divProm.appendChild(figure)
        } else{
             divSugg.appendChild(figure)
        }

    }

})
