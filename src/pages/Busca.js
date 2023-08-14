import React, { useState } from 'react';
import { useApi } from '/home/victor/bootcamp/src/hooks/useApi.ts';
import '/home/victor/bootcamp/src/style/result.css';

function Busca() {
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
  
      if (results) {
        setSearchResults([results]);
        console.log(results);
      } else {
        setSearchResults([]);
        alert("Não encontrado o Pokemon, digite novamente"); // Exibir alerta de erro
      }
    } catch (error) {
      setSearchResults([]);
      console.error('Error fetching data:', error);
      alert('Erro ao buscar o Pokemon. Por favor, tente novamente.'); // Exibir alerta de erro de busca
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

export default Busca;
