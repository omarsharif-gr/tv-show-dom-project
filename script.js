//You can edit ALL of the code here

showID = 82;
function getAllEpisodes(showID = "82") {
  const url = `https://api.tvmaze.com/shows/${showID}/episodes`;
  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.warn(
          `Looks like there was a problem. Status Code: ${response.status}` +
            response.status
        );
        getAllEpisodes();
        return;
      }
      response.json().then(function (data) {
        allEpisodes = data;
        makePageForEpisodes(allEpisodes);
        outputResultsOfSearch();
        outputResultsOfDropdown(allEpisodes);
        selectShows();
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
function outputResultsOfSearch() {
  // Created input element for search Box. Appended this to nav element
  let searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.name = "searchBar";
  searchBox.id = "searchBar";
  searchBox.placeholder = "search here...";
  searchBox.classList.add("searchBar");
  navElement.appendChild(searchBox);
  let putEpisodesOnPage = document.getElementsByClassName("episodeClass");
  resultOfSearch = document.createElement("label");
  resultOfSearch.classList.add("mySearchResult");
  resultOfSearch.innerHTML = `Displaying ${putEpisodesOnPage.length}/73 episodes`;
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
        resultOfSearch.innerText = `Displaying ${newEpisodes.length}/73 episodes `;
      } else {
        episodeInArray.style.display = "none";
        resultOfSearch.innerText = `Displaying ${newEpisodes.length}/73 episodes `;
      }
      if (searchInput.length === 0) {
        resultOfSearch.innerText = `Displaying ${putEpisodesOnPage.length}/73 episodes `;
      }
    });
  }
}
function selectShows() {
  console.log("select shows run");
  let selectDropdownForShows = document.createElement("select");
  selectDropdownForShows.id = "dropdown1";
  selectDropdownForShows.name = "dropdown";
  navElement.appendChild(selectDropdownForShows);
  let optionDropdownForShows = document.createElement("option");
  optionDropdownForShows.innerHTML =
    "Click here to chose a show - this is the main menue";
  selectDropdownForShows.appendChild(optionDropdownForShows);
  listOfShows = getAllShows();
  for (let i = 0; i < listOfShows.length; i++) {
    option = document.createElement("option");
    option.value = listOfShows[i]["id"];
    option.innerHTML = `${listOfShows[i]["name"]} - ${listOfShows[i]["id"]}`;
    selectDropdownForShows.add(option);
  }
  selectDropdownForShows.addEventListener("change", () => {
      showID = selectDropdownForShows.options[selectDropdownForShows.selectedIndex].value
      getAllEpisodes(showID);
    })
}
function outputResultsOfDropdown(allEpisodes) {
  let selectDropdown = document.createElement("select");
  selectDropdown.id = "dropdown";
  selectDropdown.name = "dropdown";
  navElement.appendChild(selectDropdown);
  let optionDropdown = document.createElement("option");
  optionDropdown.innerHTML =
    "Click here to chose an episode - this is the main menue";
  selectDropdown.appendChild(optionDropdown);
  // Decalared the variable 'putEpisodesOnPage' again
  for (i = 0; i < allEpisodes.length; i++) {
    let moreOptions = document.createElement("option");
    moreOptions.innerHTML = `${allEpisodes[i]["name"]} - S0${allEpisodes[i]["season"]}E0${allEpisodes[i]["number"]}`;
    selectDropdown.appendChild(moreOptions);
  }
  selectDropdown.addEventListener("change", (e) => {
    let selectedOption = e.target.value;
    let putEpisodesOnPage = document.getElementsByClassName("episodeClass");
    allEpisodes.forEach((episode) => {
      if (episode.innerText.includes(selectedOption)) {
        episode.style.display = "";
      } else {
        episode.style.display = "none";
      }
      if (
        selectedOption ===
        "Click her to chose an episode - this is the main menue"
      ) {
        episode.style.display = "";
      }
    });
  });
  // let episodesOnPage = Array.from(allEpisodes);
  // const result = document.getElementById('root');
  // result.innerHTML = `You like ${event.target}`;
  // let output = event.target.value
  // if (episodesOnPage.innerText.includes(event.target)) {
  //     episodesOnPage.style.display = "";
  // }
  // });
}
function makePageForEpisodes(listOfEpisodes) {
  const rootElem = document.getElementById("root");
  let body = document.querySelector("body");
  let sectionLevel100 = document.createElement("section");
  sectionLevel100.classList.add("level100");
  sectionLevel100.classList.add("col-12");
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
      header.classList.add("col-4");
      header.innerHTML = `${listOfEpisodes[i]["name"]} - S0${listOfEpisodes[i]["season"]}E0${listOfEpisodes[i]["number"]}`;
      createDiv.appendChild(header);
      //create image tag with contents
      let image = document.createElement("img");
      image.src = `${listOfEpisodes[i]["image"]["medium"]}`;
      image.classList.add("col-4");
      createDiv.appendChild(image);
      //Create a paragraph with contents
      let paragraph = document.createElement("p");
      paragraph.innerHTML = `${listOfEpisodes[i]["summary"]}`;
      paragraph.classList.add("col-4");
      createDiv.appendChild(paragraph);
      console.log(i);
    }
    repeatFunction();
  }
}
window.onload = getAllEpisodes();