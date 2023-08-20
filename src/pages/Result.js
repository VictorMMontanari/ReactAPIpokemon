import { useState, useEffect } from "react";
import "../style/result.css";
import '../style/busca.css';
import { useApi } from '../hooks/useApi';
import {formatName, getTypeClass, getTypeNames, getTypeStyle, formatType} from "../components/format";

function Result() {
    const { pokemon, evolutionChain } = useApi(); // Certifique-se de que useApi está retornando uma função pokemon
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [evolutionImages, setEvolutionImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const id = urlParams.get("id");
                setSearchTerm(id); // Use setSearchTerm para atualizar o estado
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

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
                    typeNames: results.types.map(typeInfo => typeInfo.type.name)
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

    useEffect(() => {
        handleSearch();
    }, [searchTerm]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pokemonData = await pokemon(searchTerm);
                const speciesUrl = pokemonData.species.url;
                const chainData = await evolutionChain(speciesUrl);
                console.log('Evolution Chain:', chainData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [searchTerm]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pokemonData = await pokemon(searchTerm);
                const speciesUrl = pokemonData.species.url;
                const chainData = await evolutionChain(speciesUrl);
                console.log('Evolution Chain:', chainData);

                const evolutions = [];
                const extractEvolutions = (evolution) => {
                    const evolutionDetails = {
                        name: evolution.species.name,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.species.url.split("/")[6]}.png`,
                        level: null, // Inicializamos como nulo
                        item: null   // Inicializamos como nulo
                    };

                    if (evolution.evolves_to.length > 0) {
                        const evolutionDetail = evolution.evolves_to[0];

                        if (evolutionDetail.evolution_details.length > 0) {
                            const evolutionDetailInfo = evolutionDetail.evolution_details[0];

                            if (evolutionDetailInfo.min_level !== undefined) {
                                evolutionDetails.level = evolutionDetailInfo.min_level;
                            }

                            if (evolutionDetailInfo.item !== null) {
                                const itemName = evolutionDetailInfo.item.name;
                                evolutionDetails.item = {
                                    name: itemName,
                                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemName}.png`
                                };
                            }
                            if (evolutionDetailInfo.min_happiness !== undefined) {
                                evolutionDetails.happiness = evolutionDetailInfo.min_happiness;
                            }
                        }
                    }

                    evolutions.push(evolutionDetails);

                    if (evolution.evolves_to.length > 0) {
                        evolution.evolves_to.forEach((subEvolution) => {
                            extractEvolutions(subEvolution);
                        });
                    }
                };

                extractEvolutions(chainData.chain);

                setEvolutionImages(evolutions);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [searchTerm]);
 

    return (
        <div>
            <header className="cabecalho">
                <div className='acertar'>
                    <div className="input-group mb-3">  
                        <h1>PokeAPI</h1>
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
                                <div className="evolutioImagesContainer">
                                    {evolutionImages.map((evolution, index) => (
                                        <div key={index} className="evolution-image">
                                            <h4>{formatName(evolution.name)}</h4>
                                            <img className="img" src={evolution.image} alt={evolution.name} />
                                            {evolution.level !== null && <p>Level: {evolution.level}</p>}
                                            {evolution.item !== null && (
                                                <div>
                                                    <img
                                                        src={evolution.item.image}
                                                        alt={evolution.item.name}
                                                        title={evolution.item.name} // Adicionar o atributo title
                                                    />
                                                </div> 
                                            )}
                                            {evolution.happiness !== undefined && (
                                                <p> {evolution.happiness}</p>
                                            )}
                                        </div>
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
