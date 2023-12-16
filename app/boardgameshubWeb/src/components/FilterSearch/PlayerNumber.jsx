import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PlayerNumber = ( {currentPlayers, setPlayers} ) => {
    const players = ["1 player", "2 players", "3 players", "4 players", "5 players", "6 players", "7 players", "8 players", 
                        "9 players", "10 players"];

    const [minPlayerList, setMinPlayerListOpen] = useState(false);
    const [maxPlayerList, setMaxPlayerListOpen] = useState(false);
    const [minPlayerArray, setMinPlayerArray] = useState(players);
    const [maxPlayerArray, setMaxPlayerArray] = useState(players);
    const [playerMin, setPlayerMin] = useState("1 Player");
    const [playerMax, setPlayerMax] = useState("10 Players");

    const changeMinPlayerArray = (player) => {
        let playerArray = [];
        for (let i = 0; i <= players.indexOf(player); i++){
            playerArray.push(players[i]);
        }
        setMinPlayerArray(playerArray);
    }

    const changeMaxPlayerArray = (player) => {
        let playerArray = [];
        for (let i = players.indexOf(player); i < players.length; i++){
            playerArray.push(players[i]);
        }
        setMaxPlayerArray(playerArray);
    }

    return (
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
                                        {minPlayerArray.map((player, index)=>(
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
                                            onClick={() => {setPlayerMax(player); changeMinPlayerArray(player)}}
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
    )
}

export default PlayerNumber