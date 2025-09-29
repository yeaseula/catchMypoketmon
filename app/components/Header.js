"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import SearchModal from "./SearchModal";

export default function Header () {

    const PAGE_ADDRESS = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const [onstate,setOnstate] = useState(false);
    const searchRef = useRef(null);
    const inputRef = useRef(null)
    const [searchValue,setSearchValue] = useState(''); //input value 실시간
    const [onModal,setModal] = useState(false);
    const [searchTerm,setSearchTerm] = useState([]);

    const handleSearch = async () => {
        if(onstate == true) {
            searchAction(inputRef.current)
        } else {
            setOnstate((prev) => !prev)
        }
    }

    const handleKeyDownSearch = async (e) => {
        if(e.key === 'Enter') {
            searchAction(inputRef.current)
        }
    }

    function searchAction(inputRef){
        const searchTarget = inputRef
        const SearchPokemon = async () => {
            const SearchInput = document.getElementById('search-pokemon');
            if(SearchInput.value == '') {
                alert('검색어를 입력해주세요!')
                return
            } else {
                if(SearchInput.value.length < 2) {
                    alert('2글자 이상 입력해주세요!')
                    return
                }
                //api에서 검색합니다..
                const res = await fetch(`/api/pokemons/search?q=${encodeURIComponent(searchTarget)}`);
                const data = await res.json();
                setSearchTerm(data)
                setModal(true)
                setOnstate(false);
                SearchInput.value = ''
            }
        }
        return SearchPokemon()
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
        <div>
        <header>
            <h1>
                <Link href={PAGE_ADDRESS}>
                    <Image
                        src="/images/logo-img.svg"
                        alt="로고"
                        width={265}
                        height={35}
                        priority
                    ></Image>
                </Link>
            </h1>
            <nav className="menu-box">
                <li className={`search ${onstate ? "on":""}`} ref={searchRef}>
                    <input
                    type="text"
                    name="search-pokemon"
                    id="search-pokemon"
                    placeholder="Search.."
                    onKeyDown={handleKeyDownSearch}
                    onChange={e=>inputRef.current = e.target.value} />
                    <button type="button" onClick={handleSearch}>
                        <Image
                            src="/images/search-icon-w.svg"
                            alt="검색"
                            width={30}
                            height={30}
                        ></Image>
                    </button>
                </li>
                <li className="my-scrap">
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
        {onModal && (<SearchModal searchTerm={searchTerm} onClose={() => setModal(false)}></SearchModal>)}
        </div>
    )
}