//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  let body = document.querySelector("body");
  let searchBox = document.createElement("input");
  searchBox.type = "text"
  searchBox.name = "searchBar"
  searchBox.id = "searchBar"
  searchBox.placeholder = "search here..."
  searchBox.classList.add("searchBar");
  body.appendChild(searchBox)
  //Get input element
  let filterInput = document.getElementById("searchBar")
  
  filterInput.addEventListener("keyup", (e) => {
    let result = e.target.value.toLowerCase();

    const filtered = allEpisodes.filter((movie) => {
      return movie.name.toLowerCase().includes(result) || movie.summary.toLowerCase().includes(result);
    });
    
    makePageForEpisodes(filtered)
    repeatFunction(filtered)
  });
  //create for loop
  for (let i = 0; i <= 73; i++) {
    let sectionLevel100 = document.createElement("section");
    sectionLevel100.classList.add("col-12");
    sectionLevel100.classList.add("level100");
    body.appendChild(sectionLevel100);
    //define function to repeat the three different episodes
    function repeatFunction(){
      //Create Div
      let createDiv = document.createElement("div");
      createDiv.classList.add("col-4");
      sectionLevel100.appendChild(createDiv);
      //Create Header with contents
      let header = document.createElement("h1");
      header.classList.add("col-4");
      header.innerHTML = `${allEpisodes[i]["name"]} - S0${allEpisodes[i]["season"]}E0${allEpisodes[i]["number"]}`;
      createDiv.appendChild(header);
      
      //create image tag with contents
      let image = document.createElement("img")
      image.src = `${allEpisodes[i]["image"]["medium"]}`
      image.classList.add("col-4");
      createDiv.appendChild(image)
      
      //Create a paragraph with contents
      let paragraph = document.createElement("p");
      paragraph.innerHTML = `${allEpisodes[i]["summary"]}`
      paragraph.classList.add("col-4");
      createDiv.appendChild(paragraph)
      //Ensured that 'i' is still being incremented.
      i++;
    }
    repeatFunction()
    repeatFunction()
    repeatFunction()
  }
  let footerContainer = document.createElement("footer");
  footerContainer.innerHTML="Data on this site is taken from TV MAZE API"
  footerContainer.classList.add("footer-cont")
  body.appendChild(footerContainer)
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  console.log("Hi");
}

window.onload = setup;
