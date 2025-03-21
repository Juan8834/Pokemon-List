import React from 'react';

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon || !pokemon.details) {
    return <p>Loading Pokémon details...</p>; // Handle missing data gracefully
  }

  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      {pokemon.imageUrl && <img src={pokemon.imageUrl} alt={pokemon.name} />}
      <p><strong>Height:</strong> {pokemon.details.height ?? 'Unknown'}</p>
      <p><strong>Weight:</strong> {pokemon.details.weight ?? 'Unknown'}</p>
      <p><strong>Base Experience:</strong> {pokemon.details.base_experience ?? 'Unknown'}</p>
      <h3>Abilities</h3>
      <ul>
        {pokemon.details.abilities?.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        )) || <li>No abilities available</li>}
      </ul>
    </div>
  );
};

export default PokemonDetails;
