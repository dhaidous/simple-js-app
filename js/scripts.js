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
                console.log(pokemon); // Log the Pokémon object with details loaded from the API
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
