import React from "react";
import '../style/PokemonStats.css';
import { formatName } from "./format";

const VerticalProgressBar = ({ stats }) => {
    return (
        <div className="acert">
            <h2>Status</h2>
            <div className="vertical-progress-container">
                <div className="vertical-progress" key={stats.pokemonId}>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ height: `${stats[0].base_stat}px` }} title={`${formatName(stats[0].stat.name)}`} dangerouslySetInnerHTML={{ __html: `<b> ${stats[0].base_stat}</b>` }}></div>
                    </div>
                    <div className="progress-name"><p id="p">HP</p></div>
                </div>
                <div className="vertical-progress" key={stats.pokemonId}>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ height: `${stats[1].base_stat}px` }} title={`${formatName(stats[1].stat.name)}`} dangerouslySetInnerHTML={{ __html: `<b> ${stats[1].base_stat}</b>` }}></div>
                    </div>
                    <div className="progress-name"><p id="p">Att</p></div>
                </div>
                <div className="vertical-progress" key={stats.pokemonId}>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ height: `${stats[2].base_stat}px` }} title={`${formatName(stats[2].stat.name)}`} dangerouslySetInnerHTML={{ __html: `<b> ${stats[2].base_stat}</b>` }}></div>
                    </div>
                    <div className="progress-name"><p id="p">Def</p></div>
                </div>
                <div className="vertical-progress" key={stats.pokemonId}>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ height: `${stats[3].base_stat}px` }} title={`${formatName(stats[3].stat.name)}`} dangerouslySetInnerHTML={{ __html: `<b> ${stats[3].base_stat}</b>` }}></div>
                    </div>
                    <div className="progress-name"><p id="p">Sp.Att</p></div>
                </div>
                <div className="vertical-progress" key={stats.pokemonId}>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ height: `${stats[4].base_stat}px` }} title={`${formatName(stats[4].stat.name)}`} dangerouslySetInnerHTML={{ __html: `<b> ${stats[4].base_stat}</b>` }}></div>
                    </div>
                    <div className="progress-name"><p id="p">Sp.Def</p></div>
                </div>
                <div className="vertical-progress" key={stats.pokemonId}>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ height: `${stats[5].base_stat}px` }} title={`${formatName(stats[5].stat.name)}`} dangerouslySetInnerHTML={{ __html: `<b> ${stats[5].base_stat}</b>` }}></div>
                    </div>
                    <div className="progress-name"><p id="p">Speed</p></div>
                </div>
                {/* Repeat similar blocks for other stats */}
            </div>
        </div>
    );
};

export default VerticalProgressBar;
