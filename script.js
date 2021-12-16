const inputField = document.querySelector('.movie__search');
const boxes = document.querySelector('main');
let aboutUs = document.querySelector('.about__movie');

inputField.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        const searchMovie = inputField.value;
        boxes.innerHTML = '';
        loadMovies(searchMovie);
    }
    e.preventDefault();
});

const loadMovies = (searchMovie) => {
    fetch(`https://www.omdbapi.com/?s=${searchMovie}&apikey=19ec95fc`)
    .then(response => 
        {
            if(!response.ok)
                throw new Error(`Status Code Error: ${response.status}`);
            response.json()
            .then((data => {
                    console.log(data);
                    showMovies(data.Search);
            }));
        })
        .catch((err) => {
            console.log('Something wrong!');
            console.log(err);
        })
}
const showMovies = (movies) => {
        movies.forEach((movie, index) => {
            const {Title, Year, Poster, imdbID} = movie;
            const movieBox = document.createElement('div');
            movieBox.classList.add('box');
            boxes.appendChild(movieBox);
            /*document.querySelector('.box').addEventListener('click', (imdbID) => {
                movieSelected(imdbID);
            });*/
            movieBox.innerHTML = `
            <div>
            <img src="${Poster}"/>
                <div class="box__description">
                    <p>${Title} (${Year})</p>
                    <a onClick="movieSelected('${imdbID}')">ABOUT</a>
                </div>
            </div>`;
        });
}
const movieSelected = (imdbID) => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=19ec95fc`)
    .then(response => 
        {
            if(!response.ok)
                throw new Error(`Status Code Error: ${response.status}`);
            response.json()
            .then((data => {
                    console.log(data);
                    let { Poster, Title, Released, Rated, Genre, imdbRating, Director } = data;
                    aboutUs.style.display = 'block';
                    let card = document.createElement('div');
                    card.classList.add('about__movie__card');
                    aboutUs.appendChild(card);
                    card.innerHTML = `
                    <img src="${Poster}" width="200px">
                    <div class="about__movie_desc">
                        <h3>${Title}</h3>
                        <p><strong>Released:</strong>${Released}</p>
                        <p><strong>Rating:</strong>${Rated}</p>
                        <p><strong>Genre:</strong>${Genre}</p>
                        <p><strong>IMDb Rating:</strong>${imdbRating}</p>
                        <p><strong>Director:</strong>${Director}</p>
                    </div>
                    <button id="close" onCLick="closeWindow();"><i class="fas fa-times"></i></button>`;
            }));
        })
        .catch((err) => {
            console.log('Something wrong!');
            console.log(err);
        })
    }
const closeWindow = () => {
        aboutUs.style.display = 'none';
        const card = document.querySelector('.card');
        aboutUs.removeChild(card);
}