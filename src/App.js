import React, { useState } from 'react';
import { useApi } from '/home/victor/bootcamp/bootcamp/src/hooks/useApi.ts';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { pokemon } = useApi();

  const handleSearch = async () => {
    if (!searchTerm) {
      setSearchResults([]);
      return; // Não faça a busca se o campo estiver vazio
    }

    try {
      const results = await pokemon(searchTerm);
      setSearchResults([results]);
      console.log(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <header>
      <div className='acertar'>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div>
        {searchResults.map(result => (
          <div class="pk" key={result.id}>
            <p>{result.name}</p>
            <img src={result.sprites.front_default} alt={result.name} />
          </div>
        ))}
      </div>
    </header>
  );
}

export default App;
