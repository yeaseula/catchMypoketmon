"use client";

import { useEffect, useState } from 'react';

export default function ScrapPage() {

    useEffect(()=>{
        const scraptarget = JSON.parse(localStorage.getItem("scrap") || "[]")
        console.log(scraptarget)
    },[])
    return (
        <div>

        </div>
    )
}