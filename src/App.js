import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';
import './App.css';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]); // Store all Pokémon for search
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  // Fetch total Pokémon count
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
        if (!response.ok) throw new Error('Failed to fetch total Pokémon count');
        const data = await response.json();
        setTotalPages(Math.ceil(data.count / limit));
      } catch (error) {
        console.error('Error fetching total Pokémon count:', error);
      }
    };
    fetchTotalCount();
  }, []);

  // Fetch Pokémon Data for Current Page
  useEffect(() => {
    if (searchQuery) return; // Skip if searching
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);
      const offset = (currentPage - 1) * limit;
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        if (!response.ok) throw new Error('Failed to fetch Pokémon list');
        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonDetails = await fetch(pokemon.url);
            if (!pokemonDetails.ok) throw new Error(`Failed to fetch details for ${pokemon.name}`);
            const details = await pokemonDetails.json();
            return {
              name: pokemon.name,
              imageUrl: details.sprites.front_default,
              details: {
                height: details.height,
                weight: details.weight,
                base_experience: details.base_experience,
                abilities: details.abilities,
              },
            };
          })
        );
        setPokemons(pokemonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [currentPage, searchQuery]); // Added allPokemons here

  // Fetch All Pokémon Names for Search (Only Once)
  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        if (!response.ok) throw new Error('Failed to fetch all Pokémon for search');
        const data = await response.json();
        setAllPokemons(data.results.map(pokemon => pokemon.name)); // Store only names
      } catch (error) {
        console.error('Error fetching all Pokémon:', error);
      }
    };

    fetchAllPokemons();
  }, []);

  // Handle Pokémon Selection
  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  // Handle Page Changes
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Fetch Pokémon Details for Search Results
  useEffect(() => {
    if (!searchQuery) return;
    const fetchSearchedPokemons = async () => {
      setLoading(true);
      setError(null);
      try {
        const filteredNames = allPokemons.filter(name =>
          name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const pokemonData = await Promise.all(
          filteredNames.map(async (name) => {
            const pokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if (!pokemonDetails.ok) throw new Error(`Failed to fetch details for ${name}`);
            const details = await pokemonDetails.json();
            return {
              name: details.name,
              imageUrl: details.sprites.front_default,
              details: {
                height: details.height,
                weight: details.weight,
                base_experience: details.base_experience,
                abilities: details.abilities,
              },
            };
          })
        );

        setPokemons(pokemonData); // Update state with searched results
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchedPokemons();
  }, [searchQuery, allPokemons]); // Added allPokemons to avoid missing dependency warning

  return (
    <div className="app">
      <h1>Pokémon List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {error ? (
        <div className="error">Error: {error}</div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <ErrorBoundary>
          <PokemonList pokemons={pokemons} onPokemonClick={handlePokemonClick} />
        </ErrorBoundary>
      )}

      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}

      {!searchQuery && (
        <div className="pagination">
          {/* Pagination controls */}
          <button onClick={() => handlePageClick(1)} disabled={currentPage === 1}>First Page</button>
          <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage <= 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button>
          <button onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>Last Page</button>
        </div>
      )}
    </div>
  );
};

export default App;
