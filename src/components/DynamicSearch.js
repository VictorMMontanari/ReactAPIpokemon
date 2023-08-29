import React, { useState, useEffect } from "react";
import '../style/busca.css';

function DynamicSearch({ results, setSearchResults }) {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const filteredResults = results.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [searchTerm, results, setSearchResults]);

    return (
        <div>
            <input
                type="text"
                className="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredResults.map(result => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default DynamicSearch;
