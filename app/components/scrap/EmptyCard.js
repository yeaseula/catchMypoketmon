import Image from "next/image"

export default function EmptyCard() {
    return (
        <>
        <div className="scrap-slot empty-type">
            <div className='scrap-inner'>
                <div className='front'>
                    <p>등록된 카드가 없습니다.</p>
                </div>
                <div className='back'>
                    <Image src={'/images/card-slot-back.png'}
                        alt={'카드 슬롯 뒷면'}
                        width={330}
                        height={440}
                        className='card-slot-back'
                    >
                    </Image>
                </div>
            </div>
        </div>
        </>
    )
}