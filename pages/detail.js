
let commentTemplate = document.querySelector("[comment-template]")

const apiKey = "ee11425cb86b9ac9105505b5ec2b12f9";
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");


const movieDetails = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`

fetch(movieDetails)
  .then(res => res.json())
  .then(data => {  

    console.log(data)

    document.getElementById("title").innerHTML = data.original_title;
    document.getElementById("img").src = `https://image.tmdb.org/t/p/w200${data.poster_path}?api_key=${apiKey}`
    data.genres.forEach(genre => {
        document.getElementById("genre").innerHTML += genre.name + " " 
    });
    document.getElementById("description").innerHTML = data.overview;
    document.getElementById("count").innerHTML = data.vote_count;

    



  })
  .catch(err => console.error(err));


  movieComments = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`

  fetch(movieComments)
  .then(res => res.json())
  .then(data => {  


    data.results.forEach(review => {
        let template = commentTemplate.content.cloneNode(true).children[0];
        let author = template.querySelector(".author");
        let comment = template.querySelector(".comment");

        author.innerHTML = review.author
        comment.innerHTML = review.content
        
        
        document.getElementById("comments").append(template);

    });


  })
  .catch(err => console.error(err));



  movieVideo = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`

  fetch(movieVideo)
  .then(res => res.json())
  .then(data => {  

console.log(data)

 let randomTrailer =Math.floor( Math.random() * data.results.length - 1)

 document.getElementById("vid").src = `https://www.youtube.com/embed/${data.results[randomTrailer].key}`

 console.log(randomTrailer)
 

  })
  .catch(err => console.error(err));
  

  function addOne() {
    document.getElementById("count").innerHTML = parseInt(document.getElementById("count").innerHTML) + 1; 
  }



