export interface Pokemon {
    name: string;
    url: string;
  }
  
export interface PokemonCardProps {
    pokemon: Pokemon;
    handleAddToPokedex?: (pokemon: Pokemon) => void;
    handleRemoveFromPokedex?: (pokemonName: string) => void;
  }

export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: { type: { name: string } }[];
    species: { url: string };
    abilities: { ability: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
  }
  
export interface PokemonEvolutionChain {
    chain: {
      species: { name: string; url: string };
      evolves_to: {
        species: { name: string; url: string };
        evolves_to: { species: { name: string; url: string } }[];
      }[];
    };
  }
  
export interface PokemonForm {
    id: number;
    name: string;
    pokemon: { url: string };
  }
  
export interface PokemonData {
    pokemonDetail: PokemonDetail;
    pokemonEvolution: PokemonEvolutionChain;
    pokemonForms: PokemonForm[];
  }