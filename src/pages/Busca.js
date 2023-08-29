import React, { useEffect, useState } from "react";
import "../style/result.css";
import '../style/busca.css';
import { useApi } from '../hooks/useApi';
import {formatName, getTypeClass, getTypeNames, getTypeStyle, formatType} from "../components/format";
/* import DynamicSearch from "../components/DynamicSearch"; */


function Result() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { pokemon, type } = useApi();

    const handleSearch = async () => {
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }
    
        try {
            const results = await pokemon(searchTerm);
    
            if (results) {
                setSearchResults([{
                    name: results.name,
                    image: results.sprites.other["official-artwork"].front_default,
                    pokemonId: results.id,
                    typeNames: results.types.map(typeInfo => typeInfo.type.name) // Get the type names
                }]);
            } else {
                setSearchResults([]);
                alert("Não encontrado o Pokemon, digite novamente");
            }
        } catch (error) {
            setSearchResults([]);
            console.error('Error fetching data:', error);
            alert('Erro ao buscar o Pokemon. Por favor, tente novamente.');
        }
    };

    const handleSearchType = async (typeId) => {
        try {
            const typeInfo = await type(typeId);
            const pokemonArray = typeInfo.pokemon.map(pokemon => pokemon.pokemon);
            setSearchResults(await fetchPokemonImages(pokemonArray, typeId));
        } catch (error) {
            setSearchResults([]);
            console.error('Error fetching data:', error);
            alert('Erro ao buscar o tipo de Pokemon. Por favor, tente novamente.');
        }
    }

    const fetchPokemonImages = async (pokemonArray, typeId) => {
        const results = await Promise.all(
            pokemonArray.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                const data = await response.json();
                return {
                    pokemonId: data.id,
                    name: pokemon.name,
                    image: data.sprites.other["official-artwork"].front_default,
                    typeClass: getTypeClass(typeId), // Get the class name based on typeId
                    typeNames: data.types.map(typeInfo => typeInfo.type.name) // Get the type names     
                };
            })
        );
        return results;
    };

    return (
        <div>
            <header className="cabecalho">
                <h1 className="logo">PokeAPI</h1>
                <div className='acertar'>
                    <div className="input-group mb-3">
                        {/* <DynamicSearch results={searchResults} setSearchResults={setSearchResults} /> */}
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
            </header>
            <main className="principal">
                <div className="conteudo">
                    <div className="cont">
                        <button type="button" className="button bug" onClick={() => handleSearchType(7)}>Bug</button>
                        <button type="button" class="button dark" onClick={() => handleSearchType(17)}>Dark</button>
                        <button type="button" class="button drag" onClick={() => handleSearchType(16)}>Dragon</button>
                        <button type="button" class="button elect" onClick={() => handleSearchType(13)}>Electric</button>
                        <button type="button" class="button fhgt" onClick={() => handleSearchType(2)}>Fight</button>
                        <button type="button" class="button fire" onClick={() => handleSearchType(10)}>Fire</button>
                        <button type="button" class="button flying" onClick={() => handleSearchType(3)}>Flying</button>
                        <button type="button" class="button ghost" onClick={() => handleSearchType(8)}>Ghost</button>
                        <button type="button" class="button grass" onClick={() => handleSearchType(12)}>Grass</button>
                        <button type="button" class="button ground" onClick={() => handleSearchType(5)}>Ground</button>
                        <button type="button" class="button ice" onClick={() => handleSearchType(15)}>Ice</button>
                        <button type="button" class="button normal" onClick={() => handleSearchType(1)}>Normal</button>
                        <button type="button" class="button poison" onClick={() => handleSearchType(4)}>Poison</button>
                        <button type="button" class="button psychic" onClick={() => handleSearchType(14)}>Psychic</button>
                        <button type="button" class="button rock" onClick={() => handleSearchType(6)}>Rock</button>
                        <button type="button" class="button steel" onClick={() => handleSearchType(9)}>Steel</button>
                        <button type="button" class="button water" onClick={() => handleSearchType(11)}>Water</button> 
                    </div>
                    {searchResults.map(result => (
                        <nav className={`modulos ${result.typeClass}`} key={result.name}>
                            <div className={`modulo ${result.typeClass}`}>
                                <div className="t4">
                                    <h4 className="th4">{formatName(result.name)}</h4>
                                </div>
                                <a href={`/result?id=${result.pokemonId}`}>
                                    <img className={`img ${result.typeClass}2`} src={result.image} alt={result.name} />
                                </a>
                                <div className="tipos">
                                    {result.typeNames.map((type, index) => (
                                        <span key={type} className={`tipo ${getTypeStyle(type)}`}>
                                            {formatType(type)}
                                        </span>
                                    ))}
                                </div>
                                <span className="pokeid">#{result.pokemonId.toString().padStart(3, '0')}</span>
                            </div>
                        </nav>
                    ))}
                </div>
            </main>
            <footer className="rodape">
                {/* Footer content */}
            </footer>
        </div>
    );
}

export default Result;
