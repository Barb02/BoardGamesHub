import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gameService from "../../services/gameService";
import { FaRegTrashAlt } from "react-icons/fa";


function Admin() {
    const ages = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
    const complexities = ["1", "2", "3", "4", "5"];
    const players = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const playtimes = ["15 minutes", "30 minutes", "45 minutes", "60 minutes", "1.5 hours", "2 hours", "2.5 hours", "3 hours",
                         "3.5 hours", "4 hours", "5 hours", "6 hours"];

    const [view, setView] = useState("Create");
    const [createView, setCreateView] = useState(true);
    const [deleteView, setDeleteView] = useState(false);

    const [name, setName] = useState();
    const [shortDescription, setShortDescription] = useState();
    const [description, setDescription] = useState();
    const [score, setScore] = useState();
    const [ratings, setRatings] = useState();

    const [minList, setMinList] = useState(false);
    const [playerMin, setPlayerMin] = useState();

    const [maxList, setMaxList] = useState(false);
    const [playerMax, setPlayerMax] = useState();

    const [complexityList, setComplexityList] = useState(false);
    const [complexity, setComplexity] = useState();

    const [ageList, setAgeList] = useState(false);
    const [playerAge, setPlayerAge] = useState("1");

    const [minPlaytimeList, setMinPlaytimeList] = useState(false);
    const [minPlaytime, setMinPlaytime] = useState();

    const [maxPlaytimeList, setMaxPlaytimeList] = useState(false);
    const [maxPlaytime, setMaxPlaytime] = useState();


    // DELETE GAME LOGIC //

    const [games, setGames] = useState();
    const [query, setQuery] = useState();

    useEffect(()=>{
        gameService.getGames(query).then((data)=>{
            setGames(data);
        })
    },[query])

    const removeGame = (id,index)=>{
        gameService.deleteGame(id);
        setGames([...games].splice(index,1))
        //setTimeout(()=>fetchWishlist(),4*1000);
    }


    return(
        <div className="text-text font-text pt-[5%]">
            <div className="flex max-w-5xl mx-auto text-xl">
                <div className={`w-[10%] text-center rounded-t-lg cursor-pointer pt-1` + (view === "Create" ? " bg-primary" : " ")} 
                onClick={() => { setView("Create"); setCreateView(true); setDeleteView(false)}}>
                Create
                </div>
                <div className={`w-40 text-center rounded-t-lg cursor-pointer pt-1` + (view === "Delete" ? " bg-primary" : " ")}
                onClick={() => { setView("Delete"); setCreateView(false); setDeleteView(true)}}>
                Delete
                </div>
            </div>
            {/* CREATE COMPONENT*/}
            {createView && <div className="bg-primary bg-gradient-to-t from-gradient to-100% mx-auto h-auto min-h-[800px] rounded-b-lg rounded-r-lg">
                <div className="flex max-w-5xl mx-auto text-xl pt-5">
                    <div className="w-[40%] mr-[20%]">
                        <div className="flex flex-col">
                            <span>Name:</span>
                            <input placeholder="Game name..." className="text-black" onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            <span>Short Description:</span>
                            <input placeholder="Short description..." className="text-black" onChange={(e) => setShortDescription(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            Description:
                            <textarea placeholder="Long description..." className="text-black" onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            Designers:
                            <input placeholder="Designers..."/>
                        </div>
                        <div className="flex flex-col">
                            Publishers:
                            <input placeholder="Publishers..."/>
                        </div>
                    </div>


                    <div className="w-[40%]">
                        <div className="flex flex-col">
                            Complexity:
                            <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[85px] place-items-center gap-1 z-40 pointer-events-auto">
                                <button 
                                    className="text-black rounded-md bg-loginInput h-[25px] w-[85px] z-40" 
                                    onClick={() => setComplexityList(true) }
                                    onBlur={()=>setTimeout(function() {
                                        setComplexityList(false)
                                    }, 40)}                        
                                >{complexity}</button>
                            </div>
                            <AnimatePresence>
                            {complexityList && 
                                <motion.div className="rounded-lg overflow-hidden max-h-[100px] ml-2 overflow-y-scroll z-50 pointer-events-auto"
                                initial={{y:-200,opacity:0,scale:0}}
                                animate={{y:0,opacity:1,scale:1}}
                                exit={{y:-200,opacity:0,scale:0}}
                                transition={{ease:"easeInOut"}}
                            >
                            {complexities.map((complexity, index)=>(
                                    <div 
                                    key={index}
                                    className=" bg-white text-black hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                    onClick={() => {setComplexity(complexity); }}
                                    >
                                        {complexity}
                                    </div>
                            ))}
                            </motion.div>
                            }
                            </AnimatePresence>
                        </div>
                        <div className="flex flex-col">
                            Min Players:
                            <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[85px] place-items-center gap-1 z-40 pointer-events-auto">
                                <button 
                                    className="text-black rounded-md bg-loginInput h-[25px] w-[85px] z-40" 
                                    onClick={() => setMinList(true) }
                                    onBlur={()=>setTimeout(function() {
                                        setMinList(false)
                                    }, 40)}                        
                                >{playerMin}</button>
                            </div>
                            <AnimatePresence>
                            {minList && 
                                <motion.div className="rounded-lg overflow-hidden max-h-[100px] ml-2 overflow-y-scroll z-50 pointer-events-auto"
                                initial={{y:-200,opacity:0,scale:0}}
                                animate={{y:0,opacity:1,scale:1}}
                                exit={{y:-200,opacity:0,scale:0}}
                                transition={{ease:"easeInOut"}}
                            >
                            {players.map((player, index)=>(
                                    <div 
                                    key={index}
                                    className=" bg-white text-black hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                    onClick={() => {setPlayerMin(player); }}
                                    >
                                        {player}
                                    </div>
                            ))}
                            </motion.div>
                            }
                            </AnimatePresence>
                        </div>
                        <div className="flex flex-col">
                            Max Players:
                            <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[85px] place-items-center gap-1 z-40 pointer-events-auto">
                                <button 
                                    className="text-black rounded-md bg-loginInput h-[25px] w-[85px] z-40" 
                                    onClick={() => setMaxList(true) }
                                    onBlur={()=>setTimeout(function() {
                                        setMaxList(false)
                                    }, 40)}                        
                                >{playerMax}</button>
                            </div>
                            <AnimatePresence>
                            {maxList && 
                                <motion.div className="rounded-lg overflow-hidden max-h-[100px] ml-2 overflow-y-scroll z-50 pointer-events-auto"
                                initial={{y:-200,opacity:0,scale:0}}
                                animate={{y:0,opacity:1,scale:1}}
                                exit={{y:-200,opacity:0,scale:0}}
                                transition={{ease:"easeInOut"}}
                            >
                            {players.map((player, index)=>(
                                    <div 
                                    key={index}
                                    className=" bg-white text-black hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                    onClick={() => {setPlayerMax(player); }}
                                    >
                                        {player}
                                    </div>
                            ))}
                            </motion.div>
                            }
                            </AnimatePresence>
                        </div>
                        <div className="flex flex-col">
                            Year Published:
                            <input placeholder="Year published..." className="text-black" onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            Min Age:
                            <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[85px] place-items-center gap-1 z-40 pointer-events-auto">
                                <button 
                                    className="text-black rounded-md bg-loginInput h-[25px] w-[85px] z-40" 
                                    onClick={() => setAgeList(true) }
                                    onBlur={()=>setTimeout(function() {
                                        setAgeList(false)
                                    }, 40)}                        
                                >{playerAge}+</button>
                            </div>
                            <AnimatePresence>
                            {ageList && 
                                <motion.div className="rounded-lg overflow-hidden max-h-[100px] ml-2 overflow-y-scroll z-50 pointer-events-auto"
                                initial={{y:-200,opacity:0,scale:0}}
                                animate={{y:0,opacity:1,scale:1}}
                                exit={{y:-200,opacity:0,scale:0}}
                                transition={{ease:"easeInOut"}}
                            >
                            {ages.map((age, index)=>(
                                    <div 
                                    key={index}
                                    className=" bg-white text-black hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                    onClick={() => {setPlayerAge(age); }}
                                    >
                                        {age}+
                                    </div>
                            ))}
                            </motion.div>
                            }
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
                <div className="flex max-w-5xl mx-auto text-xl pt-[5%]">
                    <div className="w-[40%] mr-[20%]">
                    <div className="flex flex-col">
                            Min Playtime:
                            <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[350px] place-items-center gap-1 z-40 pointer-events-auto">
                                <button 
                                    className="text-black rounded-md bg-loginInput h-[25px] w-[200px] z-40" 
                                    onClick={() => setMinPlaytimeList(true) }
                                    onBlur={()=>setTimeout(function() {
                                        setMinPlaytimeList(false)
                                    }, 40)}                        
                                >{minPlaytime}</button>
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
                                    className=" bg-white text-black hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                    onClick={() => {setMinPlaytime(playtime); }}
                                    >
                                        {playtime}
                                    </div>
                            ))}
                            </motion.div>
                            }
                            </AnimatePresence>
                        </div>
                        <div className="flex flex-col">
                            Max Playtime:
                            <div className="bg-primary ml-2 rounded-lg px-1 py-1 flex w-[350px] place-items-center gap-1 z-40 pointer-events-auto">
                                <button 
                                    className="text-black rounded-md bg-loginInput h-[25px] w-[200px] z-40" 
                                    onClick={() => setMaxPlaytimeList(true) }
                                    onBlur={()=>setTimeout(function() {
                                        setMaxPlaytimeList(false)
                                    }, 40)}                        
                                >{maxPlaytime}</button>
                            </div>
                            <AnimatePresence>
                            {maxPlaytimeList && 
                                <motion.div className="rounded-lg overflow-hidden max-h-[100px] ml-2 overflow-y-scroll z-50 pointer-events-auto"
                                initial={{y:-200,opacity:0,scale:0}}
                                animate={{y:0,opacity:1,scale:1}}
                                exit={{y:-200,opacity:0,scale:0}}
                                transition={{ease:"easeInOut"}}
                            >
                            {playtimes.map((playtime, index)=>(
                                    <div 
                                    key={index}
                                    className=" bg-white text-black hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                    onClick={() => {setMaxPlaytime(playtime); }}
                                    >
                                        {playtime}
                                    </div>
                            ))}
                            </motion.div>
                            }
                            </AnimatePresence>
                        </div>
                        <div className="flex flex-col">
                            Score:
                            <input placeholder="[1-10]" className="text-black" onChange={(e) => setScore(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            Number Ratings:
                            <input placeholder="..." className="text-black" onChange={(e) => setRatings(e.target.value)}/>
                        </div>
                    </div>



                    <div className="w-[40%]">
                        <div className="flex flex-col">
                            Categories:
                        </div>
                        <div className="flex flex-col">
                            Artists:
                        </div>
                        <div className="flex flex-col">
                            Cover Image:
                        </div>
                        <div className="flex flex-col">
                            Extra Images:
                        </div>
                    </div>
                </div>
            </div>
            }

            {/* DELETE COMPONENT*/}
            {deleteView && <div className="bg-primary bg-gradient-to-t from-gradient to-100% mx-auto h-auto min-h-[800px] rounded-b-lg rounded-r-lg">
                <div className="max-w-5xl mx-auto pt-5 pb-4">
                <input onChange={(e)=>{setQuery(e.currentTarget.value)}}placeholder="Search by name..." name="q" className="mr-3 mb-4 pl-4 text-xl text-black bg-loginInput rounded-md w-full h-[70%] outline-none" autoComplete="off" />
                
                {games.map((game,index)=>(
                    <div className="flex rounded-xl w-full h-[80px] bg-searchProductBackground mb-4">
                        <img src={game.image} alt="boardgame_cover" className="object-cover self-center ml-3 rounded-lg h-[70%] w-[120px]" />
                        <div className="flex flex-col pl-3">
                            <span className="mr-5 text-xl pt-3 pl-5">{game.name}</span>
                            <ul className="inline-block">
                                <li key="1" className="bg-searchProductDefault inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">Action</li>
                                <li key="2" className="bg-searchProductDefault inline-block w-auto mt-2 pr-1 pl-1 mr-1 rounded text-sm">Puzzle</li>
                            </ul>
                        </div>
                        <div className="ml-auto w-[25%] flex">
                            <button id={index} className="self-center ml-auto mr-5 p-5" onClick={(e)=>{e.preventDefault();removeGame(game.id,e.currentTarget.id)}}><FaRegTrashAlt size={24}/></button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            }

        </div>
    )
}

export default Admin