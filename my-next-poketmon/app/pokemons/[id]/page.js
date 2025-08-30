"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Details() {
    const {id} = useParams();
    const [poketmons,setPoketmons] = useState([]);
    useEffect(()=>{
        console.log(id)
        async function datass () {
            const res = await fetch(`/api/pokemons/${id}`);
            const data = await res.json();
            console.log(data)
            setPoketmons([data])
        }

        datass();
    },[id])

    return (
        <div>
        {poketmons.map((ele)=>(
            <section className="detail-container" key={ele.id}>
              <div className="detail-card-img" >
                <div className="img-container"></div>
                <img src={ele.image} alt={ele.name} />
              </div>
              <div className="detail-text">

                <p className="monster-detail-index">NO.{ele.id}</p>
                <p className="monster-detail-name">{ele.name}</p>
                <div className="detail-info">
                  키 {ele.height}, 몸무게 {ele.weight}, {ele.types.map((n)=>(<span className="detail-type" key={n.id}>{n}</span>))} 포켓몬이다.<br></br>
                  필살기는 {ele.moves.join(',')} ! <br></br>
                  특성은 {ele.abilities.join(',')}이다.
                </div>
              </div>
              <button type="button" className="scrap-button">카드 찜하기</button>
            </section>

        ))}

        </div>
    )
}