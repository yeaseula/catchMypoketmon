"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';

export default function PokemonDetails({initialData}) {

    const {id} = useParams();
    const [firstLoad,setFirstLoad] = useState(false)
    const [poketmons,setPoketmons] = useState([initialData]);
    const [isSaved,setIsSaved] = useState(false);
    const [scrapList,setScrapList] = useState([]);
    const router = useRouter();
    useEffect(()=>{
        console.log(initialData)
        async function setData () {
            const res = await fetch(`/api/pokemons/${id}`);
            const data = await res.json();
            setPoketmons([data])
            const scraptarget = JSON.parse(localStorage.getItem("scrap") || "[]")
            setIsSaved(scraptarget.some((ele)=>(ele.id === data.id)))
            setFirstLoad(true)
        }
        setData();
    },[id])


    const handleScrap = () => {
      const scraptarget = JSON.parse(localStorage.getItem("scrap") || "[]")
      //console.log(poketmons)
      //스크랩되어있지 않았을 시 실행
      if(!scraptarget.some((ele)=>{ele.id === poketmons[0].id})) {
        const newSaved = [
          { id : poketmons[0].id,
            name: poketmons[0].name,
            image: poketmons[0].image,
            types: poketmons[0].types
          },
          ...scraptarget
        ]

        localStorage.setItem("scrap", JSON.stringify(newSaved));
        setScrapList(newSaved)
        setIsSaved(true)
      }
      //localStorage.setItem('key', JSON.stringify(scraptarget))
    }
    return (
        <>
            <section className="detail-container">
                <div className="detail-card-img" >
                    <div className="img-container">
                    <img src={poketmons[0].image} alt={poketmons[0].name} />
                    </div>
                    <Image src="/images/ball.png"
                    alt="흔들리는 몬스터볼"
                    width={135}
                    height={135}
                    className="monster-ball"
                    ></Image>
                </div>
                <div className="detail-text">
                    <span className="monster-detail-index">NO.{poketmons[0].id}</span>
                    <p className="monster-detail-name">{poketmons[0].name}</p>
                    <div className="detail-info">
                    키 {poketmons[0].height}m, 몸무게 {poketmons[0].weight}kg, {poketmons[0].types.join(',')} 포켓몬이다.<br></br>
                    필살기는 {poketmons[0].moves.join(',')} ! <br></br>
                    특성은 {poketmons[0].abilities.join(',')}이다.
                    </div>
                    <div className="detail-btn-container">
                    <button type="button" className={`btn-style scrap-button ${isSaved ? "off" : ""}`} onClick={handleScrap} disabled={isSaved}>
                        {isSaved ? `${poketmons[0].name} 넌 내꺼야` : "카드 찜하기"}
                    </button>
                    <button type="button" className="btn-style back-btn" onClick={() => router.back()}>다른 포켓몬 보러가기</button>
                    </div>
                </div>
            </section>
        </>
    )
}