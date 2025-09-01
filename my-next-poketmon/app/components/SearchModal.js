"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
export default function SearchModal({searchTerm,onClose}) {

    return(
    <div className="modal-backdrop">
        <div className="modal-container">
            {searchTerm.map(p => (
                <div className="modal-inner" key={p.id}>
                    <div className="img-box">
                        <img src={p.image} alt={p.name_ko} width={200} height={200} />
                    </div>
                    <div className="text-box">
                        <p className="monster-index">NO.{p.id}</p>
                        <p className="monster-name">{p.name_ko}</p>
                        <ul>
                            <li><Link href={`/pokemons/${p.id}`} onClick={onClose} className="modal-more-view-btn">자세히 보러가기</Link></li>
                            <li><button onClick={onClose}>닫기</button></li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}