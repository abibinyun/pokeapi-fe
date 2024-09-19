import { Link } from "@tanstack/react-router";
import { useState } from "react";
import pokebal from "../assets/icons/pokeball.png";
import ball from "../assets/icons/ball.png";
import { PokemonCardProps } from "../utils/types";

const PokemonCard = ({ pokemon, handleAddToPokedex, handleRemoveFromPokedex }: PokemonCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const pokemonId = pokemon.url.split("/").filter(Boolean).pop();

  return (
    <div className="border p-4 rounded-md shadow-md flex flex-col justify-center items-center bg-white">
      <Link to="/$detailPokemon" params={{ detailPokemon: pokemon.name }} className="group">
        {!imageLoaded && (
          <div className="bg-gray-200 animate-pulse h-24 w-24 mx-auto mb-4 flex justify-center items-center">
            <img src={ball} alt="image-load" className="w-20 h-20" />
          </div>
        )}
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
          alt={pokemon.name}
          className={`mx-auto group-hover:transform group-hover:transition-transform group-hover:duration-300 group-hover:scale-110 ${imageLoaded ? "block" : "hidden"}`}
          onLoad={() => setImageLoaded(true)}
        />
        <h3 className="text-lg font-bold text-black text-center">{pokemon.name.toUpperCase()}</h3>
      </Link>
      {handleAddToPokedex && (
        <button onClick={() => handleAddToPokedex(pokemon)} className="mt-2 bg-primary text-white text-sm font-bold px-4 py-2 rounded flex justify-center items-center gap-x-2 transition-colors duration-300 hover:bg-primary-dark group">
          <img src={pokebal} className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" alt="Pokeball Icon" />
          Add
        </button>
      )}
      {handleRemoveFromPokedex && (
        <button onClick={() => handleRemoveFromPokedex(pokemon.name)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
          Remove from Pokedex
        </button>
      )}
    </div>
  );
};

export default PokemonCard;
