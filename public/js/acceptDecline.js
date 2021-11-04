const acceptHandler = async (event) => {
    event.preventDefault();
    const userName = document.querySelector("#userRequest").innerHTML;

    const response = await fetch('/api/friends/', {
        method: 'PUT',
        body: JSON.stringify({ userName }),
        headers: { 'Content-Type': 'application/json' },
    })
    if(!response.ok){
        alert("Failed to send friend request");
    }
    else{
        alert("Friend request accepted");
    }
}

const declineHandler = async (event) => {
    event.preventDefault();
    const userName = document.querySelector("#userRequest").innerHTML;

    const response = await fetch('/api/friends/', {
        method: 'PUT',
        body: JSON.stringify({ userName }),
        headers: { 'Content-Type': 'application/json' },
    })
    if(!response.ok){
        alert("Failed to send friend request");
    }
    else{
        alert("Friend request accepted");
    }
}

document
.querySelector('#acceptRequestBtn')
.addEventListener('onClick', acceptHandler);
document
.querySelector('#declineRequestBtn')
.addEventListener('onClick', declineHandler);