
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

  function addListItem(pokemon) {
    // "create a variable inside the function and assign to the 'ul' element in index"
    let ulPokeList = document.querySelector('ul');

    // create 'li' element
    let ulPokeListItem = document.createElement('li');

    // create button element
    let button = document.createElement('button');
    button.innerText = pokemon.name;        // set button text to be pokemon name
    button.classList.add('button');         // set button class
    button.setAttribute('id','show-modal'); // set button id
    ulPokeListItem.appendChild(button);     // append button element to list item
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });

    //append list item to unordered list (as child)
    ulPokeList.appendChild(ulPokeListItem);
  };

  // print pokemon details to console
  function showDetails(pokemon) {
    loadDetails(pokemon).then (function () {
      //console.log(pokemon);
      let title = pokemon.name;
      let text = 'Height: ' + pokemon.height;
      let imageUrl = pokemon.imageUrl;
      showModal(title, text, imageUrl);
    });
  }

  // show modal (will be called inside event listener)
  function showModal (title, text, imageUrl) {

    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'x';
    closeButtonElement.addEventListener('click', hideModal);
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
    let contentElement = document.createElement('p');
    contentElement.innerText = text;
    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', imageUrl);
    imageElement.setAttribute('id', 'modal-image');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible'))
    {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
