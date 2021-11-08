const addFriendHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#addFriend-input").value.trim();

    if(username){
        const response = await fetch('/api/friends/', {
            method: 'POST',
            body: JSON.stringify({ username }),
            headers: { 'Content-Type': 'application/json' },
        });
        if(!response.ok){
            alert("Failed to send friend request");
        }
        else{
            alert("Friend request sent");
            location.reload();
        }
    }
    else {
        alert("Friend username cannot be null");
    }
}


 document
 .querySelector('.addFriend-form')
 .addEventListener('submit', addFriendHandler);