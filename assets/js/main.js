const pokemonsOrderedList = document.querySelector('#pokemonsOrderedList')
const nextGenerationBtn = document.querySelector('#nextGeneration')
const generationInfo = document.querySelector('#generation')
const backGenerationBtn = document.querySelector('#backGeneration')
backGenerationBtn.style.display = 'none'

const pokedex = document.getElementById('pokedex');
const loading = document.getElementById('loading');

let generation = 1

nextGenerationBtn.textContent = 'Avançar';
generationInfo.textContent = `${generation}ª Geração`
backGenerationBtn.textContent = 'Voltar'

const generations = [151, 100, 135, 107, 156]
let currentGeneration = 0

const offSetGenerations = [0, 151, 251, 386, 493]
let currentOffSet = 0

let offSet = offSetGenerations[0]
let limit = generations[0]


function load() {
    loading.style.display = 'flex'
    pokedex.style.display = 'none'
}

function loadComplete() {
    loading.style.display = 'none'
    pokedex.style.display = 'block'
}

function loadPokemonItens(offSet, limit) {

    load();

    function convertPokemonToListItem(pokemon) {

        return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>
    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.img}" alt=${pokemon.name}>
            </div>
        </li>
        `
    }


    pokeApi.getPokemons(offSet, limit).then((pokemons = []) => {

        loadComplete();

        pokemonsOrderedList.innerHTML = pokemons.map(convertPokemonToListItem).join('')
    })

}

loadPokemonItens(offSet, generations[currentGeneration])

nextGenerationBtn.addEventListener('click', () => {

    load();

    currentOffSet++
    offSet = offSetGenerations[currentOffSet]
    currentGeneration++
    limit = generations[currentGeneration]

    loadPokemonItens(offSet, limit);

    generation++

    if (generation === 5) {
        nextGenerationBtn.style.display = 'none';
    } else {
        nextGenerationBtn.style.display = 'block';
    }

    generationInfo.textContent = `${generation}ª Geração`

    backGenerationBtn.style.display = 'block'

})

backGenerationBtn.addEventListener('click', () => {

    load();

    currentOffSet--
    offSet = offSetGenerations[currentOffSet]
    currentGeneration--
    limit = generations[currentGeneration]

    loadPokemonItens(offSet, limit);

    generation--

    generationInfo.textContent = `${generation}ª Geração`


    if (generation === 1) {
        backGenerationBtn.style.display = 'none';
    } else {
        backGenerationBtn.style.display = 'block';
    }

    nextGenerationBtn.style.display = 'block';

})