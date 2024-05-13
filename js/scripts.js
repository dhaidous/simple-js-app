var pokemonRepository = (function () {
    var pokemonList = [
        {
            name: "Bulbasaur",
            height: 0.7,
            types: ["grass", "poison"]
        },
        {
            name: "Charmander",
            height: 0.6,
            types: ["fire"]
        },
        {
            name: "Squirtle",
            height: 0.5,
            types: ["water"]
        }
    ];

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
        console.log(pokemon); // Log the Pokémon object passed as the parameter
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
