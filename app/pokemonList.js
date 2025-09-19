"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Link from 'next/link';
import CardSlot from "./components/CardSlot";

export default function PokemonList({initialData}) {
  const [page,setPage] = useState(0);
  const [pokemons, setPokemons] = useState(initialData);

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

  let throttleTimer = null;

  useEffect(()=>{
    const handleScroll = () => {
      if(throttleTimer || document.querySelector('.loading-state')) return;
      throttleTimer = setTimeout(()=>{
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
          setPage(prev => prev + 1);
        }
        throttleTimer = null
      },1300)
      //console.log(`innerHeight: ${window.innerHeight}, scrollY: ${window.scrollY}, document: ${document.body.offsetHeight}`)
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  },[])
  return (
    <section className="main-list-section">
      <div>
        <div className="main-message-container">
          <p>나만의 포켓몬 도감을 완성해보세요!</p>
        </div>
        <div className="cardslot-container">
          <CardSlot pokemons={pokemons}/>
        </div>
      </div>
    </section>
  );
}