import React, { useState } from 'react';


const PokemonList = ({ pokemons = [] }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  if (!pokemons.length) {
    return <p>No Pokémon found.</p>; // Display message when the list is empty
  }

  const handlePokemonClick = (pokemon) => {
    // Toggle the Pokémon card selection
    setSelectedPokemon((prev) => (prev?.name === pokemon.name ? null : pokemon));
  };

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.name}
          className={`pokemon-container ${selectedPokemon?.name === pokemon.name ? 'selected' : ''}`}
          onClick={() => handlePokemonClick(pokemon)}
        >
          {/* Show Pokémon name and image */}
          <h3>{pokemon.name}</h3>
          <img src={pokemon.imageUrl} alt={pokemon.name} />
          
          {/* Show Pokémon details inside the card only when it's selected */}
          {selectedPokemon?.name === pokemon.name && (
            <div className="pokemon-card-info">
              <p><strong>Height:</strong> {pokemon.details.height}</p>
              <p><strong>Weight:</strong> {pokemon.details.weight}</p>
              <p><strong>Base Experience:</strong> {pokemon.details.base_experience}</p>
              <p><strong>Abilities:</strong> {pokemon.details.abilities.map(ability => ability.ability.name).join(', ')}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
