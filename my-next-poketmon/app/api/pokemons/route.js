export async function GET() {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await res.json();

        const pokemons = await Promise.all(
            data.results.map(async (p) => {
                const detailRes = await fetch(p.url);
                const detailData = await detailRes.json();

                const speciesRes = await fetch(detailData.species.url);
                const speciesData = await speciesRes.json();

                const koreaNameObj = speciesData.names.find((n) => n.language.name === "ko");
                const koreanName = koreaNameObj ? koreaNameObj.name : detailData.name;

                // 3. 타입 추출
                const types = detailData.types.map((t) => t.type.name);

                // 이미지 URL
                const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detailData.id}.png`;

                return { id: detailData.id, name: koreanName, image, types };
            })
        );
        //이전 html 에서는 없던 내용, 학습 필요
        return new Response(JSON.stringify(pokemons), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch(err) {
        console.error(err);
        return new Response(JSON.stringify(pokemons), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}