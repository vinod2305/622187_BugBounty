document.addEventListener("DOMContentLoaded", () => {
  let renderBtn = document.querySelector("#generate-pokemon");
  renderBtn.addEventListener("click", generatePokemons);
  delButton().addEventListener("click", deleteEverything);
});

function generatePokemons() {
  let pokemonDiv = document.querySelector("#pokemon");
  pokemonDiv.innerText = "";
  fetchKantoPokemon();

  delButton().style.display = "block";
}

function delButton() {
  return document.querySelector("#delete-btn");
}

async function fetchKantoPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon?limit=1";
  for (let i = 0; i < 18; i++) {
    let response = await fetch(url);
    let data = await response.json();
    const newPokemon = new Pokemon({
      name: data.results[0].name,
      apiURL: data.results[0].url,
    });
    const pokeData = await fetchPokemonData(newPokemon);
    newPokemon.imageURL = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;
    newPokemon.stats = pokeData.stats;
    renderPokemon(newPokemon);
  }
}

async function fetchPokemonData(pokemon) {
  let url = pokemon.api;
  let response = await fetch(url);
  let pokedata = await response.json();
  return pokedata;
}

function renderPokemon(pokemon) {
  let pokemonDiv = document.getElementById("pokemon");
  let pokeDiv = document.createElement("div");
  pokeDiv.classList.add("card");

  pokemonImage(pokemon.imageURL, pokeDiv);
  pokemonToolTip(pokemon.stats, pokeDiv);

  let pokeName = document.createElement("h4");
  pokeName.innerText = pokemon.name;

  pokeDiv.append(pokeName);
  pokemonDiv.appendChild(pokeDiv);
}

function pokemonToolTip(stats, pokeDiv) {
  const toolTipContainer = document.createElement("div");
  const toolTipTitle = document.createElement("div");
  toolTipTitle.innerHTML = "STATS";
  toolTipTitle.style.fontWeight = 600;
  toolTipTitle.style.fontSize = "20px";
  toolTipTitle.style.margin = "auto";
  toolTipContainer.appendChild(toolTipTitle);
  stats.forEach((statistic) => {
    const row = document.createElement("div");
    const stat_name_col = document.createElement("div");
    const stat_num_col = document.createElement("div");
    stat_name_col.innerHTML = allCaps(statistic.stat.name);
    stat_num_col.innerHTML = statistic.base_stat;
    row.classList.add("tooltip-row");
    row.appendChild(stat_name_col);
    row.appendChild(stat_num_col);
    toolTipContainer.appendChild(row);
  });
  toolTipContainer.classList.add("card");
  toolTipContainer.classList.add("tooltip");

  pokeDiv.appendChild(toolTipContainer);
}

function pokemonImage(imageURL, containerDiv) {
  let pokeImgContainer = document.createElement("div");
  let pokeImage = document.createElement("img");
  pokeImage.srcset = imageURL;

  pokeImgContainer.append(pokeImage);
  containerDiv.append(pokeImgContainer);
}

function deleteEverything(event) {
  event.target.style = "none";
  let pokemonDiv = document.querySelector("#pokemon");
  pokemonDiv.innerText = "";

  let renderBtn = document.createElement("button");
  renderBtn.innerText = "Generate Pokemon";
  renderBtn.id = "generate-pokemon";
  renderBtn.classList.add("ui", "inverted", "yellow", "button");
  pokemonDiv.append(renderBtn);
}

function allCaps(stat_name) {
  return stat_name
    .split("-")
    .map((word) => word.toUpperCase())
    .join(" ");
}
