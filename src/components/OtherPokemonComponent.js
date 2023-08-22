import React from "react";
import { formatName, getTypeStyle, formatType } from "../components/format";

const OtherPokemonComponent = ({ name, image, typeNames, pokemonId, evolutionImages }) => (
    <nav className={`modulos1 ${typeNames[0]}`} key={name}>
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
                    {evolutionImages.map((evolution, index) => (
                            <div key={index} className="evolution-image">
                                <h4>{formatName(evolution.name)}</h4>
                                <img className="img" src={evolution.image} alt={evolution.name} />
                                {evolution.level !== null && <p>Level: {evolution.level}</p>}
                                {evolution.item !== null && (
                                    <div>
                                        <p>Item: {evolution.item.name}</p>
                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${evolution.item.name}.png`} alt={evolution.item.name} />
                                    </div>
                                )}
                                {evolution.happiness !== null && <p>Happiness: {evolution.happiness}</p>}
                            </div>
                        ))}
                </div>
            </div>
        </nav>
);

export default OtherPokemonComponent;
