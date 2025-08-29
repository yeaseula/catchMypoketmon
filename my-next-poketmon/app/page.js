"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("/api/pokemons")
      .then((res) => res.json())
      .then((data) => {setPokemons(data)})
      .catch(console.error);
  }, []);
  return (
    <section>
      <div className="main-message-container">
        <p>나만의 포켓몬 도감을 완성해보세요!</p>
      </div>
      <div className="cardslot-container">
        {pokemons.map((ele)=>(
          <div key={ele.id} className="card-slot">
            <div className="img-box" >
              <img src={ele.image} alt={ele.name} />
              <div className="monster-index">NO.{ele.id}</div>
            </div>
            <div className="text-box">
              <p className="monster-name">{ele.name}</p>
              <div className="monster-type">{ele.types}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
