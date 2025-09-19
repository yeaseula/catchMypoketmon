"use client";
import Link from 'next/link';
import Image from "next/image";

function CardSlot({pokemons}) {
    return (
        <>
        {pokemons.map((ele,idx)=>(
            <Link href={`/pokemons/${ele.id}`} key={`${ele.id}-${idx}`}>
                <div className="card-slot">
                    <div className="img-box" >
                        <Image src={ele.image}
                            alt={`${ele.name} 카드`}
                            width={167}
                            height={167}
                        ></Image>
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