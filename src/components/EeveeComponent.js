import React, { useState, useEffect } from "react";
import { formatName, getTypeStyle, formatType } from "./format";
import "../style/eevee.css";
import { useApi } from "../hooks/useApi";

const EeveeComponent = ({ name, image, typeNames, pokemonId }) => {
    const { pokemon, evolutionChain } = useApi();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [evolutionImages, setEvolutionImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const id = urlParams.get("id");
                setSearchTerm(id);
    
                const pokemonData = await pokemon(id);
                setSearchResults([{
                    name: pokemonData.name,
                    image: pokemonData.sprites.other["official-artwork"].front_default,
                    pokemonId: pokemonData.id,
                    typeNames: pokemonData.types.map(typeInfo => typeInfo.type.name)
                }]);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pokemonData = await pokemon(searchTerm);
                const speciesUrl = pokemonData.species.url;
                const chainData = await evolutionChain(speciesUrl);
    
                const evolutions = [];
                const extractEvolutions = (evolution) => {
                    const evolutionDetails = {
                        name: evolution.species.name,
                        image: null, // Set to null by default
                        level: null,
                        item: null,
                        happiness: null
                    };
                
                    if (evolution.evolution_details.length > 0) {
                        const evolutionDetailInfo = evolution.evolution_details[0];
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
                
                    if (evolution.species.url) { // Check if species URL is defined
                        evolutionDetails.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.species.url.split("/")[6]}.png`;
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
        <div className={`modulos1 ${typeNames[0]}`} key={name}>
            <div className={`modulo1 ${typeNames[0]}`}>
                <h4 className="th4">{formatName(name)}</h4>
                <img className="img" src={image} alt={name} />
                <div className="tipos">
                    {typeNames.map((type, index) => (
                        <span key={type} className={`tipo ${getTypeStyle(type)}`}>
                            {formatType(type)}
                        </span>
                    ))}
                </div>
                <span className="pokeid">#{pokemonId.toString().padStart(3, '0')}</span>
                <div className="evolutioImagesContainer">
                    <table className="evochain">
                        <tbody>
                            {evolutionImages.map((evolution, index) => (
                                <tr key={index}>
                                    <td className="pkmn">
                                        <a href={`/pokedex-sv/${evolution.name}.shtml`}>
                                            <img src={evolution.image} loading="lazy" alt={evolution.name} width="80" />
                                        </a>
                                    </td>
                                    <td>
                                        <p>{evolution.trigger}</p>
                                        {evolution.condition && <p>{evolution.condition}</p>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EeveeComponent;
