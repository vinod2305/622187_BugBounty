class Pokemon {
  name;
  pokeID;
  apiURL;
  stats;

  constructor({ name, apiURL }) {
    this.name = name;
    this.apiURL = apiURL;
  }

  get imageURL() {
    return `https://pokeres.bastionbot.org/images/pokemon/${this.pokeID}.png`;
  }

  get api() {
    return this.apiURL;
  }

  set imageURL(pokeID) {
    this.pokeID = pokeID;
  }
}
