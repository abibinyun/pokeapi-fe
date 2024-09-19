import { createFileRoute } from "@tanstack/react-router";
import PokedexPage from "../pages/Pokedex";

export const Route = createFileRoute("/pokedex")({
  component: PokedexPage,
});
