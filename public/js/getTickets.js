var ticketHandler = async (name) => {
    const movie = document.querySelector('#' + name + 'movie');
    const title = movie.dataset.title;
    const runtime = movie.dataset.runtime;
    const showtime = movie.dataset.showtime;
    const rating = movie.dataset.rating;


    const response = await fetch('/api/movies', {
        method: "POST",
        body: JSON.stringify({ title, runtime, showtime, rating }),
        headers: { 'Content-Type': 'application/json' },
    })
    if(!response.ok){
        alert("Failed to receieve tickets");
    }
    else{
        alert("Tickets receieved");
    }
}

