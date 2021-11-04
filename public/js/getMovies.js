var omdbApiKey = "a833138c";

function getMovieIdPosters(title) {
  var movieIdLookupUrl =
    "https://www.omdbapi.com/?apikey=" + omdbApiKey + "&t=" + title;
  fetch(movieIdLookupUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      obj.title = data.Title;
      obj.year = data.Year;
      obj.plot = data.Plot;
      console.log(data.imdbID);
      Id = data.imdbID;
      verifyId(Id);
    });
  }

  function getMovieIdPosters(title) {
    var movieIdLookupUrl =
      "https://www.omdbapi.com/?apikey=" + omdbApiKey + "&t=" + title;
    fetch(movieIdLookupUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        obj.title = data.Title;
        obj.year = data.Year;
        obj.plot = data.Plot;
        console.log(data.imdbID);
        Id = data.imdbID;
        verifyId(Id);
      });
  }

  function getMovieId(event) {
    event.preventDefault();
    var movieTitle = searchInput.value.trim();
    searchForm.reset();
    var movieIdLookupUrl =
      "https://www.omdbapi.com/?apikey=" + omdbApiKey + "&t=" + movieTitle;
    fetch(movieIdLookupUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        obj.title = data.Title;
        obj.year = data.Year;
        obj.plot = data.Plot;
        console.log(data.imdbID);
        Id = data.imdbID;
        verifyId(Id);
      });
  }