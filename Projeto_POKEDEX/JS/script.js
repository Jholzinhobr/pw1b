const fetchpokemon = async (pokemon) => {
    const APIResponse = await fetch ('https://pokeapi.co/api/v2/pokemon/${pokemon}');

    const data = await APIResponse.json();
    return data;
}

const renderPokemon = (pokemon) => {
     
    const data = fetchpokemon(pokemon);

    console.log(data);
}

renderPokemon('384')