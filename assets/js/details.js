const pokemonBaseInfo = document.getElementById('base')
const pokemonAboutInfo = document.getElementById('about-info')

function convertPokeApiToPokemonDetails(pokemonDetail) {
    const pokemon = new PokemonDetails();

    // pokemon.species = pokemonDetail.genera;
    pokemon.height = pokemonDetail.height;
    pokemon.weight = pokemonDetail.weight;
    pokemon.abilities = pokemonDetail.abilities.map((ability) => ability.ability.name);
    // pokemon.gender = ;
    // pokemon.eggGroups = [];
    // pokemon.eggCycle;

    return pokemon;
}

function convertPokemonToBaseInformation(pokemon) {
    return `
        <div class="presentation">
            <h1>${pokemon.name}</h1>
            <span>#${pokemon.number}</span>
        </div>
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>

        <div class="pokemon-image">
            <img src="${pokemon.photo}" alt="">
        </div>
    `;
}

function convertToPokemonAboutInformation(pokemonDetails) {
    return `
        <label for="">species</label>
        <span></span>
        
        <label for="">height</label>
        <span>${pokemonDetails.height * 10}cm</span>
        
        <label for="">weight</label>
        <span >${pokemonDetails.weight / 10}Kg</span>
        
        <label for="">abilities</label>
        
        <span>${pokemonDetails.abilities.map((ability) => ` ${ability}`)}</span>
    `;
}

function loadPokemonBaseDetails() {
    pokeApi.getPokemons(0, 1).then((pokemon) => {
        const newHtml = convertPokemonToBaseInformation(pokemon[0]);
        pokemonBaseInfo.innerHTML += newHtml;
    });
}

function loadPokemonAboutInformation() {
    pokeApi.getPokemonInformations(1)
        .then(pokemon => convertPokeApiToPokemonDetails(pokemon))
        .then(details => {
            const newHtml = convertToPokemonAboutInformation(details);
            pokemonAboutInfo.innerHTML += newHtml;
        });
}

loadPokemonBaseDetails()
loadPokemonAboutInformation()

pokeApi.getPokemonSpecies = (pokemon) = {
    
}