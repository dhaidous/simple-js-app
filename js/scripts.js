
var pokemonRepository = (function () {
    var pokemonList = []; // Replaced the array of Pokémon objects with an empty array

    function getAll() {
        return pokemonList;
    }

    function add(item) {
        pokemonList.push(item);
    }

    function addListItem(pokemon) {
        var pokemonList = document.querySelector('.pokemon-list');
        var listItem = document.createElement('li');
        var button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        // Add an event listener to the button
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    // Create a new function showDetails()
    function showDetails(pokemon) {
        loadDetails(pokemon)
            .then(function () {
                showModal(pokemon.name, `Height: ${pokemon.height}`, pokemon.imgUrl); // Open the modal with Pokémon details
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    // Add function(s) inside your data repository to load data from an external source
    function loadList() {
        return fetch('https://pokeapi.co/api/v2/pokemon/')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                data.results.forEach(function (item) {
                    var pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    // Add a LoadList() function as a return key
    function LoadList() {
        return loadList();
    }

    // Add a loadDetails() function
    function loadDetails(pokemon) {
        var url = pokemon.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                // Assign some of the details to the Pokémon in the pokemonList
                pokemon.imgUrl = details.sprites.front_default;
                pokemon.height = details.height;
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    // Make sure both functions LoadList() and loadDetails() are assigned to keys with the same name
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        LoadList: LoadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.LoadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

function showModal(name, height, imageUrl) {
    let modalContainer = document.querySelector('#modal-container');

    // Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement = document.createElement('h1');
    nameElement.innerText = name;

    let heightElement = document.createElement('p');
    heightElement.innerText = height;

    let imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = `${name} image`;
    imageElement.style.width = '100%';
    imageElement.style.height = 'auto';
    imageElement.style.maxHeight = '400px';

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });
}

function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
}
