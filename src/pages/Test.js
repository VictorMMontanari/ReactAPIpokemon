import React from 'react';
import '../style/PokemonStats.css';

const VerticalProgressBar = () => {
    let example1 = "66.6667%";
    let example2 = "33.3333%";

    return (
        <div className="acert">
            <h2>Status</h2>
            <div className="vertical-progress-container">
                <div className="vertical-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" id="moveTo" style={{ height: `${example1}` }}></div>
                    </div>
                    <div className="progress-name"><p id="p">HP</p></div>
                </div>
                <div className="vertical-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ height: `${example2}` }}></div>
                    </div>
                    <div className="progress-name"><p id="p">Attack</p></div>
                </div>
                <div className="vertical-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ height: `${example2}` }}></div>
                    </div>
                    <div className="progress-name"><p id="p">Defense</p></div>
                </div>
                <div className="vertical-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ height: `${example2}` }}></div>
                    </div>
                    <div className="progress-name"><p id="p">Special Attack</p></div>
                </div>
                <div className="vertical-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" id={{ height: `${example2}` }}></div>
                    </div>
                    <div className="progress-name"><p id="p">Special Defense</p></div>
                </div>
                <div className="vertical-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" id={{ height: `${example2}` }}></div>
                    </div>
                    <div className="progress-name"><p id="p">Speed</p></div>
                </div>
            </div>
        </div>
    );
};

export default VerticalProgressBar;
