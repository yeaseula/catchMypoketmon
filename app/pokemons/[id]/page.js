import PokemonDetails from "./pokemonDetail";

export default async function Detail({params}) {
  const awaitedParams = await params; // Next.js 권장
  const id = awaitedParams.id;
  console.log(id)
  const PAGE_ADDRESS = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${PAGE_ADDRESS}/api/pokemons/${id}`);
  const initialData = await res.json();
  return <PokemonDetails initialData={initialData} />;
}
