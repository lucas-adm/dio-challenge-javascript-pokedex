const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.id = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.img = pokeDetail.sprites.other.dream_world.front_default
    pokemon.gif = pokeDetail.sprites.other.showdown.front_default

    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    const stats = pokeDetail.stats.map((baseStat) => baseStat.base_stat)
    const [stat] = stats

    pokemon.stats = stats
    pokemon.stat = stat

    pokemon.stat.name = stat.name

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((resp) => resp.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offSet = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`;

    return fetch(url)
        .then((resp) => resp.json())
        .then((results) => results.results)
        .then((details) => details.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error));
}