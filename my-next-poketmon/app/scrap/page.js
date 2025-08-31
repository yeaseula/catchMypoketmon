"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function ScrapPage() {
    const [displayArr,setDisplayArr] = useState([])
    const [localstate,setLocalstate] = useState([])
    const [isLocal,setIsLocal] = useState(false)
    const [isBtnOn,setIsBtnOn] = useState(false)
    const [isMoreView,setIsMoreView] = useState(false)
    useEffect(()=>{
        const stateLocal = JSON.parse(localStorage.getItem("scrap") || "[]");
        setLocalstate(stateLocal)
        const States = stateLocal.length !== 0? false : true;
        setIsLocal(States)

        //slot갯수 6개 이하면 빈값 추가, 빈 슬롯 노출
        if(stateLocal.length < 7) {
            const minSlots = 6;
            const arrList = [...stateLocal];
            while (arrList.length < minSlots) arrList.push(null);
            setDisplayArr(arrList)
        } else {
            const arrList = [...stateLocal]
            const newarrList = [];
            arrList.forEach((ele,idx)=>{
                if(idx < 6) {
                    newarrList.push(ele)
                }
                setDisplayArr(newarrList)
            })
        }
    },[])
    useEffect(()=>{
        const cards = gsap.utils.toArray(".scrap-slots-container"),
            radius = 340; //간격
        const Inner = gsap.utils.toArray(".scrap-inner")
        gsap.set(".slotWrapper", {
            perspective: 900,
            transformStyle: "preserve-3d"
        });

        cards.forEach(function(element, index) {
            gsap.set(element, {
                rotationY: index * 360 / cards.length,
                transformOrigin: "50% 50% " + -radius
            });
            gsap.to(element, {
                duration: 20,
                rotationY: "-=360",
                ease: "power3.inOut",
                onComplete(){
                    this.restart()
                }
            });
        });

        Inner.forEach((ele,idx)=>{
            gsap.to(ele,{
                duration: 20,
                repeat: -1,
                ease:"linear",
                onUpdate(){
                    const targetParent=this._targets[0].closest('.scrap-slots-container');
                    // let rotateY = 0;
                    let rotateY = gsap.getProperty(targetParent, "rotationY") % 360;
                    if (rotateY < 0) rotateY += 360;
                    if((rotateY >= 80 && rotateY <=180 ) || (rotateY >= 180 && rotateY <= 285)) {
                        ele.classList.add("rotate");
                    } else {
                        ele.classList.remove("rotate")
                    }
                }
            })
        })
    },[displayArr])
    useEffect(()=>{
        //로컬 저장 데이터가 6개를 초과하면 more view 버튼 노출
        if(localstate.length > 6) {
            setIsBtnOn(true)
        }
    },[displayArr])

    const handleMoreCollection = ()=>{
        setIsMoreView(true)
    }

    return (
        <div>
            <section className='my-collection-section'>
                <p className='my-collection-title'>
                    {isLocal ? ('카드를 수집해주세요!'):('나의 수집 목록')}
                </p>
                <div className='slotWrapper'>
                {displayArr.map((ele,idx)=>(
                    <div className='scrap-slots-container' key={`scrap-${idx}`}>
                        {ele ? (
                            <div className="card-slot scrap-slot">
                                <div className='scrap-inner'>
                                    <div className='front'>
                                        <div className='img-box'>
                                            <img src={ele.image} alt={ele.name}></img>
                                            <p className='monster-index'>NO.{ele.id}</p>
                                        </div>
                                        <div className='text-box'>
                                            <p className='monster-name'>{ele.name}</p>
                                            <div className="types-container">
                                            {ele.types.map(n=>(<span className="monster-type" key={n}>{n}</span>))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='back'>
                                        <img src='/images/card-slot-back.png' alt='카드 슬롯 뒷면' className='card-slot-back'></img>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="scrap-slot empty-type">
                                <div className='scrap-inner'>
                                    <div className='front'>
                                        <p>등록된 카드가 없습니다.</p>
                                    </div>
                                    <div className='back'>
                                        <img src='/images/card-slot-back.png' alt='카드 슬롯 뒷면' className='card-slot-back'></img>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                </div>

                <button type='button' className={`more-view-btn ${isBtnOn? 'on' : ''}`} onClick={handleMoreCollection}>수집한 모든 카드 보기</button>

                {isMoreView ? (

                <div className="cardslot-container">
                    {localstate.map((ele,idx)=>(
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
                ):(``)}
            </section>
        </div>
    )
}