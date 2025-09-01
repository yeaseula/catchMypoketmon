"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
export default function SearchModal({searchTerm,onClose}) {

    const [modalData,setModalData] = useState(null)
    useEffect(()=>{
        if(!searchTerm) return;
        const controller = new AbortController();
        const modalFetchData = async () => {

            try {
                const res = await fetch(`/api/all-pokemon`, { signal: controller.signal });
                const data = await res.json();

                const myTarget = data.find((p)=>p.name_ko.includes(searchTerm))

                //console.log(myTarget) //obj
                //console.log(searchTerm) //obj

                if(myTarget) {
                    const realRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${myTarget.id}`);
                    const realData = await realRes.json();
                    //console.log(realData)
                    const speciesRes = await fetch(realData.species.url);
                    const speciesData = await speciesRes.json();
                    const koreaNameObj = speciesData.names.find(n => n.language.name === 'ko');
                    const koreanName = koreaNameObj ? koreaNameObj.name : realData.name;
                    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${realData.id}.png`;
                    setModalData({
                        id: realData.id,
                        name:koreanName,
                        image:image
                    })

                } else {
                    setModalData(null)
                }
            } catch(err) {
                if(err.name !== 'AbortError') console.error(err);
            }
        }

        modalFetchData();
        return () => controller.abort();
    },[searchTerm])

    return(
    <div className="modal-container">
        {modalData ? (
        <div>
            <img src={modalData.image}></img>
            <p>{modalData.name}</p>
            <button onClick={onClose}>닫기</button>
        </div>
        ) : (
        <p>검색 결과 없음</p>
        )}
    </div>
    )
}