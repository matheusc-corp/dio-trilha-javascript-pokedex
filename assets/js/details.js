const pokemonBaseInfo = document.getElementById('base')
const pokemonAboutInfo = document.getElementById('about-info')

function convertPokeApiToPokemonDetails(pokemonDetail) {
    const pokemon = new PokemonDetails();

    // pokemon.species = pokemonDetail.genera;
    pokemon.height = pokemonDetail.height;
    pokemon.weight = pokemonDetail.weight;
    pokemon.abilities = pokemonDetail.abilities.map((ability) => ability.name);
    // pokemon.gender = ;
    pokemon.eggGroups = [];
    pokemon.eggCycle;

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
        <div class="information">
            <label for="">species</label>
            <span>seed</span>
            
            <label for="">height</label>
            <span>${pokemonDetails.height}cm</span>
            
            <label for="">weight</label>
            <span >${pokemonDetails.weight}Kg</span>
            
            <label for="">abilities</label>
            <span >${pokemonDetails.abilities((abilities) => `${abilities[0]}, ${abilities[1]}`)}</span>
        </div>
    `;
}

function loadPokemonBaseDetails() {
    pokeApi.getPokemons(0, 1).then((pokemon) => {
        const newHtml = convertPokemonToBaseInformation(pokemon[0]);
        pokemonBaseInfo.innerHTML += newHtml;
        // console.log(pokemon)
    });
}

function loadPokemonAboutInformation() {
    pokeApi.getPokemons(0, 1).then((pokemon) => {
        // transformar em objeto pokemon-details-models
        
        
        console.log(pokemon[0])
    })
    
    // console.log(pokemonDetail)

}

loadPokemonBaseDetails()
loadPokemonAboutInformation()

/////////////////////////////
// TESTAR DEPOIS

pokeApi.getPokemonInformations = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiToPokemonInformations)
}

pokeApi.getPokemonSpecies = (pokemon) = {
    
}