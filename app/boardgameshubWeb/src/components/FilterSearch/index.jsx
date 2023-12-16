import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbFilterOff } from "react-icons/tb";
import { TbFilterFilled } from "react-icons/tb";
import Categories from "./Categories";
import PlayerNumber from "./PlayerNumber";
import Playtime from "./Playtime";
import Complexity from "./Complexity";
import Price from "./Price";


const FilterSearch = ( {categories, setCategories, players, setPlayers, playtimes, setPlaytimes, 
                        complexities, setComplexities, prices, setPrices} ) => {
    const [filterIcon, setFilterIcon] = useState(<TbFilterOff />);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [categoriesFilter, setCategoriesFilter] = useState([]);
    const [playersFilter, setPlayersFilter] = useState();
    const [complexitiesFilter, setComplexitiesFilter] = useState();
    const [playtimesFilter, setPlaytimesFilter] = useState();
    const [pricesFilter, setPricesFilter] = useState();

    // initialize information
    useEffect(() => {
        setCategoriesFilter(categories);
        setPlayersFilter(players);
        setComplexitiesFilter(complexities);
        setPlaytimesFilter(playtimes);
        setPricesFilter(prices);

        if (categories.length !== 0){
            setFilterIcon(<TbFilterFilled />)
        }
      }, [categories, players, complexities, playtimes, prices]);
    
    // dropdown manager to remove unwanted selections
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
            setCategoriesFilter(categories);
            setPlayersFilter(players);
            setComplexitiesFilter(complexities);
            setPlaytimesFilter(playtimes);
            setPricesFilter(prices);
        }
    };

    // update states for search
    const applyFilters = () => {
        expandSort();
        setCategories(categoriesFilter);
        setPlayers(playersFilter);
        setComplexities(complexitiesFilter);
        setPlaytimes(playtimesFilter);
        setPrices(pricesFilter);

        if (categoriesFilter.length !== 0)
            setFilterIcon(<TbFilterFilled />)
        else
            setFilterIcon(<TbFilterOff />);
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
                            <Categories currentCategories={categoriesFilter} setCategories={setCategoriesFilter} />

                            {/* SECOND SPLIT */}
                            <div className="flex flex-col w-[33.3%] h-full">
                                <PlayerNumber currentPlayers={playersFilter} setPlayers={setPlayersFilter} />
                                <Playtime currentPlaytimes={playtimesFilter} setPlaytimes={setPlaytimesFilter} />
                            </div>

                            {/* THIRD SPLIT */}
                            <div className="flex flex-col w-[33.3%] h-full">
                                <Complexity currentComplexities={complexitiesFilter} setComplexities={setComplexitiesFilter}/>
                                <Price currentPrices={pricesFilter} setPrices={setPricesFilter} />
                                <div className="flex h-[15%] pt-6 pr-6 w-full justify-end">
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