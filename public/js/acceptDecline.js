const acceptHandler = async (event) => {
    event.preventDefault();
    const userName = document.querySelector("#incoming").innerHTML;

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
        location.reload();
    }
}

const declineHandler = async (event) => {
    event.preventDefault();
    const userName = document.querySelector("#incoming").innerHTML;

    const response = await fetch('/api/friends/incoming', {
        method: 'DELETE',
        body: JSON.stringify({ userName }),
        headers: { 'Content-Type': 'application/json' },
    })
    if(!response.ok){
        alert("Failed to decline friend request");
    }
    else{
        alert("Friend request declined");
        location.reload();
    }
}

document
.querySelector('#acceptRequestBtn')
.addEventListener('click', acceptHandler);
document
.querySelector('#declineRequestBtn')
.addEventListener('click', declineHandler);