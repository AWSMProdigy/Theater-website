var ticketHandler=async a=>{const b=document.querySelector("#"+a+"movie"),c=b.dataset.title,d=b.dataset.runtime,e=b.dataset.showtime,f=b.dataset.rating,g=b.dataset.img,h=await fetch("/api/movies",{method:"POST",body:JSON.stringify({title:c,runtime:d,showtime:e,rating:f,img:g}),headers:{"Content-Type":"application/json"}});h.ok?alert("Tickets receieved"):alert("Failed to receieve tickets")};

