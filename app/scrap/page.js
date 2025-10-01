"use client";
import { useEffect, useState } from 'react';
import CardSlot from "../components/CardSlot";
import RotateCard from "../components/scrap/RotateCard";
import Skeleton from "../components/scrap/Skeleton";

export default function ScrapPage() {
    const [displayArr,setDisplayArr] = useState([])
    const [localstate,setLocalstate] = useState([])
    const [isLocal,setIsLocal] = useState(false)
    const [isBtnOn,setIsBtnOn] = useState(false)
    const [isMoreView,setIsMoreView] = useState(false)
    const [loading,setLoading] = useState(true)

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
            setLoading(false)
        } else {
            const arrList = [...stateLocal]
            const newarrList = [];
            arrList.forEach((ele,idx)=>{
                if(idx < 6) {
                    newarrList.push(ele)
                }
                setDisplayArr(newarrList)
            })
            setLoading(false)
        }
    },[])

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
                    {loading && <Skeleton/> }
                    <RotateCard displayArr={displayArr}/>
                </div>

                <button type='button' className={`more-view-btn ${isBtnOn? 'on' : ''}`} onClick={handleMoreCollection}>수집한 모든 카드 보기</button>

                {isMoreView ? (
                <div className="cardslot-container">
                    <CardSlot pokemons={localstate}/>
                </div>
                ):(``)}
            </section>
        </div>
    )
}