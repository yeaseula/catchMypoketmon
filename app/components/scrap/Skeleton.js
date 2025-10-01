import Image from "next/image"

export default function Skeleton() {
    return (
        <div className='skeleton-scrap-img'>
            <Image src="/images/ball.png"
            alt="흔들리는 몬스터볼"
            width={150}
            height={150}
            className="monster-ball"
            ></Image>
            <p>오늘의 포켓몬은 뭘까요?</p>
        </div>
    )
}