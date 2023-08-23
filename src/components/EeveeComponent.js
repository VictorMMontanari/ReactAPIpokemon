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

                    for (let i = 0; i < evolution.evolution_details.length; i++) {
                        const evolutionDetailInfo = evolution.evolution_details[i];
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
                            <tr>
                                {evolutionImages.length > 0 && (
                                    <td colSpan="8" align="center" className="pkmn">
                                        <div className={`${evolutionImages[0].name}`}>
                                            <h4>{formatName(evolutionImages[0].name)}</h4>
                                            <img
                                                src={evolutionImages[0].image}
                                                loading="lazy"
                                                alt={evolutionImages[0].name}
                                                width="80"
                                            />
                                        </div>
                                    </td>
                                )}
                            </tr>
                            <tr>
                                {evolutionImages.slice(1).map((evolution, index) => (
                                    <React.Fragment key={index}>
                                        <td>
                                            {evolution.level !== null && <p>Level: {evolution.level}</p>}
                                            {evolution.item !== null && (
                                                <div>
                                                    <p>Item: {evolution.item.name}</p>
                                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${evolution.item.name}.png`} alt={evolution.item.name} />
                                                </div>
                                            )}
                                            {evolution.happiness !== null && <p>Happiness: {evolution.happiness}</p>}
                                        </td>
                                    </React.Fragment>
                                ))}
                            </tr>
                            <tr>
                                {evolutionImages.slice(1).map((evolution, index) => (
                                    <React.Fragment key={index}>
                                        <td className="pkmn">
                                            <div className="subevolution">
                                                <h4>{formatName(evolution.name)}</h4>
                                                <img src={evolution.image} loading="lazy" alt={evolution.name} width="80" />
                                            </div>
                                        </td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EeveeComponent;
