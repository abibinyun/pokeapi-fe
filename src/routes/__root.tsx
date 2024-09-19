import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import { PokedexProvider } from "../context/usePokedex";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <PokedexProvider>
      <div className="flex flex-col text-lg max-w-3xl mx-auto">
        <Navbar />
        <Outlet />
      </div>
    </PokedexProvider>
  );
}
