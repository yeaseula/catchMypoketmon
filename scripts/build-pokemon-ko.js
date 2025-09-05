// scripts/build-pokemon-ko.js
const fs = require('fs');

const LIMIT = 2000;
const CONCURRENCY = 10;

async function main() {
  console.log("포켓몬 데이터 가져오는 중...");

  const listRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species?limit=${LIMIT}`);
  const listJson = await listRes.json();
  const species = listJson.results;

  let idx = 0;
  const out = [];

  async function worker() {
    while (true) {
      const i = idx++;
      if (i >= species.length) break;
      const url = species[i].url;
      try {
        const r = await fetch(url);
        const j = await r.json();
        const id = j.id;
        const name_ko = j.names.find(n => n.language.name === 'ko')?.name || null;
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        out.push({ id, name_en: species[i].name, name_ko, image });

        if (i % 50 === 0) console.log(`${i}/${species.length} 완료`);
      } catch(e) {
        console.error("에러:", url, e.message);
      }
    }
  }

  await Promise.all(Array.from({length: CONCURRENCY}, worker));
  fs.writeFileSync('./pokemons_ko.json', JSON.stringify(out, null, 2), 'utf8');
  console.log("pokemons_ko.json 저장 완료!", out.length);
}

main().catch(console.error);
