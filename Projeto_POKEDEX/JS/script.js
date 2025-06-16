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

const fetchpokemon = async (pokemon) => {
    const APIResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
      const data = await APIResponse.json();
      return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemon.innerHTML = 'loading...';
    pokemonNumber.innerHTML = '';
    detalhesBox.style.display = 'none';
     
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
    tipos.innerHTML = data.types.map(t => t.type.name).join(', ');
    habilidades.innerHTML = data.abilities.map(h => h.ability.name).join(', ');
    } else {
      pokemonImage.style.display = 'none';  
      pokemonName.innerHTML = 'Not Found :C';
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
renderPokemon(searchPokemon);

buttondetalhes.addEventListener('click', () => {
  if (detalhesBox.style.display === 'none') {
    detalhesBox.style.display = 'block';
  } else {
    detalhesBox.style.display = 'none';
  }
});