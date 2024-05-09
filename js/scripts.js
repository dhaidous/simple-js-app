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

    return {
        getAll: getAll,
        add: add
    };
})();

// Example usage:
console.log(pokemonRepository.getAll()); // Should return the pokemonList array
pokemonRepository.add({
    name: "Pikachu",
    height: 0.4,
    types: ["electric"]
});
console.log(pokemonRepository.getAll()); // Should return the updated pokemonList array

// forEach loop to iterate over each Pokémon in the repository
pokemonRepository.getAll().forEach(function (pokemon) {
    console.log(pokemon.name + ' - Height: ' + pokemon.height + ' - Types: ' + pokemon.types.join(', '));
});
