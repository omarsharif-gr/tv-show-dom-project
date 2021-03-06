//You can edit ALL of the code here

let showID;
//Overall function to output episodes on to the page.
function getAllEpisodes(showID = "82") {
  let rootElem = document.getElementById("root");
  rootElem.innerHTML = ""
  let header = document.getElementsByTagName("nav");
  navElement.innerHTML = ""
  const url = `https://api.tvmaze.com/shows/${showID}/episodes`;
  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.warn(
          `Looks like there was a problem. Status Code: ${response.status}` + response.status);
        getAllEpisodes();
        return;
      }
      response.json().then(function (data) {
        allEpisodes = data;
        makePageForEpisodes(allEpisodes);
        outputResultsOfSearch(allEpisodes);
        outputResultsOfDropdown(allEpisodes);
        createRevertButton();
      });
    })
    .catch(function (err) {
      console.error("Fetch Error -", err);
    });
}
// created header
let header = document.querySelector("header");
// created nav element and appended it to the header element
let navElement = document.createElement("nav");
header.appendChild(navElement);

//Function to define a search bar and output results of the search bar once user enters data
function outputResultsOfSearch(allEpisodes) {
  // Created input element for search Box. Appended this to nav element
  let searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.name = "searchBar";
  searchBox.id = "searchBar";
  searchBox.placeholder = "search here...";
  searchBox.classList.add("searchBar", "col-4");
  navElement.appendChild(searchBox);
  let putEpisodesOnPage = document.getElementsByClassName("episodeClass");
  resultOfSearch = document.createElement("label");
  resultOfSearch.classList.add("searchBar");
  resultOfSearch.innerHTML = `Displaying ${putEpisodesOnPage.length}/${allEpisodes.length}`;
  resultOfSearch.classList.add("searchBar", "col-4");
  navElement.appendChild(resultOfSearch);
  searchBox.addEventListener("keyup", searchEpisodes);
  function searchEpisodes(e) {
    let searchInput = e.target.value.toLowerCase();
    let episodesOnPage = Array.from(putEpisodesOnPage);
    let newEpisodes = [];
    episodesOnPage.forEach((episodeInArray) => {
      if (episodeInArray.innerText.toLowerCase().includes(searchInput)) {
        episodeInArray.style.display = "";
        newEpisodes.push(episodeInArray);
        resultOfSearch.innerText = `Displaying ${newEpisodes.length}/${episodesOnPage.length} episodes `;
      } else {
        episodeInArray.style.display = "none";
        resultOfSearch.innerText = `Displaying ${newEpisodes.length}/${episodesOnPage.length} episodes `;
      }
      if (searchInput.length === 0) {
        resultOfSearch.innerText = `Displaying ${putEpisodesOnPage.length}/${episodesOnPage.length} episodes `;
      }
    });
  }
}

