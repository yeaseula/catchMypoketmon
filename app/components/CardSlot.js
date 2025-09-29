"use client";
import Link from 'next/link';
import CardImg from './CardImg';
import styled from 'styled-components';

function CardSlot({pokemons, lastCardRef}) {

    return (
        <>
        {pokemons.map((ele,idx)=>(
            <Link href={`/pokemons/${ele.id}`} key={`${ele.name}-${idx}`}>
                <div className={`card-slot`} ref={lastCardRef && idx === pokemons.length - 1 ? lastCardRef : null}>
                    <div className="img-box">
                        <CardImg src={ele.image} alt={`${ele.name} 카드`}/>
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
        </>
    )
}

export default CardSlot;