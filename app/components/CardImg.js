"use client";
import Link from 'next/link';
import Image from "next/image";
import {useState} from 'react'

function CardImg({src, alt}) {
    const [loading,setLoading] = useState(true)
    return (
        <>
            {loading &&
            <div className='skeleton-img'>
                <Image src="/images/ball.png"
                alt="흔들리는 몬스터볼"
                width={90}
                height={90}
                className="monster-ball"
                ></Image>
            </div>}

            <Image src={src}
                alt={alt}
                width={167}
                height={167}
                onLoadingComplete={()=>setLoading(false)}
            ></Image>
        </>
    )
}

export default CardImg;