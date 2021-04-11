
// create pokemonRepository to hold pokemonList + IIFE
let pokemonRepository = (function() {

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

  function add(pokemon) {
    pokemonList.push(pokemon);
  };

  function getAll() {
    return pokemonList;
  };

  function addListItem(pokemon) {
    // "create a variable inside the function and assign to the 'ul' element in index"
    let ulPokeList = document.querySelector('ul');

    // create 'li' element
    let ulPokeListItem = document.createElement('li');

    // create button element
    let button = document.createElement('button');
    button.innerText = pokemon;       // set button text to be pokemon name
    button.classList.add('button');     // set button class
    ulPokeListItem.appendChild(button); // append button element to list item
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });

    //append list item to unordered list (as child)
    ulPokeList.appendChild(ulPokeListItem);
  };

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

}) ();



// use forEach to write pokemon data to DOM
pokemonRepository.getAll().forEach((item) => {

  //write pokemon name as button to DOM
  pokemonRepository.addListItem(item.name);

});
