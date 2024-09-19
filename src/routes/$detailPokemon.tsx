import { createFileRoute } from "@tanstack/react-router";
import DetailPokemon from "../pages/DetailPokemon";

export const Route = createFileRoute("/$detailPokemon")({
  loader: ({ params: { detailPokemon } }) => {
    return detailPokemon;
  },
  component: DetailPokemon,
});
