export async function GET(request) {
    try {
        const {searchParams} =new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 0;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`);
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
                //const types = detailData.types.map((t) => t.type.name);

                const types = await Promise.all(
                    detailData.types.map(async(a)=>{
                        const typeRes = await fetch(a.type.url)
                        const typeData = await typeRes.json();
                        const koNameObj = typeData.names.find(n => n.language.name === 'ko');
                        return koNameObj ? koNameObj.name : a.type.name;
                    })
                )


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