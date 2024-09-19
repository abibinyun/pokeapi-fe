import { Link } from "@tanstack/react-router";
import { usePokedex } from "../context/usePokedex";

const PokedexPage = () => {
  const { pokedex, removeFromPokedex } = usePokedex();

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Pokédex</h1>

      {pokedex.length === 0 ? (
        <div>
          <p className="text-lg">No Pokémon in your Pokédex.</p>
          <Link to="/" className="text-blue-500 hover:underline mt-4 block">
            Go catch some Pokémon!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pokedex.map((pokemon) => (
            <div key={pokemon.name} className="bg-white shadow-lg rounded-lg p-4">
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`} alt={pokemon.name} className="w-20 h-20 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-center">{pokemon.name}</h2>
              <button onClick={() => removeFromPokedex(pokemon.name)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokedexPage;
