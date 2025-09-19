"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
export default function SearchModal({searchTerm,onClose}) {
    console.log(searchTerm.length)
    return(
    <div className="modal-backdrop">
        <div className="modal-container">
            <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                loop={false}
                pagination={{clickable:true}}
            >
                {searchTerm.length !== 0 ? (
                    searchTerm.map(p => (
                        <SwiperSlide key={p.id}>
                            <div className="modal-inner" >
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
                        </SwiperSlide>
                    ))
                ):(
                    <>
                    <p className='no-result-notice'>검색 결과가 없습니다.</p>
                    <ul>
                        <li><button onClick={onClose}>닫기</button></li>
                    </ul>
                    </>
                )}

            </Swiper>
        </div>
    </div>
    )
}