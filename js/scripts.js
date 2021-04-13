
// create pokemonRepository to hold pokemonList + IIFE
let pokemonRepository = (function() {

  // establish 'pokemonList'
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    button.innerText = pokemon.name;    // set button text to be pokemon name
    button.classList.add('button');     // set button class
    ulPokeListItem.appendChild(button); // append button element to list item
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });

    //append list item to unordered list (as child)
    ulPokeList.appendChild(ulPokeListItem);
  };

  // print pokemon details to console
  function showDetails(pokemon) {
    loadDetails(pokemon).then (function () {
      console.log(pokemon);
    });
  }

  // load pokemn details from API (will be called on 'click' event)
  function loadDetails (item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  // load full list of pokemon from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // return functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };

}) ();

pokemonRepository.loadList().then(function() {

  // use forEach to write pokemon data to DOM
  pokemonRepository.getAll().forEach(function (item) {

    //write pokemon name as button to DOM
    pokemonRepository.addListItem(item);

  });
});
