import { useState } from "react";
import { motion } from "framer-motion";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";


const Carousel = ({ children,width,buttons }) => {
    
    const [current , setCurrent] = useState(0);
    
    const previousSlide = () => {
        if(current > 0) 
            setCurrent(current - 1);
        else
            setCurrent(children.length - 4);
    };
    
    const nextSlide = () => {
        if(current < children.length - 4)
            setCurrent(current + 1);
        else
            setCurrent(0);
    };
    
    //swipe
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    
    const onTouchStart = (e) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }
    
    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
    
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
    }

    return (
        <div className={`w-full pt-[2%] pb-[4%]`}>
            <div className="relative flex">
                <div className=" overflow-hidden mx-auto flex w-[84%]">
                    <motion.div
                    className="flex gap-3"
                    animate={{x:current*(-width-32)}}
                    onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
                    >
                        {children}
                    </motion.div>
                </div>
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
        </div>
    )
}

export default Carousel