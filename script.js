const inputField = document.querySelector('.movie__search');
const boxes = document.querySelector('main');

inputField.addEventListener('keyup', (e) => {
    e.preventDefault;
    if(e.keyCode === 13) {
        const searchMovie = inputField.value;
        boxes.innerHTML = '';
        loadMovies(searchMovie);
    }
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
        for(let movie of movies) {
            const {Title, Year, Poster } = movie;
            const movieBox = document.createElement('div');
            movieBox.classList.add('box');
            boxes.appendChild(movieBox);
            movieBox.innerHTML = `
            <img src="${Poster}"/>
                <div class="box__description">
                    <p>${Title} (${Year})</p>
                </div>`;
        }
}