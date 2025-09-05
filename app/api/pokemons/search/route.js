import { NextResponse } from 'next/server';
import pokemons from '../../../../pokemons_ko.json';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim().toLowerCase();

  if (!q) return NextResponse.json([]);

  const results = pokemons.filter(p =>
    (p.name_ko && p.name_ko.toLowerCase().includes(q)) ||
    (p.name_en && p.name_en.toLowerCase().includes(q)) ||
    String(p.id) === q
  );

  return NextResponse.json(results.slice(0, 50));
}
