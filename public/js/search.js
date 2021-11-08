const searchHandler = async (event) => {
    event.preventDefault();

    const search = document.querySelector("#searchInput").value.trim();

    if(search){
        location.replace('/search/'+search)
    }
    else {
        alert("Search box cannot be empty");
    }
}

document
 .querySelector('#searchForm')
 .addEventListener('submit', searchHandler);