
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonInformations = (offset) => {
    // debugger;

    const url = `https://pokeapi.co/api/v2/pokemon/${offset}`

    return fetch(url)
        .then(response => response.json())
        .then(json => json);
}

pokeApi.getPokemonSpeciesInformations = (url) => {
    // debugger
    return fetch(url)
        .then(response => response.json())
        .then(json => {
            let eggGroups = json.egg_groups.map(group => group.name)
            let species = json.genera.find(x => x.language.name === "en").genus

            return {eggGroups, species}
        })
}
