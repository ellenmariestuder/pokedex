/* eslint-env jquery */

// create pokemonRepository to hold pokemonList + IIFE
let pokemonRepository = (function() {
  // identify modal container

  // establish 'pokemonList'
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

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
    $(button).text(capitalize(pokemon.name));
    $(button).addClass('btn btn-outline-danger btn-width group-list-item');
    $(button).attr({ 'data-toggle': 'modal', 'data-target': '#poke-modal' });
    ulPokeListItem.append(button);
    button.addEventListener('click', function() {
      showModal(pokemon);
    });

    //append list item to unordered list (as child)
    ulPokeList.append(ulPokeListItem);
  }

  // show modal (will be called inside event listener)
  function showModal(item) {
    loadDetails(item).then(function() {
      let modalTitle = $('.modal-title');
      let modalBody = $('.modal-body');
      let columnLeft = $('.col__left');
      let columnRight = $('.col__right');
      let modalRow = $('.modal__row');

      $('modalTitle').html('');
      $('modalBody').html('');
      $('columnLeft').html('');
      $('columnRight').html('');

      let nameElement = $('<h1>' + capitalize(item.name) + '</h1>');
      let heightElement = $('<div>' + '<p>' + 'Height: ' + item.height + '</p>' + '</div>');
      let typeElement = $('<div>' + '<p>' + 'Type(s): ' + item.types + '</p>' + '</div>');
      let abilitiesElement = $('<div>' + '<p>' + 'Abilities: ' + item.abilities + '</p>' + '</div>');
      let imageElement = $('<img class="modal-img">');

      imageElement.attr('src', item.imageUrl);
      imageElement.attr('id', 'modal-image');

      modalTitle.append(nameElement);
      columnLeft.append(heightElement);
      columnLeft.append(typeElement);
      columnLeft.append(abilitiesElement);
      columnRight.append(imageElement);
      modalRow.append(columnLeft);
      modalRow.append(columnRight); 
      modalBody.append(modalRow);
    });
  }

  // load pokemn details from API (will be called on 'click' event)
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = [];
        details.types.forEach((e) => {
                item.types.push(` <span>${capitalize(e.type.name)}</span>`);
              });
        item.abilities = [];
        details.abilities.forEach((e) => {
          item.abilities.push(` <span>${capitalize(e.ability.name)}</span>`);
              });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // load full list of pokemon from API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // return functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  // use forEach to write pokemon data to DOM
  pokemonRepository.getAll().forEach(function(item) {
    //write pokemon name as button to DOM
    pokemonRepository.addListItem(item);
  });
});
