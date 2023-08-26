import React, { useState, useEffect } from "react";
import "../style/result.css";

function PokemonWeaknesses({ pokemonName }) {
    const [weaknesses, setWeaknesses] = useState({});

    useEffect(() => {
        async function fetchWeaknesses() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                const data = await response.json();

                const types = data.types.map(type => type.type.name);
                const weaknessesData = {};

                for (const type of types) {
                    const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
                    const typeData = await typeResponse.json();

                    typeData.damage_relations.double_damage_from.forEach(weakType => {
                        if (!types.includes(weakType.name) && !weaknessesData[weakType.name]) {
                            weaknessesData[weakType.name] = 2; // Double damage
                        }
                    });

                    typeData.damage_relations.half_damage_from.forEach(weakType => {
                        if (!types.includes(weakType.name) && !weaknessesData[weakType.name]) {
                            weaknessesData[weakType.name] = 0.5; // Half damage
                        }
                    });
                }

                setWeaknesses(weaknessesData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchWeaknesses();
    }, [pokemonName]);

    return (
        <div>
            <h3>Weaknesses:</h3>
            <ul className="ulTipo">
                {Object.entries(weaknesses).map(([type, multiplier]) => (
                    multiplier === 2 && (
                        <li key={type} className="liTipo">
                            <span className={`tipo ${type}`} title={`Multiplicador: ${multiplier}x`}>{type}</span> 
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
}


export default PokemonWeaknesses;
