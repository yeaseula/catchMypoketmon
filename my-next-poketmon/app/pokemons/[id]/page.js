"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Details() {
    const {id} = useParams();
    const [poketmons,setPoketmons] = useState([]);
    const [isSaved,setIsSaved] = useState(false);
    const [scrapList,setScrapList] = useState([]);

    useEffect(()=>{
        //console.log(`페이지로딩 ${isSaved}`)

        async function setData () {
            const res = await fetch(`/api/pokemons/${id}`);
            const data = await res.json();
            setPoketmons([data])
            const scraptarget = JSON.parse(localStorage.getItem("scrap") || "[]")
            setIsSaved(scraptarget.some((ele)=>(ele.id === data.id)))
        }
        setData();
    },[id])


    const handleScrap = () => {
      const scraptarget = JSON.parse(localStorage.getItem("scrap") || "[]")
      //console.log(poketmons)
      //스크랩되어있지 않았을 시 실행
      if(!scraptarget.some((ele)=>{ele.id === poketmons[0].id})) {
        const newSaved = [
          ...scraptarget,
          { id : poketmons[0].id,
            name: poketmons[0].name,
            image: poketmons[0].image,
            types: poketmons[0].types
          }
        ]

        localStorage.setItem("scrap", JSON.stringify(newSaved));
        setScrapList(newSaved)
        setIsSaved(true)
      }
      //localStorage.setItem('key', JSON.stringify(scraptarget))
    }
    return (
        <div>
        {poketmons.map((ele)=>(
            <section className="detail-container" key={ele.id}>
              <div className="detail-card-img" >
                <div className="img-container">
                  <img src={ele.image} alt={ele.name} />
                </div>
                <Image src="/images/ball.png"
                alt="흔들리는 몬스터볼"
                width={135}
                height={135}
                className="monster-ball"
                ></Image>
              </div>
              <div className="detail-text">
                <span className="monster-detail-index">NO.{ele.id}</span>
                <p className="monster-detail-name">{ele.name}</p>
                <div className="detail-info">
                  키 {ele.height}m, 몸무게 {ele.weight}kg, {ele.types.map((n)=>(<span className="detail-type" key={n}>{n}</span>))} 포켓몬이다.<br></br>
                  필살기는 {ele.moves.join(',')} ! <br></br>
                  특성은 {ele.abilities.join(',')}이다.
                </div>
                <div className="detail-btn-container">
                  <button type="button" className={`btn-style scrap-button ${isSaved ? "off" : ""}`} onClick={handleScrap} disabled={isSaved}>
                    {isSaved ? `${ele.name} 넌 내꺼야` : "카드 찜하기"}
                  </button>
                  <button type="button" className="btn-style back-btn">다른 포켓몬 보러가기</button>
                </div>
              </div>
            </section>

        ))}

        </div>
    )
}