"use client";

import Image from "next/image";
import styles from "../page.module.css"
import { useEffect, useState, useRef, useCallback } from "react";
import CardSlot from "./CardSlot";

export default function PokemonList({initialData}) {
  const [page,setPage] = useState(0);
  const [pokemons, setPokemons] = useState(initialData);
  const [lastCard,setLastCard] = useState(null)
  const observer = useRef(null)

  useEffect(() => {
    if(page == 0) return;
    const fetchPokemonData = async () => {
    const section = document.querySelector('section')
    const p = document.createElement('p')
    p.classList.add('loading-state')
    p.textContent = '로딩중..'
    section.append(p)
      try {
          const res = await fetch(`/api/pokemons?page=${page}`);
          const data = await res.json();
          p.remove();
          //console.log(data) //결과 순서가 뒤죽박죽으로 나오는걸 확인
          setPokemons(prev => [...prev, ...data])
      } catch (err) {
        console.error(err)
      }
    }
    fetchPokemonData();
  }, [page]);

  // 마지막 슬롯 콜백 ref
  const lastCardRef = useCallback(node => {
    if (!node) return;

    // 이전 observer cleanup
    if (observer.current) observer.current.disconnect();

    // 새 observer 등록
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage(prev => prev + 1); // 다음 카드 불러오기
        }
      },
      { threshold: 1 }
    );

    observer.current.observe(node);
  }, []);

  return (
    <section className="main-list-section">
      <div>
        <div className="main-message-container">
          <p>나만의 포켓몬 도감을 완성해보세요!</p>
        </div>
        <div className="cardslot-container">
          <CardSlot pokemons={pokemons} lastCardRef={lastCardRef}/>
        </div>
      </div>
    </section>
  );
}