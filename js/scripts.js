
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

// create for loop to print pokemon name + height
for (let i = 0; i < pokemonList.length; i++) {

  // establish data we want to write document
  let pokeNameHeight = pokemonList[i].name + " (height: " + pokemonList[i].height + ")";

  // modify to insert conditional note re height
  let pokeWrite = pokemonList[i].height > 10 ? `${pokeNameHeight} - Wow, that's big! <br/>` : `${pokeNameHeight}  <br/>`;

  // write to DOM
  document.write(pokeWrite);
}
