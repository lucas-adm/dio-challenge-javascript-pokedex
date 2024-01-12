const pokemonsOrderedList = document.querySelector('#pokemonsOrderedList')

const nextGenerationBtn = document.querySelector('#nextGeneration')
nextGenerationBtn.textContent = 'Avançar';

const generationInfo = document.querySelector('#generation')
let generation = 1
generationInfo.textContent = `${generation}ª Geração`

const backGenerationBtn = document.querySelector('#backGeneration')
backGenerationBtn.textContent = 'Voltar'
backGenerationBtn.style.display = 'none'

const pokedex = document.getElementById('pokedex');

const loading = document.getElementById('loading');


let currentGeneration = 0
const generations = [151, 100, 135, 107, 156]
let limit = generations[0]


let currentOffSet = 0
const offSetGenerations = [0, 151, 251, 386, 493]
let offSet = offSetGenerations[0]

const cardModalBg = document.getElementById('modalBg')

function load() {
    loading.style.display = 'flex'
    pokedex.style.display = 'none'
}

function loadComplete() {
    loading.style.display = 'none'
    pokedex.style.display = 'block'
}

function createModalCard(offSet, limit) {

    function convertPokemonToCard(pokemon) {

        let pokeballSrc = 'assets/img/d2joc5j-c2562d13-9dbe-4747-b70b-03e25d3abb80.png'

        return `
            <div id="card-${pokemon.id}" class="modalCard ${pokemon.type}">
                <div class="title">
                    <div class="nameNid">
                        <h1>${pokemon.name}</h1>
                        <p class="idNumber">#${pokemon.id}</p>
                    </div>
                    <div class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </div>
                </div>
                <div class="pokeGif">
                    <img class="pokeball" src="${pokeballSrc}" alt="pokeball">
                    <img class="img" src="${pokemon.img}"
                        alt="${pokemon.name}">
                </div>
                <div class="infos">
                    <div class="about">
                        <h2>Sobre</h2>
                        <div class="fieldInfo">
                            <p>Altura: <span>${pokemon.height}0cm</span> </p>
                            <p>Peso: <span>${(pokemon.weight / 10).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}kg</span></p>
                        </div>
                    </div>
                    <div class="baseStats">
                        <h2>Status Base</h2>
                        <div class="fieldInfo">
                            <p>Hp: <span>${pokemon.stats[0]}</span></p>
                            <p>Ataque: <span>${pokemon.stats[1]}</span></p>
                            <p>Defesa: <span>${pokemon.stats[2]}</span></p>
                            <p>Ataque Especial: <span>${pokemon.stats[3]}</span></p>
                            <p>Defesa Especial: <span>${pokemon.stats[4]}</span></p>
                            <p>Velocidade: <span>${pokemon.stats[5]}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    pokeApi.getPokemons(offSet, limit).then((pokemons = []) => {
        cardModalBg.innerHTML = pokemons.map(convertPokemonToCard).join('');
    });
}

function loadPokemonItens(offSet, limit) {

    load();
    function convertPokemonToListItem(pokemon) {

        return `
        <li id="pokemon" objectId=${pokemon.id} class="pokemon ${pokemon.type}" style="cursor:pointer">
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>
    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.gif}" alt=${pokemon.name}>
            </div>
        </li>
        `
    }

    pokeApi.getPokemons(offSet, limit).then((pokemons = []) => {

        loadComplete();
        pokemonsOrderedList.innerHTML = pokemons.map(convertPokemonToListItem).join('');

        //Ação do card
        const listItems = document.querySelectorAll('#pokemon')
        listItems.forEach((pokemon) => {
            pokemon.addEventListener('click', () => {

                const id = pokemon.getAttribute('objectId')
                const cardId = document.getElementById(`card-${id}`)

                cardModalBg.querySelectorAll('.modalCard').forEach((card) => {
                    card.style.display = 'none';
                });

                cardModalBg.style.display = 'block'
                cardId.style.display = 'flex'
            })
        })
    })

}

createModalCard(offSet, limit);
loadPokemonItens(offSet, limit)

nextGenerationBtn.addEventListener('click', () => {

    load();
    currentOffSet++
    offSet = offSetGenerations[currentOffSet]
    currentGeneration++
    limit = generations[currentGeneration]

    createModalCard(offSet, limit);
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

    createModalCard(offSet, limit);
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