export async function GET(request,{params}) {
  const {id} = params;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const detailData = await res.json();

        // species에서 한글 이름 가져오기
        const speciesRes = await fetch(detailData.species.url);
        const speciesData = await speciesRes.json();
        const koreaNameObj = speciesData.names.find(n => n.language.name === 'ko');
        const koreanName = koreaNameObj ? koreaNameObj.name : detailData.name;

        // 타입, 키, 몸무게, 공격 등 상세정보
        const height = detailData.height;
        const weight = detailData.weight;

        const types = await Promise.all(
          detailData.types.map(async(a)=>{
            const typeRes = await fetch(a.type.url)
            const typeData = await typeRes.json();
            const koNameObj = typeData.names.find(n => n.language.name === 'ko');
            return koNameObj ? koNameObj.name : a.type.name;
          })
        )
        const abilities = await Promise.all(
          detailData.abilities.map(async (a) => {
            const abRes = await fetch(a.ability.url);
            const abData = await abRes.json();
            const koNameObj = abData.names.find(n => n.language.name === 'ko');
            return koNameObj ? koNameObj.name : a.ability.name;
          })
        );
        const moves = await Promise.all(
          detailData.moves.slice(0, 5).map(async (m) => {
            const moveRes = await fetch(m.move.url);
            const moveData = await moveRes.json();
            const koNameObj = moveData.names.find(n => n.language.name === 'ko');
            return koNameObj ? koNameObj.name : m.move.name;
          })
        );
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detailData.id}.png`;
        return new Response(JSON.stringify({
          id: detailData.id,
          name: koreanName,
          types,
          image,
          height,
          weight,
          moves,
          abilities
        }));
    } catch(err) {
        console.error(err);
        return new Response(JSON.stringify(pokemons), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}