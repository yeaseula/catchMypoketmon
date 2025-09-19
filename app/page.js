// app/page.js (Server Component)
import PokemonList from './components/pokemonList.js';

export default async function Home() {
  const PAGE_ADDRESS = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${PAGE_ADDRESS}/api/pokemons?page=0`);
  const initialData = await res.json();
  return <PokemonList initialData={initialData} />;
}

