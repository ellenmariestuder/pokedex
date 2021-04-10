
// establish 'pokemonList'
let pokemonList = [

  // add pokemon data
  {
    name: "onix",
    height: 15,
    types: ["rock", "ground"]
  },
  {
    name: "ratatat",
    height: 1,
    types: ["pest", "normal"]
  },
  {
    name: "pidgeotto",
    height: 2,
    types: ["bird", "normal"]
  }
];

// use forEach to write pokemon data to DOM
pokemonList.forEach((item) => {
  // establish data we want to write document
  let pokeNameHeight = item.name + " (height: " + item.height + ")";

  // modify to insert conditional note re height
  let pokeWrite = item.height > 10 ? `${pokeNameHeight} - Wow, that's big! <br/>` : `${pokeNameHeight}  <br/>`;

  // write to DOM
  document.write(pokeWrite);

});
