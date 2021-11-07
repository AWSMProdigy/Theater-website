const showMovie = async (event) => {
    event.preventDefault();
    const movie = document.querySelector('#movie');
    const title = movie.dataset.title;
    const runtime = movie.dataset.runtime;
    const showtime = movie.dataset.showtime;
    const rating = movie.dataset.rating;
    const img = movie.dataset.img;

    const response = await fetch('/api/movies/' + myMovie.datasets.title)
}

document.querySelector('#showMovie').addEventListener('click', showMovieHandler);