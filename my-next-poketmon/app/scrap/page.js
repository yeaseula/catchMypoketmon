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

        //slot갯수 6개 이하면 빈값 추가, 빈 슬롯 노출
        const minSlots = 6;
        const arrList = [...stateLocal];
        while (arrList.length < minSlots) arrList.push(null);
        setDisplayArr(arrList)
    },[])
    useEffect(()=>{
        const cards = gsap.utils.toArray(".scrap-slots-container"),
            radius = 340; //간격
        const Inner = gsap.utils.toArray(".scrap-inner")
        gsap.set(".slotWrapper", {
            perspective: 900,
            height: 400,
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
    return (
        <div>
            <div className={`is-not-cardlist ${isLocal? '' : 'on'}`}>
                등록된 카드가 없어요
            </div>
            <div className='slotWrapper'>
            {displayArr.map((ele,idx)=>(
                <div className='scrap-slots-container' key={`scrap-${idx}`}>
                    {ele ? (
                        <div className="scrap-slots">
                            <div className='scrap-inner'>
                                <div className='front'>
                                    <div className='scrap-img-container'>
                                        <img src={ele.image} alt={ele.name}></img>
                                        <p className='scrap-index'>NO.{ele.id}</p>
                                    </div>
                                    <div className='scrap-text-container'>
                                        <p className='scrap-name'>{ele.name}</p>
                                        <p className='scrap-type'>{ele.types.join(',')}</p>
                                    </div>
                                </div>
                                <div className='back'>
                                    <img src='/images/card-slot-back.png' alt='카드 슬롯 뒷면' className='card-slot-back'></img>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="scrap-slots empty-type">
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
        </div>
    )
}