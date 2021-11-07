var ticketHandler = async (event) => {
    event.preventDefault();
    console.log("Get Tickets clicked");
    const movie = document.querySelector('#movie');
    const title = movie.dataset.title;
    const runtime = movie.dataset.runtime;
    const showtime = movie.dataset.showtime;
    const rating = movie.dataset.rating

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

document
.querySelector('#getTicket')
.addEventListener('click', ticketHandler);