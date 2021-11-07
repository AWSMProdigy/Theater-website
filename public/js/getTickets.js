const ticketHandler = async (event) => {
    event.preventDefault();
    const movie = document.querySelector('#movie');
    const title = movie.dataset.title;
    const runtime = movie.dataset.runtime;
    const showtime = movie.dataset.showtime;

    const response = await fetch('/api/movies', {
        method: "POST",
        body: JSON.stringify({ title, runtime, showtime }),
        headers: { 'Content-Type': 'application/json' },
    })
    if(!response.ok){
        alert("Failed to add movie");
    }
    else{
        alert("Movie added");
    }
}

document
.querySelector('#getTicket')
.addEventListener('click', ticketHandler);