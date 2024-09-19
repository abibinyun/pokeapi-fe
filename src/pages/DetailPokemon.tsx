import { lazy, Suspense } from "react";
import SpinerLoader from "../components/SpinerLoader";

const PokemonDetailContent = lazy(() => import("../components/DetailCard"));

const DetailPokemon = () => (
  <div className="bg-red-200 min-h-screen">
    <Suspense fallback={<SpinerLoader />}>
      <PokemonDetailContent />
    </Suspense>
  </div>
);

export default DetailPokemon;
