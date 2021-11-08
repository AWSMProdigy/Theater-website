var ticketHandler = async (event) => {
    console.log(EventTarget);
    console.log("Get Tickets clicked");
    // const movie = event.querySelector('#movie');
    const title = EventTarget.dataset.title;
    const runtime = EventTarget.dataset.runtime;
    const showtime = EventTarget.dataset.showtime;
    const rating = EventTarget.dataset.rating

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

