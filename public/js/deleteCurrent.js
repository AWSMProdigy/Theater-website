const deleteHandler = async (event) => {
    event.preventDefault();
    const userName = document.querySelector("#userRequest").innerHTML;

    const response = await fetch('/api/friends/', {
        method: 'DELETE',
        body: JSON.stringify({ userName }),
        headers: { 'Content-Type': 'application/json' },
    })
    if(!response.ok){
        alert("Failed to delete friendship");
    }
    else{
        alert("Friendship deleted");
        location.reload();
    }
}

document
.querySelector('#deleteFriendBtn')
.addEventListener('click', deleteHandler);