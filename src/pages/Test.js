import React, { useState, useEffect } from "react";
import "../style/result.css";
import { useApi } from '../hooks/useApi';
import { formatName, getTypeStyle, formatType } from "../components/format";
import EeveeComponent from "../components/EeveeComponent";
import OtherPokemonComponent from "../components/OtherPokemonComponent";

function Result() {
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
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.species.url.split("/")[6]}.png`,
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
                        result.name.toLowerCase() === "eevee" ? (
                            <EeveeComponent
                                name={result.name}
                                image={result.image}
                                typeNames={result.typeNames}
                                pokemonId={result.pokemonId}
                                evolutionImages={evolutionImages}
                            />
                        ) : (
                            <OtherPokemonComponent
                                name={result.name}
                                image={result.image}
                                typeNames={result.typeNames}
                                pokemonId={result.pokemonId}
                                evolutionImages={evolutionImages}
                            />
                        )
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
