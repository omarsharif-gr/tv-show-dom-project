//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  let body = document.querySelector("body");
  let searchBox = document.createElement("input")
  searchBox.type = "text"
  searchBox.name = "searchBar"
  searchBox.id = "searchBar"
  searchBox.placeholder = "search here..."
  body.appendChild(searchBox)

  for (let i = 0; i < 73; i++) {
      //Create Div
      let createDiv = document.createElement("div");
      createDiv.classList.add("col-4");
      body.appendChild(createDiv);
    
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
  }
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  // for(let item in episodeList){
  //   let allItems = episodeList[item];
  //   console.log(allItems);
  // }
  console.log("Hi");
}

window.onload = setup;
