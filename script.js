const inputField = document.querySelector('.movie__search').value;

const API_URL = `https://www.omdbapi.com/?s=harry&apikey=19ec95fc`;

const loadMovies = (searchMovie) => {
    fetch(`https://www.omdbapi.com/?s=${searchMovie}&apikey=19ec95fc`)
    .then(response => 
        {
            if(!response.ok)
                throw new Error(`Status Code Error: ${response.status}`);
            response.json()
            .then((data => {
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
            console.log(movie.Title);
        }
}
loadMovies('harry');