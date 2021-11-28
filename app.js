// Add DOM selectors to target input and UL movie list
var inp = document.querySelector("input");
var myMovieList = document.querySelector("ul");
var movieHistory = document.querySelector("#movieHistoryCard");
let watchList = {};

// Example of a simple function that clears the input after a user types something in
function clearInput() {
  inp.value = "";
}

function clearMovies() {
  // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTMLs
  myMovieList.innerHTML = "";
  watchList = {};
  movieHistory.innerHTML = `<h5 class="card-title">Movie History</h5>`;
}

// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
  // Step 1: Get value of input
  var text = inp.value;
  var userTypedText = text.toLowerCase();

  // Use Alert if the user does not enter a value for the movie name.

  // First Else If checks if the movie exists, it adds 1 to the watchList object value for that entry and recreates the movie history table then it calls clearInput.

  // Else adds the userTypedText to watchList object with default value 1 and recreates the movie history table.
  if (userTypedText === "") {
    alert("Please Enter A Movie Name");
    return;
  } else if (watchList[userTypedText]) {
    watchList[userTypedText]++;
    movieHistory.innerHTML = `<h5 class="card-title">Movie History</h5>
    <table>
      <tr>
        <th>Title</th>
        <th>Watched</th>
      </tr>
    ${Object.keys(watchList)
      .map((movie) => `<tr><td>${movie}</td><td>${watchList[movie]}</td></tr>`)
      .join("")}</table>`;
    clearInput();
    return;
  } else {
    watchList[userTypedText] = 1;
    movieHistory.innerHTML = `<h5 class="card-title">Movie History</h5>
    <table>
      <tr>
        <th>Title</th>
        <th>Watched</th>
      </tr>
      ${Object.keys(watchList)
        .map(
          (movie) => `<tr><td>${movie}</td><td>${watchList[movie]}</td></tr>`
        )
        .join("")}</table>`;
  }

  // Step 2: Create an empty <li></li>
  var li = document.createElement("li"); // <li></li>

  // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
  var textToInsert = document.createTextNode(userTypedText);

  // Step 4: Insert text into li
  // <li>Harry Potter </li>
  li.appendChild(textToInsert);

  // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
  myMovieList.appendChild(li);

  // Step 6: Call the clearInput function to clear the input field
  clearInput();
}


// function filterMovies() {
//   myMovieList.filter((movieName) => document.querySelector("#filter"));
// }
