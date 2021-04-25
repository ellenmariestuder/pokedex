
// create pokemonRepository to hold pokemonList + IIFE
let pokemonRepository = (function() {

  // identify modal container
  let modalContainer = document.querySelector('#modal-container');

  // establish 'pokemonList'
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  };

  function getAll() {
    return pokemonList;
  };

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

  function addListItem(pokemon) {
    // "create a variable inside the function and assign to the 'ul' element in index"
    let ulPokeList = document.querySelector('ul');

    // create 'li' element
    let ulPokeListItem = document.createElement('li');

    // create button element
    let button = document.createElement('button');
    button.innerText = capitalize(pokemon.name);
    button.classList.add('btn');
    button.classList.add('group-list-item');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#poke-modal');
    ulPokeListItem.appendChild(button);
    button.addEventListener('click', function() {
      showModal(pokemon);
    });

    //append list item to unordered list (as child)
    ulPokeList.appendChild(ulPokeListItem);
  };

  // show modal (will be called inside event listener)
  function showModal (item) {

    loadDetails(item).then (function () {

      let modalHeader = $('.modal-header');
      let modalTitle = $('.modal-title');
      let modalBody = $('.modal-body');

      modalTitle.empty();
      modalBody.empty();

      let nameElement = $('<h1>' + capitalize(item.name) + '</h1>');
      let heightElement = $('<p>' + 'Height : ' + item.height + '</p>');
      let imageElement = $('<img class="modal-img">');
      imageElement.attr('src', item.imageUrl);
      imageElement.attr('id', 'modal-image'); 

      modalTitle.append(nameElement);
      modalBody.append(heightElement);
      modalBody.append(imageElement);

    })
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
  };

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
