"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import SearchModal from "./SearchModal";
import styled, {keyframes} from "styled-components";

const Bounce = keyframes`
    0% {
        box-shadow: 0 0 0 rgb(21, 55, 111, 0.5);
    }
    50% {
        box-shadow: 0 3px 16px rgb(21, 55, 111, 0.5);
    }
    100% {
        box-shadow: 0 0 0 rgb(21, 55, 111, 0.5);
    }
`

const gradientBack = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`

const HeaderContainer = styled.header`
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const MenuBox = styled.ul`
    display: flex;
    gap: 12px;
    align-items: center;
`
const MenuBoxLi = styled.li`
    padding: 6px;
    border: 1px solid var(--sub-color);
    background-color: var(--sub-color);
    border-radius: 100%;
    transition: all 0.2s;

    &:hover {
        box-shadow: 0 0 0 rgb(21, 55, 111, 0.5);
        animation: ${Bounce} 1.7s ease infinite;
    }
`
const SearchBox = styled(MenuBoxLi)`
    border-radius:${(props)=>props.statement === 'on' ? '500px' : ''};
    display: flex;
    transition: all 0.4s;
    &:focus-within {
        box-shadow: 0 4px 16px rgb(21, 55, 111, 0.5);
    }
`
const SearchPokemon = styled.input`
    display: inline-block;
    border: unset;
    border-radius: 500px;
    margin-right: 0;
    background-color: var(--sub-color);
    transition: all 0.4s;
    width: ${(props)=>props.statement === 'on' ? '300px' : '0'};
    padding-left: ${(props)=>props.statement === 'on' ? '12px' : '0'};
    &:focus {
        border: unset;
        outline: unset;
    }
`
const Button = styled.button`
    width: 43px;
    height: 43px;
    border-radius: 500px;
    background-color: var(--main-color);
    background: ${
        (props)=>props.statement === 'on' ??
        'linear-gradient(270deg, var(--main-color-dark), var(--main-color))'};
    background-size: ${(props)=>props.statement === 'on' ?? '200% 200%'};
    animation: ${(props)=>props.statement === 'on' ?? `${gradientBack} 1.3s ease infinite`};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4;
`

export default function Header () {

    const PAGE_ADDRESS = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const [onstate,setOnstate] = useState(false);
    const searchBoxRef = useRef(null);
    const inputValueRef = useRef(null); //input value값 저장
    const inputRef = useRef(null)
    const [onModal,setModal] = useState(false);
    const [searchTerm,setSearchTerm] = useState([]);

    const handleSearch = async () => {
        if(onstate == true) {
            searchAction(inputValueRef.current)
        } else {
            setOnstate((prev) => !prev)
        }
    }

    const handleKeyDownSearch = async (e) => {
        if(e.key === 'Enter') {
            searchAction(inputValueRef.current)
        }
    }

    function searchAction(inputValueRef){
        const searchTarget = inputValueRef
        const SearchPokemon = async () => {
            const SearchInput = inputRef.current;
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
            if(searchBoxRef.current && !searchBoxRef.current.contains(e.target)){
                setOnstate(false);
            }
        }
        document.addEventListener('mousedown', handleClickOut);
        return ()=> document.removeEventListener('mousedown',handleClickOut)
    }, [])

    return (
        <>
        <HeaderContainer>
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
            <MenuBox>
                <SearchBox statement={`${onstate ? "on":""}`} ref={searchBoxRef}>
                    <SearchPokemon
                    type="text"
                    name="search-pokemon"
                    id="search-pokemon"
                    placeholder="Search.."
                    ref={inputRef}
                    statement={`${onstate ? "on":""}`}
                    onKeyDown={handleKeyDownSearch}
                    onChange={e=>inputValueRef.current = e.target.value} />
                    <Button type="button" onClick={handleSearch} statement={`${onstate ? "on":""}`}>
                        <Image
                            src="/images/search-icon-w.svg"
                            alt="검색"
                            width={30}
                            height={30}
                        ></Image>
                    </Button>
                </SearchBox>
                <MenuBoxLi>
                    <Link href={`/scrap`}>
                    <Button type="button">
                        <Image
                            src="/images/favorit-icon-w.svg"
                            alt="나의 카드 콜렉션으로 이동"
                            width={32}
                            height={32}
                        ></Image>
                    </Button>
                    </Link>
                </MenuBoxLi>
            </MenuBox>
        </HeaderContainer>
        {onModal && (<SearchModal searchTerm={searchTerm} onClose={() => setModal(false)}></SearchModal>)}
        </>
    )
}