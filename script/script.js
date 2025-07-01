let moviearray = [];
let details = '';
let casthtml = '';
//getting data from the api file//
const dataGather = async () => {
  const response = await fetch('https://jsonfakery.com/movies/paginated');
  const result = await response.json();
  return result;
};
//gathered data//
dataGather()
.then((result) => {
  moviearray = result.data;
  console.log(moviearray);

  moviearray.forEach((movie) => {
    details += ` 
    <div class="movie" data-id="${movie.movie_id}">
      <a href="tertiary.html" target="_self"> <img class="posters" src="${movie.backdrop_path}" alt="${movie.original_title}"></a> <h2 class="index-movie-title">${movie.original_title}</h2>
      <h2 class="movie-year">${new Date(movie.release_date).getFullYear()}</h2>

       </div>`;});  
  const movieContainer = document.querySelector('.moviecontainer');
  if (movieContainer) movieContainer.innerHTML = details;


  let index = 0;

function changeBackground() {
  const introElement = document.querySelector('.intro');
  if (!moviearray.length || index >= moviearray.length || !introElement) return;

  introElement.style.backgroundImage = `url('${moviearray[index].backdrop_path}')`;
  index = (index + 1) % moviearray.length;
}


if (moviearray.length > 0 && document.querySelector('.intro')) {
  changeBackground();
  setInterval(changeBackground, 4000);
}



    return moviearray;})
.then(()=>{document.querySelectorAll('.movie').forEach((element) => {
  element.addEventListener('click', (event) => {
    const movieId = parseInt(event.currentTarget.dataset.id);
  const clickedMovie = moviearray.find(movie => movie.movie_id === movieId);
  if (clickedMovie) 
    localStorage.setItem('movieDetails', JSON.stringify(clickedMovie));
    });
  });


})
.then(() => {const movieDetails=localStorage.getItem('movieDetails');
 
  
      if(!movieDetails) return;
        const movie = JSON.parse(movieDetails);
         let castDetails = movie.casts; 
        
         castDetails.forEach(actor => {
          casthtml += `<div class="cast">
            <img class="actor-pic" src="${actor.profile_path}" alt="${actor.name}">
            <h2>${actor.name}</h2>
             <h2 class="actor-character">${actor.character}</h2>
            </div>`
          })
         let preview = document.querySelector('.preview');
         
        if (preview) {
          preview.innerHTML = `
           <div style="
      background-image:url(${movie.backdrop_path});
      background-size: cover; 
      background-position: center; 
      background-repeat: no-repeat;
      position: relative;
  
      " > <div class="secondary-preview"><img class="secondary-poster" src="${movie.backdrop_path}" alt="${movie.original_title}">

            <div class="secondary-preview-details"><h1>${movie.original_title}</h1>
<h2>${new Date(movie.release_date).getFullYear()}  ${movie.original_language}    </h2>
<h2><img class="imdb" src="imdb.png"> ${movie.vote_average} <img src="bar-icon.png" class="imdb"> ${movie.popularity}</h2>
<h2><button>&#9658; watch free</button>  <img src="bookmak.jpg" class="bookmarkicon">  <button>&#10004; </button> <img src="upload.jpg" class="upload">   </h2>
<p class="overview">${movie.overview}</p>

          
    </div></div>
          <h2>Cast of ${movie.original_title}</h2>
  <div class="secondary-cast">
  
        ${casthtml}
        </div> </div>`;}
        console.log(movie);
        })     
.catch(error => { console.error('Error fetching data:', error); });
