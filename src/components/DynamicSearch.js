import React, { useState, useEffect } from "react";

function DynamicSearch({ results, setSearchResults }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);


    useEffect(() => {
        const filteredResults = results.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);

        if (searchTerm !== "") {
            const matchingSuggestions = results
                .filter(item => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
                .map(item => item.name);
            setSuggestions(matchingSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, results, setSearchResults]);

    const handleSuggestionClick = suggestion => {
        setSearchTerm(suggestion);
        setSuggestions([]); // Clear suggestions
    };

    return (
        <div>
            <input
                type="text"
                className="form-control"
                placeholder="Enter Pokémon name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DynamicSearch;
