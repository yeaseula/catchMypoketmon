"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Home() {
  const [firstLoad,setFirstLoad] = useState(false)
  const [page,setPage] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  useEffect(()=>{
    setTimeout(()=>{
      setFirstLoad(true)
    },3000)
    console.log(firstLoad)
  },[])

  useEffect(() => {
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
          //console.log(data) 결과 순서가 뒤죽박죽으로 나오는걸 확인
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
      {firstLoad?(
      <div>
        <div className="main-message-container">
          <p>나만의 포켓몬 도감을 완성해보세요!</p>
        </div>
        <div className="cardslot-container">
          {pokemons.map((ele,idx)=>(
            <Link href={`/pokemons/${ele.id}`} key={`${ele.id}-${idx}`}>
              <div className="card-slot">
                <div className="img-box" >
                  <img src={ele.image} alt={ele.name} />
                  <div className="monster-index">NO.{ele.id}</div>
                </div>
                <div className="text-box">
                  <p className="monster-name">{ele.name}</p>
                  <div className="types-container">
                    {ele.types.map(n=>(<span className="monster-type" key={n}>{n}</span>))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      ):(
        <div className="loading-first">
          <div className="loading-inner">
              <img src='/images/main-loading.png' alt="로딩"></img>
              <p>포켓몬 도감 생성중...</p>
          </div>
        </div>
      )}
    </section>
  );
}
