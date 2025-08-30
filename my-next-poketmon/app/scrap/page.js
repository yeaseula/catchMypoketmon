"use client";

import { useEffect, useState } from 'react';

export default function ScrapPage() {
    const [isLocal,setIsLocal] = useState(false)
    const [localstate,setLocalstate] = useState([])
    useEffect(()=>{
        const stateLocal = JSON.parse(localStorage.getItem("scrap") || "[]");
        setLocalstate(stateLocal)
        const States = stateLocal.length !== 0? true : false;
        setIsLocal(States)
    },[])
    return (
        <div>
            <div className={`is-not-cardlist ${isLocal? '' : 'on'}`}>
                등록된 카드가 없어요
            </div>
            {localstate.map((ele,idx)=>(
                <div className='slots' key={`${ele.id}-${idx}`}>
                    <img src={ele.image}></img>
                    <p>{ele.name}</p>
                </div>
            ))}
        </div>
    )
}