"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from 'next/link';

export default function Header () {
    const [onstate,setOnstate] = useState(false);
    const searchRef = useRef(null);

    const handleSearch = () => {
        if(onstate == true) {
            const SearchInput = document.getElementById('search-pokemon');
            if(SearchInput.value == '') {
                alert('검색어를 입력해주세요!')
                return
            } else {
                //api에서 검색합니다..
            }
        } else {
            setOnstate((prev) => !prev)
        }
        //li 밖을 클릭하면 토글이 닫혀야합니다..
    }

    useEffect(()=>{
        const handleClickOut = (e) => {
            if(searchRef.current && !searchRef.current.contains(e.target)){
                setOnstate(false);
            }
        }
        document.addEventListener('mousedown', handleClickOut);
        return ()=> document.removeEventListener('mousedown',handleClickOut)
    }, [])

    return (
        <header>
            <h1>
                <Image
                    src="/images/logo-img.svg"
                    alt="로고"
                    width={265}
                    height={35}
                    priority
                ></Image>
            </h1>
            <nav className="menu-box">
                <li className={`search ${onstate ? "on":""}`} ref={searchRef}>
                    <input type="text" name="search-pokemon" id="search-pokemon" placeholder="Search.."></input>
                    <button type="button" onClick={handleSearch}>
                        <Image
                            src="/images/search-icon-w.svg"
                            alt="검색"
                            width={30}
                            height={30}
                        ></Image>
                    </button>
                </li>
                <li className="my-scrab">
                    <Link href={`/scrap`}>
                    <button type="button">
                        <Image
                            src="/images/favorit-icon-w.svg"
                            alt="나의 카드 콜렉션으로 이동"
                            width={32}
                            height={32}
                        ></Image>
                    </button>
                    </Link>
                </li>
            </nav>
        </header>
    )
}