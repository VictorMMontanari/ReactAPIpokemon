import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import '../style/App.css'; // Certifique-se de ter o caminho correto para o arquivo CSS de estilização

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1050`);
      const pokemonNames = response.data.results.map((pokemon) => pokemon.name);
      const filteredSuggestions = pokemonNames.filter((name) =>
        name.includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleChange = (event, { newValue }) => {
    setValue(newValue);
    fetchSuggestions(newValue);
  };

  const handleSuggestionSelected = (_, { suggestion }) => {
    setValue(suggestion);
  };

  const inputProps = {
    placeholder: 'Search for a Pokémon',
    value,
    onChange: handleChange,
  };

  return (
    <div className="search-bar">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }) => fetchSuggestions(value)}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionSelected={handleSuggestionSelected}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <div>{suggestion}</div>}
        inputProps={inputProps}
      />
      {isLoading && <div className="loading">Loading suggestions...</div>}
    </div>
  );
};

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    if (!searchTerm) {
      setSelectedPokemon(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error(error);
      setSelectedPokemon(null);
    }
  };

  return (
    <div className="app">
      <h1>PokeAPI Search</h1>
      <SearchBar onSearch={handleSearch} />
      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name}</h2>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
        </div>
      )}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default App;
