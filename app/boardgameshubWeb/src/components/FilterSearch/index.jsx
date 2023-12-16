import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbFilterOff } from "react-icons/tb";
import Categories from "./Categories";
import PlayerNumber from "./PlayerNumber";
import Playtime from "./Playtime";
import Complexity from "./Complexity";
import Price from "./Price";


const FilterSearch = ( {} ) => {
    const [categories, setCategories] = useState([]);
    const [players, setPlayers] = useState([0, 9]);
    const [playtimes, setPlaytimes] = useState([0, 11]);
    const [currentComplexities, setComplexities] = useState([0, 4]);
    const [currentPrices, setPrices] = useState();

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
                                <Playtime currentPlaytimes={playtimes} setPlaytimes={setPlaytimes} />
                            </div>

                            {/* THIRD SPLIT */}
                            <div className="flex flex-col w-[33.3%] h-full">
                                <Complexity currentComplexities={currentComplexities} setComplexities={setComplexities}/>
                                <Price currentPrices={currentPrices} setPrices={setPrices} />
                                <div className="flex h-[15%] w-full justify-center">
                                    <button className="bg-primary rounded-xl w-[90px] h-[40px]" onClick={applyFilters}>
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