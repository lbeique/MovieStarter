// Add DOM selectors to target input and UL movie list
var inp = document.querySelector("input");
var myMovieList = document.querySelector("ul");
var movieHistory = document.querySelector("#movieHistoryCard");
const filterInput = document.getElementById("filter");

// This function reads the local storage and returns an object or array
const readLocalStorage = (localItem) => {
  if (localItem === 'localMovieList') {
    if (!JSON.parse(window.localStorage.getItem(localItem))) {
      return [];
    } else {
      return JSON.parse(window.localStorage.getItem(localItem));
    }
  } else {
    if (!JSON.parse(window.localStorage.getItem(localItem))) {
      return {};
    } else {
      return JSON.parse(window.localStorage.getItem(localItem));
    }
  }
}

// This function takes an object or array and writes it to local storage
const writeLocalStorage = (list, localLocation) => {
  window.localStorage.setItem(localLocation, JSON.stringify(list));
}

// This function creates and populates the HTML Movie History table
const makeTable = (historyList) => {
  movieHistory.innerHTML = `<h5 class="card-title">Movie History</h5>
  <table>
    <tr>
      <th>Title</th>
      <th>Watched</th>
    </tr>
  ${Object.keys(historyList)
      .map((movie) => `<tr><td>${movie}</td><td>${historyList[movie]}</td></tr>`)
      .join("")}</table>`;
}

// This function will titleCase the movie title
const titleCase = (title) => {
  return title.toLowerCase().split(' ').map((word) => word.replace(word.charAt(0), word.charAt(0).toUpperCase())).join(' ');
}

// Example of a simple function that clears the input after a user types something in
function clearInput() {
  inp.value = "";
}

function clearMovies() {
  // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTMLs
  myMovieList.innerHTML = "";
  localStorage.removeItem('localMovieList');
}

// This function creates and populates the HTML Movie List
const makeListWrap = (movieList) => {
  myMovieList.innerHTML = ``;
  movieList.map((movie) => makeList(movie));
}

// This function creates a List item
const makeList = (movie) => {
  // Step 2: Create an empty <li></li>
  var li = document.createElement("li"); // <li></li>

  // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
  var textToInsert = document.createTextNode(movie);

  // Step 4: Insert text into li
  // <li>Harry Potter </li>
  li.appendChild(textToInsert);

  // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
  myMovieList.appendChild(li);
}

// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
  // Step 1: Get value of input
  var text = inp.value;

  // Convert user input to title casing
  var userTypedText = titleCase(text);

  // Read local storage and create watch history list object
  const historyList = readLocalStorage('localHistoryList');

  // Read local storage and create movie list array
  const movieList = readLocalStorage('localMovieList');

  // Use Alert if the user does not enter a value for the movie name.
  if (userTypedText === "") {
    alert("Please Enter A Movie Name");
    return;

    // First Else If checks if the movie exists in list, adds value to historyList, creates history table and writes list to local storage
  } else if (historyList[userTypedText]) {
    historyList[userTypedText]++;
    makeTable(historyList);
    writeLocalStorage(historyList, 'localHistoryList');
    return;

    // Else adds the input to the history list, creates the html history table, and writes to history list to local storage. 
    // Then pushes input to movie list, creates the html movie list, and writes movielist to local storage.
  } else {
    historyList[userTypedText] = 1;
    makeTable(historyList);
    writeLocalStorage(historyList, 'localHistoryList');
    movieList.push(userTypedText);
    makeListWrap(movieList);
    writeLocalStorage(movieList, 'localMovieList');
  }

  // Step 6: Call the clearInput function to clear the input field
  clearInput();
}

// This creates the move list based on the filter box user input
filterInput.addEventListener('input', () => {
  // This reads the move list array stored inside local storage
  const movieList = readLocalStorage('localMovieList');
  // This loads the text inside the filter box
  let inputText = document.getElementById('filter').value;
  // If statement used to determine what to write in the html list
  if (inputText) {
    // This filters through the movie list based on the filter box input and writes a new html list 
    makeListWrap(movieList.filter((keys) => keys.toLowerCase().includes(inputText.toLowerCase())));
  } else {
    // If the filter box is empty, this writes the html list using the movie list array stored inside local storage
    makeListWrap(movieList);
  }
});

// This creates the movie history table and movie list stored in local storage
window.addEventListener('load', () => {
  if (JSON.parse(window.localStorage.getItem('localHistoryList'))) {
    makeTable(JSON.parse(window.localStorage.getItem('localHistoryList')));
  }
  if (JSON.parse(window.localStorage.getItem('localMovieList'))) {
    makeListWrap(JSON.parse(window.localStorage.getItem('localMovieList')));
  }
});
