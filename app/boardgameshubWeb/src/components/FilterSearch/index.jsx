import { useState } from "react";
import { motion } from "framer-motion";
import { TbFilterOff } from "react-icons/tb";
import { AnimatePresence } from "framer-motion";


const FilterSearch = ( {} ) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
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

    return (
        <div id="filters" className="mr-4">
            <button id="filter_button" className="flex rounded-xl p-4 pt-2 pb-2 items-center bg-primary  ml-auto" onClick={expandSort}>
                Filters
                <span className="pl-1 self-center">{filterIcon}</span>
            </button>

            <AnimatePresence>
               {isDropdownOpen && <motion.div 
                    initial={{
                        opacity:0,
                    }}
                    animate={{
                        opacity: 1,

                    }}
                    exit={{
                        opacity: 0
                    }}
                    transition={{ duration: 0.5}}
                    
                    >
                        <div className="dropdown-content flex bg-searchDivBackground absolute w-[55.45%] h-[400px] rounded-b-lg right-[22.25%] border border-white">
                            <div className="flex flex-col w-[33.3%] h-full">
                                <div className="text-2xl ml-7 mt-4">
                                    <span>Categories:</span>
                                </div>
                                <div className="flex flex-col relative ml-7 mt-4 text-md">
                                    <div className="pb-1">
                                        <div className="inline-block">
                                            <div className="relative">
                                                <div className="flex items-center">
                                                    <span className="rounded h-5 w-5 border mr-4" />
                                                    <span className="">Fantasy</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-1">
                                        <div className="inline-block">
                                            <div className="relative">
                                                <div className="flex items-center">
                                                    <span className="rounded h-5 w-5 border mr-4" />
                                                    <span className="">Adventure</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-1">
                                        <div className="inline-block">
                                            <div className="relative">
                                                <div className="flex items-center">
                                                    <span className="rounded h-5 w-5 border mr-4" />
                                                    <span className="">Area Control</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-1">
                                        <div className="inline-block">
                                            <div className="relative">
                                                <div className="flex items-center">
                                                    <span className="rounded h-5 w-5 border mr-4" />
                                                    <span className="">Card Game</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-1">
                                        <div className="inline-block">
                                            <div className="relative">
                                                <div className="flex items-center">
                                                    <span className="rounded h-5 w-5 border mr-4" />
                                                    <span className="">Tower Defense</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-1">
                                        <div className="inline-block">
                                            <div className="relative">
                                                <div className="flex items-center">
                                                    <span className="rounded h-5 w-5 border mr-4" />
                                                    <span className="">Collectible</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-1">
                                        <div className="inline-block">
                                            <div className="relative">
                                                <div className="flex items-center">
                                                    <span className="rounded h-5 w-5 border mr-4" />
                                                    <span className="">Miniatures</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-1">
                                        <div className="inline-block">
                                            <div className="relative">
                                                <div className="flex items-center">
                                                    <span className="rounded h-5 w-5 border mr-4" />
                                                    <span className="">Worker Placement</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pb-1">
                                        <div className="inline-block">
                                            <div className="relative">
                                                <div className="flex items-center">
                                                    <span className="rounded h-5 w-5 border mr-4" />
                                                    <span className="">Family</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="inline-block">
                                            <div className="relative">
                                                <div className="flex items-center">
                                                    <span className="rounded h-5 w-5 border mr-4" />
                                                    <span className="">4X</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-[33.3%] h-full bg-black">
                                <div>

                                </div>
                                <div>

                                </div>
                            </div>
                            <div className="flex w-[33.3%] h-full bg-slate-500">
                                <div>

                                </div>
                                <div>

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