import { useState } from "react";
import { motion } from "framer-motion";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";


const Carousel = ({ children,width,buttons }) => {
    
    const [current , setCurrent] = useState(0);
    
    const previousSlide = () => {
        if(current ===0) setCurrent(children.length - 1);
        else setCurrent(current-1);
    };
    
    const nextSlide = () => {
        if(current === children.length - 1) setCurrent(0);
        else setCurrent(current+1);
    };
    
    //swipe
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    
    const minSwipeDistance = 50 
    
    const onTouchStart = (e) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }
    
    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
    
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe){
            nextSlide()
        }
        if (isRightSwipe){
            previousSlide()
        }
    }

    return (
        <div className={`w-full overflow-hidden pt-[2%]`}>
            <div className="relative flex">
                <motion.div
                className="flex gap-3 ml-20"
                animate={{x:current*(-width-32)}}
                onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
                >
                    {children}
                </motion.div>
                <div className="absolute top-0 h-full w-full justify-between items-center flex pointer-events-none">
                    <button onClick={previousSlide} className="pointer-events-auto">
                        <SlArrowLeft size={64}/>
                    </button>
                    {buttons &&
                    <button onClick={nextSlide} className="pointer-events-auto">
                        <SlArrowRight size={64}/>
                    </button>
                    }
                </div>
            </div>
            <div className="flex justify-center py-5 gap-2 w-full">
                {children.map((s,i) =>{
                    return(
                        <button
                        onClick={() => {
                            setCurrent(i);
                        }}
                        className={`rounded-full w-3 h-3 ${i==current?'bg-white':'bg-gray-400'}`}
                        ></button>
                    )
                })}
            </div>
        </div>
    )
}

export default Carousel