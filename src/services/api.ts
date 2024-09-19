import axios from "axios";
import { PokemonData } from "../utils/types";

const fetchPokemons = async (page: number) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);
    return response.data.results;
  };
  
  const fetchPokemonByName = async (name: string) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      return {
        name: response.data.name,
        url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
      };
    } catch (error) {
      throw new Error("Pokémon not found.");
    }
  };

  const fetchPokemonDetail = async (pokemonName: string): Promise<PokemonData> => {
    const pokemonResponse = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
  
    const speciesResponse = pokemonResponse.then((response) => axios.get(response.data.species.url));
  
    const evolutionChainResponse = speciesResponse.then((species) => axios.get(species.data.evolution_chain.url));
  
    const varietiesResponse = speciesResponse.then((species) => {
      const varieties = species.data.varieties;
      const formPromises = varieties.map((variety: any) => axios.get(variety.pokemon.url));
      return Promise.all(formPromises);
    });
  
    const [pokemonDetail, pokemonEvolution, pokemonForms] = await Promise.all([pokemonResponse, evolutionChainResponse, varietiesResponse]);
  
    return {
      pokemonDetail: pokemonDetail.data,
      pokemonEvolution: pokemonEvolution.data,
      pokemonForms: pokemonForms.map((res) => res.data),
    };
  };

  export {
    fetchPokemons,
    fetchPokemonByName,
    fetchPokemonDetail
  }