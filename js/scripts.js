var pokemonRepository = (function () {
    var pokemonList = [];

    function getAll() {
        return pokemonList;
    }

    function add(item) {
        pokemonList.push(item);
    }

    function addListItem(pokemon) {
        var pokemonListElement = document.querySelector('.pokemon-list');
        var listItem = document.createElement('li');
        var button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button', 'btn', 'btn-primary', 'mb-2');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');
        listItem.classList.add('list-group-item');
        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon.name, `Height: ${pokemon.height}`, pokemon.imgUrl);
        }).catch(function (error) {
            console.error(error);
        });
    }

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

    function loadDetails(pokemon) {
        var url = pokemon.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                pokemon.imgUrl = details.sprites.front_default;
                pokemon.height = details.height;
                console.log('Image URL:', pokemon.imgUrl); // Log the image URL for debugging
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

function showModal(name, height, imageUrl) {
    document.getElementById('modalName').innerText = name;
    document.getElementById('modalHeight').innerText = height;
    document.getElementById('modalImage').src = imageUrl;
}

function hideModal() {
    $('#pokemonModal').modal('hide');
}
