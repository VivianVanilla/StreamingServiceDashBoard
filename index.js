const apiKey = "ee11425cb86b9ac9105505b5ec2b12f9";
let moviePath = ""
let response = ""


let movieImage = `https://image.tmdb.org/t/p/w100${moviePath}?api_key=${apiKey}`

let template = document.querySelector("[data-movie-search]")
const browseArea = document.querySelector(".grid");


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTExNDI1Y2I4NmI5YWM5MTA1NTA1YjVlYzJiMTJmOSIsIm5iZiI6MTc0MTcyMTQ5MC42OTgsInN1YiI6IjY3ZDA4ZjkyNDM0Yzk4YzhlYzgxNDFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Oots_HTdFvgU6lzVMAG9pJVt7F59Vu3mEh-S8Zx4-c'
    }
  };



 

 


  function search() {
    while (browseArea.firstChild) {
      browseArea.removeChild(browseArea.firstChild);
}

let searchInput = ""
 searchInput = document.querySelector("#searchbar").value;

 const movieSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}&include_adult=true&language=en-US&page=1`;

 fetch(movieSearch, options)
 .then(res => res.json())
 .then(data => { response = data.results; 

  response.forEach(movie => {
    const movieTemplate = template.content.cloneNode(true).children[0];
    const poster = movieTemplate.querySelector("[data-image]");
    const title = movieTemplate.querySelector("[data-title]");


   
    
    if (movie.poster_path) {
     poster.src = `https://image.tmdb.org/t/p/w92${movie.poster_path}?api_key=${apiKey}`
    } else {
      poster.src = `https://image.tmdb.org/t/p/w92/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg?api_key=ee11425cb86b9ac9105505b5ec2b12f9` }

    title.innerHTML = movie.title
    poster.id = movie.id


    browseArea.append(movieTemplate);
  });

 })
 .catch(err => console.error(err));
  }

  function displayDetails(event) {
     
    let selectedMovie = event.target.closest('[data-image]')
    let movieId = selectedMovie.id;
    const movieDetails = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
 
    fetch(movieDetails, options)
    .then(res => res.json())
    .then(data => {  
  
      window.open(`pages/detail.html?id=${movieId}`, "_self") 
  
  
  
    })
    .catch(err => console.error(err));

  }



  function popularMovies() {

    while (browseArea.firstChild) {
      browseArea.removeChild(browseArea.firstChild); }

  let popularMovie = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`

  fetch(popularMovie, options)
 .then(res => res.json())
 .then(data => { response = data.results; 

  response.forEach(movie => {
    const movieTemplate = template.content.cloneNode(true).children[0];
    const poster = movieTemplate.querySelector("[data-image]");
    const title = movieTemplate.querySelector("[data-title]");


   
    
    if (movie.poster_path) {
     poster.src = `https://image.tmdb.org/t/p/w92${movie.poster_path}?api_key=${apiKey}`
    } else {
      poster.src = `https://image.tmdb.org/t/p/w92/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg?api_key=ee11425cb86b9ac9105505b5ec2b12f9` }

    title.innerHTML = movie.title
    poster.id = movie.id


    browseArea.append(movieTemplate);

  }); })
  }
popularMovies();

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


function toggleFavorite(event) {
    // event.stopPropagation(); 
    const movieElement = event.target.closest("div");
    const imgElement = movieElement.querySelector("[data-image]");
    const titleElement = movieElement.querySelector("[data-title]");

    const movie = {
        id: imgElement.id,
        title: titleElement.innerText,
        poster: imgElement.src
    };

    const index = favorites.findIndex(fav => fav.id === movie.id);

    if (index === -1) {
        favorites.push(movie);
        event.target.classList.add("text-red-500"); 
        
    } else {
        favorites.splice(index, 1);
        event.target.classList.remove("text-red-500"); 
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
}


function loadFavorites() {
    const browseArea = document.querySelector(".grid");
    browseArea.innerHTML = "";

    favorites.forEach(movie => {
        const movieTemplate = template.content.cloneNode(true).children[0];
        const poster = movieTemplate.querySelector("[data-image]");
        const title = movieTemplate.querySelector("[data-title]");
        const heartIcon = movieTemplate.querySelector(".fa-heart");

        poster.src = movie.poster;
        title.innerText = movie.title;
        poster.id = movie.id;

        heartIcon.classList.add("text-red-500"); 

        browseArea.append(movieTemplate);
    });
}