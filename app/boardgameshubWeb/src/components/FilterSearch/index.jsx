import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbFilterOff } from "react-icons/tb";
import Categories from "./Categories";
import PlayerNumber from "./PlayerNumber";


const FilterSearch = ( {} ) => {
    const playtimes = ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "1.5 hours", "2 hours", "2.5 hours", "3 hours",
                         "3.5 hours", "4 hours", "5 hours", "6 hours"];
    const complexities = ["1 - Light", "2 - Medium Light", "3 - Medium", "4 - Medium Heavy", "5 - Heavy"];

    const [categories, setCategories] = useState([]);
    const [players, setPlayers] = useState();

    const [minPlaytimeList, setMinPlaytimeListOpen] = useState(false);
    const [maxPlaytimeList, setMaxPlaytimeListOpen] = useState(false);
    const [maxPlaytimeArray, setMaxPlaytimeArray] = useState(playtimes);
    const [playtimeMin, setPlaytimeMin] = useState("15 minutes");
    const [playtimeMax, setPlaytimeMax] = useState("6+ hours");

    const [minComplexityList, setMinComplexityListOpen] = useState(false);
    const [maxComplexityList, setMaxComplexityListOpen] = useState(false);
    const [maxComplexityArray, setMaxComplexityArray] = useState(complexities);
    const [complexityMin, setComplexityMin] = useState("1 - Light");
    const [complexityMax, setComplexityMax] = useState("5 - Heavy");

    const [filterIcon, setFilterIcon] = useState(<TbFilterOff />);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const expandSort = () => {
        setDropdownOpen(!isDropdownOpen);
        var filterElement = document.getElementById("filter_button");
        if (!isDropdownOpen){
            filterElement.style.borderBottomRightRadius = 0;
            filterElement.style.borderBottomLeftRadius = 0;
            filterElement.style.border = "1px solid #FFFFFF";
        }
        else{
            filterElement.style.borderBottomRightRadius = "";
            filterElement.style.borderBottomLeftRadius = "";
            filterElement.style.border = "";
        }
    };

    const applyFilters = () => {
        expandSort();
    }

    const changeMaxPlaytimeArray = (playtime) => {
        let playtimeArray = []
        for (let i = playtimes.indexOf(playtime); i < playtimes.length; i++){
            playtimeArray.push(playtimes[i]);
        }
        setMaxPlaytimeArray(playtimeArray);
    }

    const changeMaxComplexityArray = (complexity) => {
        let complexityArray = []
        for (let i = complexities.indexOf(complexity); i < complexities.length; i++){
            complexityArray.push(complexities[i]);
        }
        setMaxComplexityArray(complexityArray);
    }

    return (
        <div id="filters" className="mr-4">
            <button id="filter_button" className="flex rounded-xl p-4 pt-2 pb-2 items-center bg-primary  ml-auto" onClick={expandSort}>
                Filters
                <span className="pl-1 self-center">{filterIcon}</span>
            </button>

            <AnimatePresence>
               {isDropdownOpen && <motion.div 
                    initial={{ opacity:0 }}
                    animate={{ opacity:1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5}}
                    >
                        <div className="dropdown-content flex bg-searchDivBackground absolute w-[55.45%] h-[400px] rounded-b-lg right-[22.25%] border border-white">
                            {/* FIRST SPLIT */}
                            <Categories currentCategories={categories} setCategories={setCategories} />

                            {/* SECOND SPLIT */}
                            <div className="flex flex-col w-[33.3%] h-full">
                                <PlayerNumber currentPlayers={players} setPlayers={setPlayers} />
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
                                                                {playtimes.map((playtime, index)=>(
                                                                    <div 
                                                                    key={index}
                                                                    className="bg-primary hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                                                    onClick={() => {setPlaytimeMin(playtime); changeMaxPlaytimeArray(playtime)}}
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
                                                                    onClick={() => setPlaytimeMax(playtime)}
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
                            </div>

                            {/* THIRD SPLIT */}
                            <div className="flex flex-col w-[33.3%] h-full">
                                <div className="h-[50%] w-full">
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
                                                                {complexities.map((complexity, index)=>(
                                                                    <div 
                                                                    key={index}
                                                                    className="bg-primary hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                                                    onClick={() => {setComplexityMin(complexity); changeMaxComplexityArray(complexity)}}
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
                                                                    onClick={() => setComplexityMax(complexity)}
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
                                <div className="h-[35%] ml-5 w-full">
                                    <div className="text-2xl mt-4">
                                        <span>Price:</span>
                                    </div>
                                </div>
                                <div className="flex h-[15%] w-full justify-center">
                                    <button className="bg-primary rounded-xl w-[90px] h-[40px]"
                                            onClick={applyFilters}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default FilterSearch