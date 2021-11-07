const viewHandler = async (event) => {
    event.preventDefault();
    const userName = document.querySelector("#userRequest").innerHTML;

    const response = await fetch('api/friends/profile/' + userName, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    if(!response.ok){
        alert("Failed to view friend");
    }
}


document
.querySelector('#viewProfileBtn')
.addEventListener('click', viewHandler);