
var moviebox  = document.getElementById("movie-box");
var viewSingleMovie = document.getElementById("viewMovie");
var movieForm =  document.querySelector("form");
var imdbID = document.getElementById("imdbID");

//Creates the HTTP request Object
function createRequestObject(){
    var request;

    if(window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }else{
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return request;
}


//Performs the HTTP request
function doPostHttpRequest(url, postParam){

    var request = createRequestObject();
    request.open("POST", url, false);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('qry=' + encodeURIComponent(postParam));
    return request;

}


function doGetHttpRequest(url){
    var request = createRequestObject();
    request.open('GET', url, false);
    request.send();
    return request;

}



//Gets a movie when the movie search form is submitted
function getMovieByTitle(){
    var postParam = document.getElementById("qry").value;
    return  doPostHttpRequest('/movie', postParam);

}
// gets a single movie with the detail link is clicked

function getMovieByImDBId(id){

    var url = "/movie/"+id;
    return doGetHttpRequest(url);

}
/**
 * handles movies search form submission
 */
movieForm.addEventListener("submit", function(event) {
    moviebox.style.display = "none";
    console.log('hide car now');
    event.stopPropagation();
    //console.log(getMovieByTitle());
  updateMoviePreviewCard(getMovieByTitle());

    event.preventDefault();

});


/**
 * populates movie card
 * @param movieObject
 */
function updateMoviePreviewCard(movieObject){

    // console.log("final and all");
    // console.log(JSON.parse(movieObject.responseText));
    var movie = JSON.parse(movieObject.responseText);

    document.getElementById("poster").setAttribute("src", movie.Poster);
    document.getElementById("title").innerHTML = movie.Title;
    document.getElementById("year").innerHTML = movie.Year;
    document.getElementById("rating").innerHTML = movie.Rated;
    document.getElementById("flag").innerHTML = movie.Country;
    document.getElementById("time").innerHTML = movie.Runtime;
    imdbID.value = movie.imdbID;
   // console.log(imdbID.value);
    document.getElementById("card").style.display = "block";

  // console.log(movie);

}


/**
 * hides movie list and diplays modal for full movie details
 */
viewSingleMovie.addEventListener("click", function(event) {

    document.getElementById("card").style.display = "none";
   moviebox.style.display = "block";
    var movie = JSON.parse(getMovieByImDBId(imdbID.value).responseText);
    updateDetailedMoviePreview(movie);
    console.log(movie);
});



function updateDetailedMoviePreview(movieOBject){
    console.log(movieOBject.Poster);
    document.getElementById('detail-poster').setAttribute('src', movieOBject.Poster);
    document.getElementById('detail-title').innerHTML = movieOBject.Title;
    document.getElementById('detail-year').innerHTML = movieOBject.Year;
    document.getElementById('detail-plot').innerHTML = movieOBject.Plot;
    document.getElementById('detail-director').innerHTML = movieOBject.Director;
    document.getElementById('detail-writer').innerHTML = movieOBject.Writer;
    document.getElementById('detail-actors').innerHTML = movieOBject.Actors;
    document.getElementById('detail-awards').innerHTML = movieOBject.Awards;
    document.getElementById('detail-country').innerHTML = movieOBject.Country;
    document.getElementById('detail-genre').innerHTML = movieOBject.Genre;
    document.getElementById('detail-language').innerHTML = movieOBject.Language;
    document.getElementById('detail-metascore').innerHTML = movieOBject.Metascore;
    document.getElementById('detail-rated').innerHTML = movieOBject.Rated;
    document.getElementById('detail-released').innerHTML = movieOBject.Released;
    document.getElementById('detail-runtime').innerHTML = movieOBject.Runtime;
    document.getElementById('detail-writer').innerHTML = movieOBject.Writer;
    document.getElementById('detail-type').innerHTML = movieOBject.Type;
}


/**
 * closes the modal and displays movie list
 */
moviebox.addEventListener("click", function(event) {
    moviebox.style.display = "none";
    document.getElementById("card").style.display = "block";
});







