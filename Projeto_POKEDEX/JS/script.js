const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev'); 
const buttonNext = document.querySelector('.btn-next'); 
const buttondetalhes = document.querySelector('.btn-detalhes');

const detalhesBox = document.querySelector('.pokemon_details');
const altura = document.querySelector('.pokemon_height');
const peso = document.querySelector('.pokemon_weight');
const tipos = document.querySelector('.pokemon_types');
const habilidades = document.querySelector('.pokemon_abilities');

let searchPokemon = 1;

const tiposPt = {
  grass: 'Grama', poison: 'Veneno', fire: 'Fogo', water: 'Água', electric: 'Elétrico',
  flying: 'Voador', bug: 'Inseto', normal: 'Normal', ground: 'Terra', rock: 'Pedra',
  psychic: 'Psíquico', ghost: 'Fantasma', dark: 'Sombrio', steel: 'Aço',
  ice: 'Gelo', dragon: 'Dragão', fighting: 'Lutador', fairy: 'Fada'
};

const habilidadesPt = {
  overgrow: 'Crescimento', chlorophyll: 'Clorofila', blaze: 'Chama',
  torrent: 'Torrente', static: 'Estático', 'lightning-rod': 'Para-raios',
  'solar-power': 'Energia Solar'
};

const traduzir = (lista, dicionario) =>
  lista.map(nome => dicionario[nome] ?? nome).join(', ');

const fetchpokemon = async (pokemon) => {
    const APIResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
      const data = await APIResponse.json();
      return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Procurando...';
    pokemonNumber.innerHTML = '';
    detalhesBox.style.display = 'none';
     
    await new Promise(resolve => setTimeout(resolve, 1000));

    const data = await fetchpokemon(pokemon);

    if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;

    altura.innerHTML = data.height / 10 + " m";
    peso.innerHTML = data.weight / 10 + " kg";

    tipos.innerHTML = traduzir(data.types.map(t => t.type.name), tiposPt);
    habilidades.innerHTML = traduzir(data.abilities.map(h => h.ability.name), habilidadesPt);
    } else {
      pokemonImage.style.display = 'none';  
      pokemonName.innerHTML = 'Não encontrei :(';
      pokemonNumber.innerHTML = '';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon >1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
        }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

buttondetalhes.addEventListener('click', () => {
  detalhesBox.style.display = (detalhesBox.style.display === 'none') ? 'block' : 'none';
});

renderPokemon(searchPokemon);