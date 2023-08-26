import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
});

export const useApi = () => ({
    pokemon: async (searchTerm: string) => {
        try {
            const response = await api.get(`/pokemon/${searchTerm}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    type: async (params: string) => {
        try {
            const response = await api.get(`/type/${params}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    evolutionChain: async (speciesUrl: string) => {
        try {
            const response = await axios.get(speciesUrl);
            const evolutionChainUrl = response.data.evolution_chain.url;
            const evolutionChainResponse = await axios.get(evolutionChainUrl);
            return evolutionChainResponse.data;
        } catch (error) {
            throw error;
        }
    },
});