//Function to create a dropdown that displays shows and to display their respective episodes.
function selectShows() {
  console.log("select shows run");
  let selectDropdownForShows = document.createElement("select");
  selectDropdownForShows.id = "dropdown1";
  selectDropdownForShows.name = "dropdown";
  selectDropdownForShows.classList.add("searchBar", "col-4");
  navElement.appendChild(selectDropdownForShows);
  let optionDropdownForShows = document.createElement("option");
  optionDropdownForShows.innerHTML = "Click here to chose a show - this is the main menue";
  selectDropdownForShows.appendChild(optionDropdownForShows);
  listOfShows = getAllShows();
  for (let i = 0; i < listOfShows.length; i++) {
    option = document.createElement("option");
    option.value = listOfShows[i]["id"];
    option.innerHTML = `${listOfShows[i]["name"]} - ${listOfShows[i]["id"]}`;
    selectDropdownForShows.add(option);
  }
  selectDropdownForShows.addEventListener("change", () => {
    showID = selectDropdownForShows.options[selectDropdownForShows.selectedIndex].value;
    getAllEpisodes(showID);
  })
}
//Function to create a dropdown for episodes and to allow users to select specific episodes that they want to view.
function outputResultsOfDropdown(allEpisodes) {
  let selectDropdown = document.createElement("select");
  selectDropdown.id = "dropdown";
  selectDropdown.name = "dropdown";
  selectDropdown.classList.add("searchBar", "col-4");
  navElement.appendChild(selectDropdown);
  let optionDropdown = document.createElement("option");
  optionDropdown.innerHTML = "Click here to chose an episode - this is the main menue";
  selectDropdown.appendChild(optionDropdown);
  for (i = 0; i < allEpisodes.length; i++) {
    let moreOptions = document.createElement("option");
    moreOptions.innerHTML = `${allEpisodes[i]["name"]} - S0${allEpisodes[i]["season"]}E0${allEpisodes[i]["number"]}`;
    selectDropdown.appendChild(moreOptions);
  }
  selectDropdown.addEventListener("change", searchEpisodes);
  let putEpisodesOnPage = document.getElementsByClassName("episodeClass");
  function searchEpisodes(e) {
    let searchInput = e.target.value;
    let episodesOnPage = Array.from(putEpisodesOnPage);
    let newEpisodes = [];
    episodesOnPage.forEach((episodeInArray) => {
      if (episodeInArray.innerText.includes(searchInput)) {
        episodeInArray.style.display = "";
      } else {
        episodeInArray.style.display = "none";
      }
      if (searchInput === "Click here to chose an episode - this is the main menue") {
        episodeInArray.style.display = "";
      }
    })
  }
}
//Function to create a page structure for the episodes.
function makePageForEpisodes(listOfEpisodes) {
  const rootElem = document.getElementById("root");
  let body = document.querySelector("body");
  let sectionLevel100 = document.createElement("section");
  sectionLevel100.classList.add("level100");
  // sectionLevel100.classList.add("col-12");
  rootElem.appendChild(sectionLevel100);
  for (let i = 0; i < listOfEpisodes.length; i++) {
    //define function to repeat the three different episodes
    function repeatFunction() {
      //Create Div
      let createDiv = document.createElement("div");
      createDiv.classList.add("col-4");
      createDiv.classList.add("episodeClass");
      sectionLevel100.appendChild(createDiv);
      //Create Header with contents
      let header = document.createElement("h1");
      header.classList.add("col-10");
      header.innerHTML = `${listOfEpisodes[i]["name"]} - S0${listOfEpisodes[i]["season"]}E0${listOfEpisodes[i]["number"]}`;
      createDiv.appendChild(header);
      //create image tag with contents
      let image = document.createElement("img");
      image.src = `${listOfEpisodes[i]["image"]["medium"]}`;
      image.classList.add("col-10");
      createDiv.appendChild(image);
      //Create a paragraph with contents
      let paragraph = document.createElement("p");
      paragraph.innerHTML = `${listOfEpisodes[i]["summary"]}`;
      paragraph.classList.add("col-10");
      createDiv.appendChild(paragraph);
    }
    repeatFunction();
  }
}
//Function to create a new page for 'shows' from the shows.js file. Defines the structure and the contents to be displayed for each show.
function createNewPageForShows() {
  let rootElem = document.getElementById("root");
  let listOfShows = getAllShows();
  for (let i = 0; i < listOfShows.length; i++){
    let showDetailsSection = document.createElement("section");
    showDetailsSection.classList.add("col-12", "episodeClass");
    rootElem.appendChild(showDetailsSection);
    // Title:
    let showTitleWrapper = document.createElement("a");
    let showTitle = document.createElement("h3");
    showTitleWrapper.classList.add("col-12");
    showTitle.classList.add("col-12");
    showTitle.id = listOfShows[i].id;
    showTitle.addEventListener("click", getEpisodes);
    function getEpisodes(e) {
      showID = +e.target.id;
      rootElem.innerHTML = "";
      getAllEpisodes(showID);
    }
    showTitle.innerHTML = `${listOfShows[i]["name"]}`;
    showTitleWrapper.appendChild(showTitle);
    showDetailsSection.appendChild(showTitleWrapper);
    // div
    let divInSection = document.createElement("div");
    divInSection.classList.add("col-12", "changeStructure");
    showDetailsSection.appendChild(divInSection);
    // Image:
    let showImage = document.createElement("img");
    showImage.setAttribute("src", `${showFullImage(listOfShows, i)}`);
    showImage.classList.add("col-3", "imageDimensions");
    divInSection.appendChild(showImage);
     // showSummary:
    let showSummary = document.createElement("div");
    showSummary.innerHTML = `${listOfShows[i].summary}`;
    showSummary.classList.add("col-6");
    divInSection.appendChild(showSummary);
    // Show Details:
    let showDetails = document.createElement("div");
    showDetails.classList.add("col-3");
    divInSection.appendChild(showDetails);
      // Rated:
    let rated = document.createElement("h6");
    rated.innerHTML = `Rated: ${listOfShows[i]["rating"]["average"]}`;
      // Genres:
    let genres = document.createElement("h6");
    genres.innerHTML = `Genres: ${listOfShows[i]["genres"]}`;
      // Status:
    let status = document.createElement("h6");
    status.innerHTML = `Status: ${listOfShows[i]["status"]}`;
      // Runtime:
    let runtime = document.createElement("h6");
    runtime.innerHTML = `Runtime: ${listOfShows[i]["runtime"]}`;

    showDetails.append(rated, genres, status, runtime);
  }
}
//Function with condition to tackle the image error output.
function showFullImage(listOfShows, i) {
  if (listOfShows[i]["image"] === null) {
    return ("issue");
  }
  else {
    return listOfShows[i]["image"]["medium"];
  }
}
// Function to create a revert button that will be output on the episodes page that -when clicked- reverts the user back to the shows page.
function createRevertButton() {
  let button = document.createElement("button");
  button.id = "revertButton";
  button.innerHTML = "Select a different show";
  button.classList.add("revertButton", "col-4");
  button.addEventListener("click", buttonClicked);
  function buttonClicked() {
    let rootElem = document.getElementById("root");
    rootElem.innerHTML = "";
    navElement.innerHTML = "";
    createdNewPagForShows();
  }
  navElement.appendChild(button);
}
//Overall function to display page with all shows.
function createdNewPagForShows() {
  let searchShows = getAllShows();
  createNewPageForShows();
  outputResultsOfSearch(searchShows);
  selectShows();
}
window.onload = createdNewPagForShows();