import React, { useState } from "react";
import "/home/victor/bootcamp/src/style/result.css";
import '/home/victor/bootcamp/src/style/busca.css';
import { useApi } from '/home/victor/bootcamp/src/hooks/useApi.ts';
import {formatName, getTypeClass, getTypeNames, getTypeStyle, formatType} from "../components/format";

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
                    image: results.sprites.front_default,
                    typesPk: results.types.map(typeInfo => typeInfo.type.name) // Get the type names
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
                const typeIds = data.types.map(typeInfo => typeInfo.type.url.split('/').slice(-2, -1)[0]); // Extract type IDs from URLs
                return {
                    name: pokemon.name,
                    image: data.sprites.front_default,
                    typeClass: getTypeClass(typeId), // Get the class name based on the first type
                    typeNames: getTypeNames(typeIds) // Get the type names based on all type IDs
                };
            })
        );
        return results;
    };

    return (
        <div>
            <header className="cabecalho">
                <h1>PokeAPI</h1>
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
            </header>
            <main className="principal">
                <div className="conteudo">
                    <div className="cont">
                        <button className="button bug" onClick={() => handleSearchType(7)}>Bug</button>
                        <button class="button dark" onClick={() => handleSearchType(17)}>Dark</button>
                        <button class="button drag" onClick={() => handleSearchType(16)}>Dragon</button>
                        <button class="button elect" onClick={() => handleSearchType(13)}>Electric</button>
                        <button class="button fhgt" onClick={() => handleSearchType(2)}>Fight</button>
                        <button class="button fire" onClick={() => handleSearchType(10)}>Fire</button>
                        <button class="button flying" onClick={() => handleSearchType(3)}>Flying</button>
                        <button class="button ghost" onClick={() => handleSearchType(8)}>Ghost</button>
                        <button class="button grass" onClick={() => handleSearchType(12)}>Grass</button>
                        <button class="button ground" onClick={() => handleSearchType(5)}>Ground</button>
                        <button class="button ice" onClick={() => handleSearchType(15)}>Ice</button>
                        <button class="button normal" onClick={() => handleSearchType(1)}>Normal</button>
                        <button class="button poison" onClick={() => handleSearchType(4)}>Poison</button>
                        <button class="button psychic" onClick={() => handleSearchType(14)}>Psychic</button>
                        <button class="button rock" onClick={() => handleSearchType(6)}>Rock</button>
                        <button class="button steel" onClick={() => handleSearchType(9)}>Steel</button>
                        <button class="button water" onClick={() => handleSearchType(11)}>Water</button> 
                    </div>
                    {searchResults.map(result => (
                        <nav className={`modulos ${result.typeClass}`} key={result.name}>
                            <div className={`modulo ${result.typeClass}`}>
                                <h3>{formatName(result.name)}</h3>
                                <img src={result.image} alt={result.name} />
                                <div className="tipos">
                                    {result.typeNames.map((type, index) => (
                                        <span key={type} className={`tipo ${getTypeStyle(type)}`}>
                                            {formatType(type)}
                                        </span>
                                    ))}
                                </div>
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
