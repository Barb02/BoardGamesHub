import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Complexity = ( {currentComplexities, setComplexities} ) => {
    const complexities = ["1 - Light", "2 - Medium Light", "3 - Medium", "4 - Medium Heavy", "5 - Heavy"];

    const [minComplexityList, setMinComplexityListOpen] = useState(false);
    const [maxComplexityList, setMaxComplexityListOpen] = useState(false);
    const [minComplexityArray, setMinComplexityArray] = useState(complexities);
    const [maxComplexityArray, setMaxComplexityArray] = useState(complexities);
    const [complexityMin, setComplexityMin] = useState();
    const [complexityMax, setComplexityMax] = useState();

    useEffect(() => {
        setComplexityMin(complexities[currentComplexities[0]]);
        setComplexityMax(complexities[currentComplexities[1]]);
        changeMinComplexityArray(complexities[currentComplexities[1]]);
        changeMaxComplexityArray(complexities[currentComplexities[0]]);
    }, []);

    const changeMinComplexityArray = (complexity) => {
        let complexityArray = []
        for (let i = 0; i <= complexities.indexOf(complexity); i++){
            complexityArray.push(complexities[i]);
        }
        setMinComplexityArray(complexityArray);
    }

    const changeMaxComplexityArray = (complexity) => {
        let complexityArray = []
        for (let i = complexities.indexOf(complexity); i < complexities.length; i++){
            complexityArray.push(complexities[i]);
        }
        setMaxComplexityArray(complexityArray);
    }

    return (
            <div className="h-[45%] w-full">
                <div className="text-2xl ml-5 mt-4">
                    <span>Complexity:</span>
                </div>
                <div className="flex flex-col relative ml-4 mt-4 text-md">
                    <div className="pb-1 pt-3">
                        <div className="flex">
                            <span className="pt-1">From: </span>
                            <div className="flex flex-col absolute ml-[15%] w-[150px] overflow-hidden z-50 pointer-events-none text-xs">
                                <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[140px] place-items-center gap-1 z-40 pointer-events-auto">
                                    <button 
                                        className="text-black rounded-md bg-loginInput h-[25px] w-[140px] z-40" 
                                        onClick={() => setMinComplexityListOpen(true) }
                                        onBlur={()=>setTimeout(function() {
                                            setMinComplexityListOpen(false)
                                        }, 40)}                          
                                    >{complexityMin}</button>
                                </div>
                                <AnimatePresence>
                                    {minComplexityList &&
                                        <motion.div className="rounded-lg overflow-hidden max-h-[100px] ml-2 overflow-y-scroll z-50 pointer-events-auto"
                                            initial={{y:-200,opacity:0,scale:0}}
                                            animate={{y:0,opacity:1,scale:1}}
                                            exit={{y:-200,opacity:0,scale:0}}
                                            transition={{ease:"easeInOut"}}
                                        >
                                            {minComplexityArray.map((complexity, index)=>(
                                                <div 
                                                key={index}
                                                className="bg-primary hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                                onClick={() => {setComplexityMin(complexity); 
                                                                setComplexities([index, complexities.indexOf(complexityMax)]); 
                                                                changeMaxComplexityArray(complexity)}}
                                                >
                                                    {complexity}
                                                </div>
                                            ))}
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="flex pt-8">
                            <span className="pt-1 pr-5">To: </span>
                            <div className="flex flex-col w-[150px] overflow-hidden z-20 pointer-events-none text-xs">
                                <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[140px] place-items-center gap-1 z-40 pointer-events-auto">
                                    <button 
                                        className="text-black rounded-md bg-loginInput h-[25px] w-[140px] z-40" 
                                        onClick={()=>setMaxComplexityListOpen(true)}
                                        onBlur={()=>setTimeout(function() {
                                            setMaxComplexityListOpen(false)
                                        }, 40)}                          
                                    >{complexityMax}</button>
                                </div>
                                <AnimatePresence>
                                    {maxComplexityList &&
                                        <motion.div className="rounded-lg overflow-hidden max-h-[100px] ml-2 overflow-y-scroll z-20 pointer-events-auto"
                                            initial={{y:-200,opacity:0,scale:0}}
                                            animate={{y:0,opacity:1,scale:1}}
                                            exit={{y:-200,opacity:0,scale:0}}
                                            transition={{ease:"easeInOut"}}
                                        >
                                            {maxComplexityArray.map((complexity, index)=>(
                                                <div 
                                                key={index}
                                                className="bg-primary hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                                onClick={() => {setComplexityMax(complexity); 
                                                                setComplexities([complexities.indexOf(complexityMin), complexities.indexOf(complexity)]); 
                                                                changeMinComplexityArray(complexity)}}
                                                >
                                                    {complexity}
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

export default Complexity