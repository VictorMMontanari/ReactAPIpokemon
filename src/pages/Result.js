import { useState, useEffect } from "react";
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

    /* useEffect(() => {
        const fetchData = async () => {
          try {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get("id");
            const searchTerm = id;
      
            
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      }, []); */

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
                    </div>
                    {searchResults.map(result => (
                        <nav className={`modulos1 ${result.typeClass}`} key={result.name}>
                            <div className={`modulo1 ${result.typeClass}`}>
                                <div className="t4">
                                    <h4 className="th4">{formatName(result.name)}</h4>
                                </div>
                                <img className="img" src={result.image} alt={result.name} />
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
