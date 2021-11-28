// Add DOM selectors to target input and UL movie list
var inp = document.querySelector("input");
var myMovieList = document.querySelector("ul");
var movieHistory = document.querySelector("#movieHistoryCard");
const filterInput = document.getElementById("filter");

// This function reads the local storage and returns an object
const readLocalStorage = () => {
  if (!JSON.parse(window.localStorage.getItem('localMovieList'))) {
    return {};
  } else {
    return JSON.parse(window.localStorage.getItem('localMovieList'));
  }
}

// This function reads the session storage and returns an array
const readSessionStorage = () => {
  if (!JSON.parse(window.sessionStorage.getItem("sessionMovieList"))) {
    return [];
  } else {
    return JSON.parse(window.sessionStorage.getItem("sessionMovieList"));
  }
}

// This function takes an object and writes it to local storage
const writeLocalStorage = (localMovieList) => {
  window.localStorage.setItem('localMovieList', JSON.stringify(localMovieList));
}

// This function takes an array and writes it to session storage
const writeSessionStorage = (sessionMovieList) => {
  window.sessionStorage.setItem('sessionMovieList', JSON.stringify(sessionMovieList));
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

// This function creates and populates the HTML Movie List


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
  sessionStorage.clear();
}

// This function creates and populates the HTML Movie List
const makeListWrap = (sessionList) => {
  myMovieList.innerHTML = ``;
  sessionList.map((movie) => makeList(movie));
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
  const historyList = readLocalStorage();

  // Read session storage and create movie list array
  const sessionList = readSessionStorage();

  // Use Alert if the user does not enter a value for the movie name.
  if (userTypedText === "") {
    alert("Please Enter A Movie Name");
    return;

    // First Else If checks if the movie exists, it adds 1 to the historyList object value for that entry and recreates the movie history table then it calls clearInput.
  } else if (historyList[userTypedText]) {
    historyList[userTypedText]++;
    makeTable(historyList);
    writeLocalStorage(historyList);
    return;

    // Else adds the userTypedText to historyList object with default value 1 and recreates the movie history table.
  } else {
    historyList[userTypedText] = 1;
    makeTable(historyList);
    writeLocalStorage(historyList);
    sessionList.push(userTypedText);
    makeListWrap(sessionList);
    writeSessionStorage(sessionList);
  }

  // Step 6: Call the clearInput function to clear the input field
  clearInput();
}

// This creates the move list based on the filter box user input
filterInput.addEventListener('input', () => {
  // This reads the move list array stored inside session storage
  const sessionList = readSessionStorage();
  // This loads the text inside the filter box
  let inputText = document.getElementById('filter').value;
  // If statement used to determine what to write in the html list
  if (inputText) {
    // This filters through the movie list based on the filter box input and writes a new html list 
    makeListWrap(sessionList.filter((keys) => keys.toLowerCase().includes(inputText.toLowerCase())));
  } else {
    // If the filter box is empty, this writes the html list using the movie list array stored inside session storage
    makeListWrap(sessionList);
  }
});

// This creates the movie history table based on local storage
window.addEventListener('load', () => {
  if (JSON.parse(window.localStorage.getItem('localMovieList'))) {
    makeTable(JSON.parse(window.localStorage.getItem('localMovieList')));
  }
  sessionStorage.clear();
});
