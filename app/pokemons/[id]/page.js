import PokemonDetails from "../pokemonDetail.js";

export default async function Detail({params}) {
  const awaitedParams = await params;
  const id = awaitedParams.id;
  const PAGE_ADDRESS = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${PAGE_ADDRESS}/api/pokemons/${id}`, { cache: "force-cache" });
  const initialData = await res.json();
  return <PokemonDetails initialData={initialData} />;
}
