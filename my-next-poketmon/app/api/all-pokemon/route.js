export async function GET() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data = await res.json();

  const pokemons = await Promise.all(
    data.results.map(async (p) => {
      const detailRes = await fetch(p.url);
      const detailData = await detailRes.json();

      const speciesRes = await fetch(detailData.species.url);
      const speciesData = await speciesRes.json();
      const koreaNameObj = speciesData.names.find(n => n.language.name === 'ko');
      const koreanName = koreaNameObj ? koreaNameObj.name : detailData.name;

      return { id: detailData.id, name_ko: koreanName };
    })
  );

  return new Response(JSON.stringify(pokemons), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}