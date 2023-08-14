import React, { useState } from "react";
import "/home/victor/bootcamp/src/style/result.css"; // Certifique-se de que o caminho está correto
import '/home/victor/bootcamp/src/style/busca.css';
import { useApi } from '/home/victor/bootcamp/src/hooks/useApi.ts'; // Certifique-se de que o caminho está correto

function Result() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { pokemon } = useApi();

    const handleSearch = async () => {
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }

        try {
            const results = await pokemon(searchTerm);

            if (results) {
                setSearchResults([results]);
                console.log(results);
            } else {
                setSearchResults([]);
                alert("Não encontrado o Pokemon, digite novamente");
            }
        } catch (error) {
            setSearchResults([]);
            console.error('Error fetching data:', error);
            alert('Erro ao buscar o Pokemon. Por favor, tente novamente.');
        }
    };

    return (
        <div>
            <header className="cabecalho">
                <h1>PokeAPI</h1>
                <div className='acertar'>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="principal">
                <div className="conteudo">
                    {searchResults.map(result => (
                        <nav className="modulos" key={result.id}>
                            <div className="modulo verde">
                                <h3>{result.name}</h3>
                                <ul>
                                    <li>
                                        <img src={result.sprites.front_default} alt={result.name} />
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    ))}
                </div>
            </main>
            <footer className="rodape">
                {/* Conteúdo do rodapé */}
            </footer>
        </div>
    );
}

export default Result;
