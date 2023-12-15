import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbFilterOff } from "react-icons/tb";


const FilterSearch = ( {} ) => {
    const players = ["1 player", "2 players", "3 players", "4 players", "5 players", "6 players", "7 players", "8 players", 
                        "9 players", "10 players"];
    const categories = ["Fantasy","Adventure","Area Control","Card Game","Tower Defense","Collectible","Miniatures","4X",
                        "Worker Placement","Family"];


    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [minPlayerList, setMinPlayerListOpen] = useState(false);
    const [maxPlayerList, setMaxPlayerListOpen] = useState(false);
    const [maxPlayerArray, setMaxPlayerArray] = useState(players);
    const [playerMin, setPlayerMin] = useState("1 Player");
    const [playerMax, setPlayerMax] = useState("10 Players");
    const [filterIcon, setFilterIcon] = useState(<TbFilterOff />);

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

    const changeMaxPlayerArray = (player) => {
        let playerArray = [];
        for (let i = players.indexOf(player); i < players.length; i++){
            playerArray.push(players[i]);
        }
        setMaxPlayerArray(playerArray);
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
                            <div className="flex flex-col w-[33.3%] h-full">
                                <div className="text-2xl ml-7 mt-4">
                                    <span>Categories:</span>
                                </div>
                                <div className="flex flex-col relative ml-7 mt-4 text-md">
                                    {categories.map((category) => (
                                        <div className="pb-1">
                                            <div className="inline-block">
                                                <div className="relative">
                                                    <div className="flex items-center">
                                                        <span className="rounded h-5 w-5 border mr-4" />
                                                        <span className="">{category}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* SECOND SPLIT */}
                            <div className="flex flex-col w-[33.3%] h-full">
                                <div className="h-[50%] w-full">
                                    <div className="text-2xl mt-4">
                                        <span>Number of Players:</span>
                                    </div>
                                    <div className="flex flex-col relative ml-4 mt-4 text-md">
                                        <div className="pb-1 pt-3">
                                            <div className="flex">
                                                <span className="pt-1">From: </span>
                                                <div className="flex flex-col absolute ml-[15%] w-[120px] overflow-hidden z-50 pointer-events-none text-xs">
                                                    <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[85px] place-items-center gap-1 z-40 pointer-events-auto">
                                                        <button 
                                                            className="text-black rounded-md bg-loginInput h-[25px] w-[85px] z-40" 
                                                            onClick={() => setMinPlayerListOpen(true) }
                                                            onBlur={()=>setTimeout(function() {
                                                                setMinPlayerListOpen(false)
                                                            }, 40)}                          
                                                        >{playerMin}</button>
                                                    </div>
                                                    <AnimatePresence>
                                                        {minPlayerList &&
                                                            <motion.div className="rounded-lg overflow-hidden max-h-[100px] ml-2 overflow-y-scroll z-50 pointer-events-auto"
                                                                initial={{y:-200,opacity:0,scale:0}}
                                                                animate={{y:0,opacity:1,scale:1}}
                                                                exit={{y:-200,opacity:0,scale:0}}
                                                                transition={{ease:"easeInOut"}}
                                                            >
                                                                {players.map((player, index)=>(
                                                                    <div 
                                                                    key={index}
                                                                    className="bg-primary hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                                                    onClick={() => {setPlayerMin(player); changeMaxPlayerArray(player)}}
                                                                    >
                                                                        {player}
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
                                                            onClick={()=>setMaxPlayerListOpen(true)}
                                                            onBlur={()=>setTimeout(function() {
                                                                setMaxPlayerListOpen(false)
                                                            }, 40)}                          
                                                        >{playerMax}</button>
                                                    </div>
                                                    <AnimatePresence>
                                                        {maxPlayerList &&
                                                            <motion.div className="rounded-lg overflow-hidden max-h-[100px] ml-2 overflow-y-scroll z-20 pointer-events-auto"
                                                                initial={{y:-200,opacity:0,scale:0}}
                                                                animate={{y:0,opacity:1,scale:1}}
                                                                exit={{y:-200,opacity:0,scale:0}}
                                                                transition={{ease:"easeInOut"}}
                                                            >
                                                                {maxPlayerArray.map((player, index)=>(
                                                                    <div 
                                                                    key={index}
                                                                    className="bg-primary hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                                                    onClick={() => setPlayerMax(player)}
                                                                    >
                                                                        {player}
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
                                <div className="h-[50%] w-full">
                                    <div className="text-2xl ml-7 mt-4">
                                        <span>Playtime:</span>
                                    </div>
                                </div>
                            </div>

                            {/* THIRD SPLIT */}
                            <div className="flex flex-col w-[33.3%] h-full">
                                <div className="h-[40%] w-full">
                                    <div className="text-2xl ml-5 mt-4">
                                        <span>Complexity:</span>
                                    </div>
                                </div>
                                <div className="h-[40%] ml-5 w-full">
                                    <div className="text-2xl mt-4">
                                        <span>Price:</span>
                                    </div>
                                </div>
                                <div className="h-[20%] w-full">
                                    <button className="bg-black rounded w-[90px] h-[40px]">Apply</button>
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