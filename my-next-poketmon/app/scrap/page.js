"use client";

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function ScrapPage() {
    const [displayArr,setDisplayArr] = useState([])
    const [isLocal,setIsLocal] = useState(false)
    const [localstate,setLocalstate] = useState([])
    useEffect(()=>{
        const stateLocal = JSON.parse(localStorage.getItem("scrap") || "[]");
        setLocalstate(stateLocal)
        const States = stateLocal.length !== 0? true : false;
        setIsLocal(States)
        const minSlots = 5;
        setDisplayArr(prev => [...prev,...stateLocal])
        while (displayArr.length < minSlots) {
            displayArr.push(null)
        }
    },[])
    return (
        <div>
            <div className={`is-not-cardlist ${isLocal? '' : 'on'}`}>
                등록된 카드가 없어요
            </div>
            {displayArr.map((ele,idx)=>(
                <div className='slots slotWrapper' key={`scrap-${idx}`}>
                    {ele ? (
                        <div className="card box creative-pro">
                            <img src={ele.image}></img>
                            <p>{ele.id}</p>
                            <p>{ele.name}</p>
                            <p>{ele.types}</p>
                        </div>
                    ) : (
                        <div className="card box creative-pro">
                            <p>등록된 카드가 없습니다.</p>
                        </div>
                    )}

                </div>
            ))}
        </div>
    )
}