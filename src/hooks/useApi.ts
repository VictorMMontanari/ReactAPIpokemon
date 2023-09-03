import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
});

// Cache simples para armazenar os dados da API
const cache = new Map();

export const useApi = () => {
    // Função para buscar um Pokémon pelo nome
    const pokemon = async (searchTerm: string) => {
        // Verifique se os dados já estão em cache
        if (cache.has(`pokemon-${searchTerm}`)) {
            return cache.get(`pokemon-${searchTerm}`);
        }

        try {
            const response = await api.get(`/pokemon/${searchTerm}`);
            const data = response.data;
            
            // Armazene os dados em cache
            cache.set(`pokemon-${searchTerm}`, data);

            return data;
        } catch (error) {
            throw error;
        }
    };

    // Função para buscar um tipo pelo nome
    const type = async (params: string) => {
        // Verifique se os dados já estão em cache
        if (cache.has(`type-${params}`)) {
            return cache.get(`type-${params}`);
        }

        try {
            const response = await api.get(`/type/${params}`);
            const data = response.data;
            
            // Armazene os dados em cache
            cache.set(`type-${params}`, data);

            return data;
        } catch (error) {
            throw error;
        }
    };

    // Função para buscar uma cadeia de evolução pelo URL da espécie
    const evolutionChain = async (speciesUrl: string) => {
        // Verifique se os dados já estão em cache
        if (cache.has(`evolution-chain-${speciesUrl}`)) {
            return cache.get(`evolution-chain-${speciesUrl}`);
        }

        try {
            const response = await axios.get(speciesUrl);
            const evolutionChainUrl = response.data.evolution_chain.url;
            const evolutionChainResponse = await axios.get(evolutionChainUrl);
            const data = evolutionChainResponse.data;

            // Armazene os dados em cache
            cache.set(`evolution-chain-${speciesUrl}`, data);

            return data;
        } catch (error) {
            throw error;
        }
    };

    // Dispare a busca e o armazenamento em cache assim que a página é carregada
    document.addEventListener('DOMContentLoaded', () => {
        // Chame as funções para buscar e armazenar em cache os dados que você deseja
        // Por exemplo:
        // pokemon('pikachu');
        // type('fire');
    });

    return {
        pokemon,
        type,
        evolutionChain,
    };
};
