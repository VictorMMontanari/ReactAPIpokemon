import React from "react";
import { formatName, getTypeStyle, formatType } from "../components/format";
import happinessImage from '../icon/happiness.png';

const OtherPokemonComponent = ({ name, image, typeNames, pokemonId, evolutionImages }) => (
    <div className={`moduloseevee`} key={name}>
        <div className={`moduloeevee`}>
            <div className="t4e">
                <h4 className="th4e">{formatName(name)}</h4>
            </div>
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
                <table>
                    <tbody>
                        <tr>
                        {evolutionImages.map((evolution, index) => (
                                <React.Fragment key={index}>
                                    {evolution.level !== null && (
                                        <td>
                                        </td>
                                    )}
                                    {evolution.item !== null && (
                                        <td>
                                        </td>
                                    )}
                                    {evolution.happiness !== null && (
                                        <td>
                                        </td>
                                    )}
                                    <td className="pkmn">
                                        <h4>{formatName(evolution.name)}</h4>
                                    </td>
                                </React.Fragment>
                            ))}
                        </tr>
                        <tr >
                            {evolutionImages.map((evolution, index) => (
                                <React.Fragment key={index}>
                                    {evolution.level !== null && (
                                        <td className="lv">
                                            <div className="lv-container">
                                                <h4 className="LvPk">Lv:<br />{evolution.level}</h4>
                                            </div>
                                        </td>
                                    )}
                                    {evolution.item !== null && (
                                        <td className="">
                                            <div className="ev-container">
                                                <img className="evitem"
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${evolution.item.name}.png`}
                                                    alt={evolution.item.name}
                                                />
                                            </div>
                                        </td>
                                    )}
                                    {evolution.happiness !== null && (
                                        <td className="">
                                            <div className="hap-container">
                                                <img src={happinessImage}/>
                                                {/* <h4 className="LvPk">{evolution.happiness}</h4> */}
                                            </div>
                                        </td>
                                    )}
                                    <td className="pkmn">
                                        {/* <h4>{formatName(evolution.name)}</h4> */}
                                        <img className="img" src={evolution.image} alt={evolution.name} />
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

export default OtherPokemonComponent;
