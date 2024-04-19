pokemonList = [
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
for (let i = 0; i < pokemonList.length; i++) {
    let pokemonInfo = pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')';
    if (pokemonList[i].height > 0.6)
        pokemonInfo += " - Wow, that’s big!";
    document.write(pokemonInfo + '<br>');
}
