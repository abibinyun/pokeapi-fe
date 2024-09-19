import { useLoaderData, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PokemonData } from "../utils/types";
import { fetchPokemonDetail } from "../services/api";

const PokemonDetailContent = () => {
  const pokemonName = useLoaderData({ from: "/$detailPokemon" });

  const {
    data: pokemonData,
    isError,
    error,
  } = useSuspenseQuery<PokemonData>({
    queryKey: ["pokemonDetail", pokemonName],
    queryFn: () => fetchPokemonDetail(pokemonName),
  });

  if (isError) {
    return <div className="text-red-500">{(error as Error).message}</div>;
  }

  const pokemonDetail: any = pokemonData?.pokemonDetail;
  const pokemonEvolution = pokemonData?.pokemonEvolution;
  const pokemonForms = pokemonData?.pokemonForms;

  const renderEvolutions = (chain: any) => {
    if (!chain) return null;

    const evolutions: JSX.Element[] = [];
    let currentChain = chain;

    while (currentChain) {
      evolutions.push(
        <div key={currentChain.species.name} className="my-2 flex flex-col justify-center items-center">
          <Link to="/$detailPokemon" params={{ detailPokemon: currentChain.species.name }}>
            {currentChain.species.name.toUpperCase()}
          </Link>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentChain.species.url.split("/")[6]}.png`} alt={currentChain.species.name} className="my-2" />
        </div>
      );
      if (currentChain.evolves_to.length > 0) {
        currentChain = currentChain.evolves_to[0];
      } else {
        currentChain = null;
      }
    }

    return <div className="grid grid-cols-3 place-items-center">{evolutions}</div>;
  };

  const renderPokemonForms = () => {
    if (!pokemonForms?.length) return null;

    return pokemonForms?.map((form) => (
      <div key={form.name} className="my-2 flex flex-col justify-center items-center">
        <Link to="/$detailPokemon" params={{ detailPokemon: form.name }}>
          {form.name.toUpperCase()}
        </Link>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${form.id}.png`} alt={form.name} className="my-2" />
      </div>
    ));
  };

  const renderAbilities = () => {
    if (!pokemonDetail?.abilities.length) return null;

    return (
      <div className="relative h-full">
        <h2 className="text-xl font-bold text-primary mt-4">Abilities</h2>
        <ul>
          {pokemonDetail.abilities.map((ability: any) => (
            <li key={ability.ability.name} className="capitalize">
              {ability.ability.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderStats = () => {
    if (!pokemonDetail?.stats.length) return null;

    return (
      <div>
        <h2 className="text-xl font-bold text-primary mt-4">Stats</h2>
        <ul>
          {pokemonDetail.stats.map((stat: any) => (
            <li key={stat.stat.name} className="capitalize">
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="p-4 bg-neutral-light">
      <div className="flex flex-wrap gap-4">
        <div className="w-full bg-neutral-light border border-neutral-dark rounded-lg p-4">
          <div className="flex flex-col items-center md:flex-row gap-4">
            <div className="flex-1">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetail?.id}.png`}
                alt={pokemonDetail?.name}
                className="w-full max-w-xs rounded-lg border border-neutral-dark"
              />
            </div>
            <div>
              <div className="flex-none">
                <h1 className="text-3xl font-bold text-primary mb-3">{pokemonDetail?.name.toUpperCase()}</h1>
                <div className="border border-neutral-dark rounded-lg p-4 mb-2">
                  <p className="text-neutral-dark">
                    <strong className="text-secondary">Height:</strong> {pokemonDetail?.height / 10} m
                  </p>
                  <p className="text-neutral-dark">
                    <strong className="text-secondary">Weight:</strong> {pokemonDetail?.weight / 10} kg
                  </p>
                  <p className="text-neutral-dark">
                    <strong className="text-secondary">Types:</strong> {pokemonDetail?.types.map((typeInfo: any) => typeInfo.type.name).join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-[40%] bg-neutral-light border border-neutral-dark rounded-lg p-4">{renderAbilities()}</div>
                <div className="w-full bg-neutral-light border border-neutral-dark rounded-lg p-4">{renderStats()}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-neutral-light border border-neutral-dark rounded-lg p-4">
          <div>
            <h2 className="text-xl font-bold text-primary mt-4">Evolutions</h2>
            <div>{renderEvolutions(pokemonEvolution?.chain)}</div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary mt-4">Alternate Forms</h2>
            <div className="grid grid-cols-3 place-items-center">{renderPokemonForms()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailContent;
