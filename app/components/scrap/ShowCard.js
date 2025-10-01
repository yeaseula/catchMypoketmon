import Image from "next/image"

export default function ShowCard({ele}) {
    return (
        <div className="card-slot scrap-slot">
            <div className='scrap-inner'>
                <div className='front'>
                    <div className='img-box'>
                        <img src={ele.image} alt={ele.name}></img>
                        <p className='monster-index'>NO.{ele.id}</p>
                    </div>
                    <div className='text-box'>
                        <p className='monster-name'>{ele.name}</p>
                        <div className="types-container">
                        {ele.types.map(n=>(<span className="monster-type" key={n}>{n}</span>))}
                        </div>
                    </div>
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
    )
}