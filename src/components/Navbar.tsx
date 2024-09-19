import { Link } from "@tanstack/react-router";
import { usePokedex } from "../context/usePokedex";
import iconPokedex from "../assets/icons/pokedex.png";
import { capitalizeFirstLetter } from "../utils/helper";

const Navbar = () => {
  const { pokedex, removeFromPokedex } = usePokedex();

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center p-4 bg-[#f7ff87] text-primary shadow-md h-20">
      <Link to="/">
        <h1 className="text-3xl font-bold hover:text-hover">Pokémon</h1>
      </Link>

      <div className="relative">
        <div className="p-5 group">
          {pokedex.length > 0 && <span className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{pokedex.length}</span>}
          <img src={iconPokedex} alt="icon-pokedex" className="w-10 h-10 cursor-pointer" />

          <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
            <div className="p-4">
              <h3 className="font-bold text-lg">Your Pokedex</h3>
              {pokedex.length === 0 ? (
                <p className="text-sm text-gray-500">No Pokémon in Pokedex</p>
              ) : (
                <ul className="max-h-40 overflow-y-auto px-3">
                  {pokedex.map((pokemon) => (
                    <li key={pokemon.name} className="flex justify-between items-center py-2">
                      <Link to="/$detailPokemon" params={{ detailPokemon: pokemon.name }} className="flex justify-center items-center">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[6]}.png`} alt={pokemon.name} className="w-8 h-8 mr-2" />
                        {capitalizeFirstLetter(pokemon.name)}
                      </Link>
                      <button onClick={() => removeFromPokedex(pokemon.name)} className="text-red-500 hover:underline ml-2">
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <Link to="/pokedex" className="block text-center mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                View Full Pokedex
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
