import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Playtime = ( {currentPlaytimes, setPlaytimes} ) => {
    const playtimes = ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "1.5 hours", "2 hours", "2.5 hours", "3 hours",
                         "3.5 hours", "4 hours", "5 hours", "6 hours"];

    const [minPlaytimeList, setMinPlaytimeListOpen] = useState(false);
    const [maxPlaytimeList, setMaxPlaytimeListOpen] = useState(false);
    const [minPlaytimeArray, setMinPlaytimeArray] = useState(playtimes);
    const [maxPlaytimeArray, setMaxPlaytimeArray] = useState(playtimes);
    const [playtimeMin, setPlaytimeMin] = useState("15 minutes");
    const [playtimeMax, setPlaytimeMax] = useState("6 hours");

    useEffect(() => {
        setPlaytimeMin(playtimes[currentPlaytimes[0]]);
        setPlaytimeMax(playtimes[currentPlaytimes[1]]);
      }, [currentPlaytimes]);

    const changeMinPlaytimeArray = (playtime) => {
        let playtimeArray = [];
        for (let i = 0; i <= playtimes.indexOf(playtime); i++){
            playtimeArray.push(playtimes[i]);
        }
        setMinPlaytimeArray(playtimeArray);
    }

    const changeMaxPlaytimeArray = (playtime) => {
        let playtimeArray = []
        for (let i = playtimes.indexOf(playtime); i < playtimes.length; i++){
            playtimeArray.push(playtimes[i]);
        }
        setMaxPlaytimeArray(playtimeArray);
    }

    return (
            <div className="h-[50%] w-full">
                <div className="text-2xl mt-4">
                    <span>Playtime:</span>
                </div>
                <div className="flex flex-col relative ml-4 mt-4 text-md">
                    <div className="pb-1 pt-3">
                        <div className="flex">
                            <span className="pt-1">From: </span>
                            <div className="flex flex-col absolute ml-[15%] w-[120px] overflow-hidden z-50 pointer-events-none text-xs">
                                <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[85px] place-items-center gap-1 z-40 pointer-events-auto">
                                    <button 
                                        className="text-black rounded-md bg-loginInput h-[25px] w-[85px] z-40" 
                                        onClick={() => setMinPlaytimeListOpen(true) }
                                        onBlur={()=>setTimeout(function() {
                                            setMinPlaytimeListOpen(false)
                                        }, 40)}                          
                                    >{playtimeMin}</button>
                                </div>
                                <AnimatePresence>
                                    {minPlaytimeList &&
                                        <motion.div className="rounded-lg overflow-hidden max-h-[100px] ml-2 overflow-y-scroll z-50 pointer-events-auto"
                                            initial={{y:-200,opacity:0,scale:0}}
                                            animate={{y:0,opacity:1,scale:1}}
                                            exit={{y:-200,opacity:0,scale:0}}
                                            transition={{ease:"easeInOut"}}
                                        >
                                            {minPlaytimeArray.map((playtime, index)=>(
                                                <div 
                                                key={index}
                                                className="bg-primary hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                                onClick={() => {setPlaytimeMin(playtime); 
                                                                setPlaytimes([index, playtimes.indexOf(playtimeMax)]); 
                                                                changeMaxPlaytimeArray(playtime)}}
                                                >
                                                    {playtime}
                                                </div>
                                            ))}
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="flex pt-8">
                            <span className="pt-1 pr-5">To: </span>
                            <div className="flex flex-col w-[120px] overflow-hidden z-20 pointer-events-none text-xs">
                                <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[85px] place-items-center gap-1 z-40 pointer-events-auto">
                                    <button 
                                        className="text-black rounded-md bg-loginInput h-[25px] w-[85px] z-40" 
                                        onClick={()=>setMaxPlaytimeListOpen(true)}
                                        onBlur={()=>setTimeout(function() {
                                            setMaxPlaytimeListOpen(false)
                                        }, 40)}                          
                                    >{playtimeMax}</button>
                                </div>
                                <AnimatePresence>
                                    {maxPlaytimeList &&
                                        <motion.div className="rounded-lg overflow-hidden max-h-[100px] ml-2 overflow-y-scroll z-20 pointer-events-auto"
                                            initial={{y:-200,opacity:0,scale:0}}
                                            animate={{y:0,opacity:1,scale:1}}
                                            exit={{y:-200,opacity:0,scale:0}}
                                            transition={{ease:"easeInOut"}}
                                        >
                                            {maxPlaytimeArray.map((playtime, index)=>(
                                                <div 
                                                key={index}
                                                className="bg-primary hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                                onClick={() => {setPlaytimeMax(playtime); 
                                                                setPlaytimes([playtimes.indexOf(playtimeMin), playtimes.indexOf(playtime)]); 
                                                                changeMinPlaytimeArray(playtime)}}
                                                >
                                                    {playtime}
                                                </div>
                                            ))}
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Playtime