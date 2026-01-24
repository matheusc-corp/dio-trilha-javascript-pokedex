const pokemonBaseInfo = document.getElementById('base')
const pokemonAboutInfo = document.getElementById('about-info')
const pokemonBreedingInfo = document.getElementById('breeding-info')
const pokemonNumber = new URLSearchParams(window.location.search).get("id");
const sectionContent = document.querySelector("#pokemon-info");

function convertPokeApiToPokemonDetails(pokemonDetail) {
    const pokemon = new PokemonDetails();

    pokemon.height = pokemonDetail.height;
    pokemon.weight = pokemonDetail.weight;
    pokemon.abilities = pokemonDetail.abilities.map((ability) => ability.ability.name);
    
    return pokemon;
}

function convertPokemonToBaseInformation(pokemon) {
    sectionContent.classList.add(pokemon.type)

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
        <span>${pokemonDetails.species}</span>
        
        <label for="">height</label>
        <span>${pokemonDetails.height * 10}cm</span>
        
        <label for="">weight</label>
        <span >${pokemonDetails.weight / 10}Kg</span>
        
        <label for="">abilities</label>
        
        <span>${pokemonDetails.abilities.map((ability) => ` ${ability}`)}</span>
    `;
}

function convertToPokemonBreedingInformation(pokemonDetails) {
    return `
        <label for="">egg groups</label>
        <span>${pokemonDetails.eggGroups.map(group => ` ${group}`)}</span>
    `
}

function loadPokemonBaseDetails() {
    pokeApi.getPokemons(pokemonNumber-1 , 1).then((pokemon) => {
        const newHtml = convertPokemonToBaseInformation(pokemon[0]);
        pokemonBaseInfo.innerHTML += newHtml;
    });
}

function loadPokemonAboutInformation() {
    pokeApi.getPokemonInformations(pokemonNumber)
        .then(pokemon => {
            return pokeApi.getPokemonSpeciesInformations(pokemon.species.url)
                .then(species => {
                    let p = convertPokeApiToPokemonDetails(pokemon);
                    p.species = species.species
                    p.eggGroups = species.eggGroups

                    return p
                });
        })
        .then(details => {
            const aboutHtml = convertToPokemonAboutInformation(details);
            pokemonAboutInfo.innerHTML += aboutHtml;

            const breedingHtml = convertToPokemonBreedingInformation(details)
            pokemonBreedingInfo.innerHTML += breedingHtml
        })
}

loadPokemonBaseDetails()
loadPokemonAboutInformation()
