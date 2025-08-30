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

        //slot갯수 5개 이하면 빈값 추가, 빈 슬롯 노출
        const minSlots = 5;
        const arrList = [...stateLocal];
        while (arrList.length < minSlots) arrList.push(null);
        setDisplayArr(arrList)
        //gsap

    },[])
    return (
        <div>
            <div className={`is-not-cardlist ${isLocal? '' : 'on'}`}>
                등록된 카드가 없어요
            </div>
            {displayArr.map((ele,idx)=>(
                <div className='scrap-slots-container slotWrapper' key={`scrap-${idx}`}>
                    {ele ? (
                        <div className="scrap-slots">
                            <img src={ele.image}></img>
                            <p>{ele.id}</p>
                            <p>{ele.name}</p>
                            <p>{ele.types}</p>
                        </div>
                    ) : (
                        <div className="scrap-slots">
                            <p>등록된 카드가 없습니다.</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}