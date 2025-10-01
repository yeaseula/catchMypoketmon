
import gsap from "gsap";
import { useState, useEffect } from "react";
import ShowCard from "./ShowCard";
import EmptyCard from "./EmptyCard";

export default function RotateCard({displayArr}) {
    const Pokemon = displayArr;
    const [radius,setRadius] = useState(340)
    useEffect(() => {
        const handleResize = () => {
            setRadius(window.innerWidth < 767 ? 182 : 340);
        };
        handleResize(); // 초기값 세팅
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(()=>{
        if(!displayArr || displayArr.length == 0) return;

        const cards = gsap.utils.toArray(".scrap-slots-container")
        const Inner = gsap.utils.toArray(".scrap-inner")

        gsap.killTweensOf(cards)
        gsap.killTweensOf(Inner)

        gsap.set(".slotWrapper", {
            perspective: 900,
            transformStyle: "preserve-3d"
        });

        cards.forEach(function(element, index) {
            gsap.set(element, {
                rotationY: index * 360 / cards.length,
                transformOrigin: "50% 50% " + -radius
            });
            gsap.to(element, {
                duration: 20,
                rotationY: "-=360",
                ease: "power3.inOut",
                onComplete(){
                    this.restart()
                }
            });
        });

        Inner.forEach((ele,idx)=>{
            gsap.to(ele,{
                duration: 20,
                repeat: -1,
                ease:"linear",
                onUpdate(){
                    const targetParent=this._targets[0].closest('.scrap-slots-container');
                    // let rotateY = 0;
                    let rotateY = gsap.getProperty(targetParent, "rotationY") % 360;
                    if (rotateY < 0) rotateY += 360;
                    if((rotateY >= 80 && rotateY <=180 ) || (rotateY >= 180 && rotateY <= 285)) {
                        ele.classList.add("rotate");
                    } else {
                        ele.classList.remove("rotate")
                    }
                }
            })
        })
    },[Pokemon,radius])

    return (
        <>
            {Pokemon.map((ele,idx)=>(
                <div className='scrap-slots-container' key={`scrap-${idx}`}>
                    {ele ? (
                        <ShowCard ele={ele}/>
                    ) : (
                        <EmptyCard />
                    )}
                </div>
            ))}
        </>
    )
}