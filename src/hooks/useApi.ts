import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
});

export const useApi = () => ({
    pokemon: async (searchTerm: string) => {
        try {
            const response = await api.get(`/pokemon-form/${searchTerm}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
});
