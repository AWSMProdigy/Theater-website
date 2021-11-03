var button = document.querySelector('#profileButton');
button.onclick = async function() {
    const response = await fetch("/api/users",{
        method:"GET", 
        headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
        document.replace("/")
        alert("user profile not found")
    }
}