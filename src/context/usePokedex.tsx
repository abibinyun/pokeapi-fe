import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Pokemon {
  name: string;
  url: string;
}

interface PokedexContextType {
  pokedex: Pokemon[];
  addToPokedex: (pokemon: Pokemon) => void;
  removeFromPokedex: (pokemonName: string) => void;
}

const PokedexContext = createContext<PokedexContextType | undefined>(undefined);

export const PokedexProvider = ({ children }: { children: ReactNode }) => {
  const [pokedex, setPokedex] = useState<Pokemon[]>(() => {
    const saved = localStorage.getItem("pokedex");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("pokedex", JSON.stringify(pokedex));
  }, [pokedex]);

  const addToPokedex = (pokemon: Pokemon) => {
    if (!pokedex.some((p) => p.name === pokemon.name)) {
      setPokedex((prev) => [...prev, pokemon]);
    }
  };

  const removeFromPokedex = (pokemonName: string) => {
    setPokedex((prev) => prev.filter((pokemon) => pokemon.name !== pokemonName));
  };

  return <PokedexContext.Provider value={{ pokedex, addToPokedex, removeFromPokedex }}>{children}</PokedexContext.Provider>;
};

export const usePokedex = () => {
  const context = useContext(PokedexContext);
  if (!context) {
    throw new Error("usePokedex must be used within a PokedexProvider");
  }
  return context;
};
