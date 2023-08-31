import React, { useState } from 'react';
import axios from 'axios';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import '../style/App.css';
import '../style/busca.css';

const filter = createFilterOptions();

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

      if (response.data.results && Array.isArray(response.data.results)) {
        const pokemonNames = response.data.results.map((pokemon) => pokemon.name);
        const filteredSuggestions = pokemonNames.filter((name) =>
          name.includes(searchTerm.toLowerCase())
        );
        setSuggestions(filteredSuggestions.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    fetchSuggestions(newValue);
  };

  const handleSearch = () => {
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <Autocomplete
        value={value}
        className="form-control" //verificar
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        options={suggestions}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          const isExisting = options.some((option) => inputValue === option.title);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: inputValue,
            });
          }

          return filtered;
        }}
     


        getOptionLabel={(option) => option.title || option}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a Pokémon"
            className="form-control" //verificar
            onChange={(e) => handleChange(e, e.target.value)}
          />
        )}
      />
      {isLoading && <div className="loading">Loading suggestions...</div>}
      <button className="btn btn-outline-secondary" onClick={handleSearch}>Search</button>
    </div>
  );
};

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setSelectedPokemon(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );

      if (response.data) {
        setSelectedPokemon(response.data);
      } else {
        console.error("No data found for the selected Pokémon.");
        setSelectedPokemon(null);
      }
    } catch (error) {
      console.error("Error while fetching Pokémon data:", error);
      setSelectedPokemon(null);
    }
  };

  return (
    <div className="app">
      <h1>PokeAPI Search</h1>
      <SearchBar onSearch={handleSearch} />
      {selectedPokemon && (
        <div className="pokemon-details">
          {selectedPokemon.name}
        </div>
      )}
    </div>
  );
}

export default App;
