import { useSuspenseQuery } from "@tanstack/react-query";
import { lazy, Suspense, useState, useTransition } from "react";
import { usePokedex } from "../context/usePokedex";
import SpinerLoader from "../components/SpinerLoader";
import { fetchPokemonByName, fetchPokemons } from "../services/api";
import { Pokemon } from "../utils/types";

const PokemonCard = lazy(() => import("../components/PokemonCard"));

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPending, startTransition] = useTransition();
  const [globalSearchResult, setGlobalSearchResult] = useState<Pokemon | null>(null);
  const [searchingGlobally, setSearchingGlobally] = useState(false);

  const { addToPokedex } = usePokedex();

  const { data: pokemons, error } = useSuspenseQuery({
    queryKey: ["pokemons", currentPage],
    queryFn: () => fetchPokemons(currentPage),
  });

  const filteredPokemons = pokemons.filter((pokemon: Pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()));

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    setCurrentPage(1);

    if (searchQuery === "") {
      setGlobalSearchResult(null);
      setSearchingGlobally(false);
      return;
    }

    if (filteredPokemons.length === 0) {
      setSearchingGlobally(true);
      try {
        const result = await fetchPokemonByName(searchQuery);
        setGlobalSearchResult(result);
      } catch (error) {
        setGlobalSearchResult(null);
      } finally {
        setSearchingGlobally(false);
      }
    } else {
      setGlobalSearchResult(null);
    }
  };

  const handleNextPage = () => {
    startTransition(() => {
      setCurrentPage((prev) => prev + 1);
    });
  };

  const handlePreviousPage = () => {
    startTransition(() => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    });
  };

  return (
    <div className="container mx-auto p-4 bg-red-200 min-h-screen">
      <input type="text" placeholder="Search Pokémon" className="border rounded p-2 mb-4 w-full" value={search} onChange={handleSearch} />

      {error && <div className="text-red-500">{error.message}</div>}

      {isPending ? (
        <SpinerLoader />
      ) : (
        <Suspense fallback={<SpinerLoader />}>
          {globalSearchResult ? (
            <div className="grid grid-cols-3 gap-4">
              <PokemonCard key={globalSearchResult.name} pokemon={globalSearchResult} handleAddToPokedex={addToPokedex} />
            </div>
          ) : (
            <>
              {searchingGlobally && <p>Searching globally...</p>}
              <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
                {filteredPokemons.map((pokemon: Pokemon) => (
                  <PokemonCard key={pokemon.name} pokemon={pokemon} handleAddToPokedex={addToPokedex} />
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <button disabled={currentPage === 1} onClick={handlePreviousPage} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Previous
                </button>
                <button onClick={handleNextPage} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Next
                </button>
              </div>
            </>
          )}
        </Suspense>
      )}
    </div>
  );
};

export default Home;
