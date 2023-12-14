import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";


const SortSearch = ( {currentSort, setSort} ) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const expandSort = () => {
        setDropdownOpen(!isDropdownOpen);
        if (!isDropdownOpen){
            document.getElementById("main_button").style.borderBottomRightRadius = 0;
            document.getElementById("main_button").style.borderBottomLeftRadius = 0;
        }
        else{
            document.getElementById("main_button").style.borderBottomRightRadius = "";
            document.getElementById("main_button").style.borderBottomLeftRadius = "";
        }
    };

    function onHover(e) {
        e.currentTarget.style.opacity = 0.8;
        e.currentTarget.style.background = "grey";
    }
    
    function onHoverOut(e) {
        e.currentTarget.style.opacity = 1;
        e.currentTarget.style.background = "";
    }

    return (
        <div className="mr-4">
            <button id="main_button" className="flex w-[180px] rounded-xl p-4 pt-2 pb-2 justify-start bg-primary" onClick={expandSort}>
                {currentSort}
                <span className="ml-auto self-end pl-2"><IoIosArrowDown size={23}/></span>
            </button> 
            <motion.div 
                animate={{
                    height: isDropdownOpen ? "auto" : 0, 
                    opacity: isDropdownOpen ? 1 : 0
                }}
                transition={{ duration: 0.1}}
                style={{ overflow: "hidden" }}
                >

                {isDropdownOpen && (
                    <div className="dropdown-content flex flex-col bg-primary fixed w-[180px] rounded-b-lg">
                        <button className="py-2 bg-primary" onMouseEnter={onHover} onMouseLeave={onHoverOut} onClick={() => { setSort("Name"); expandSort(); }}>Name</button>
                        <button className="py-2 bg-primary" onMouseEnter={onHover} onMouseLeave={onHoverOut} onClick={() => { setSort("Score"); expandSort(); }}>Score</button>
                        <button className="py-2 bg-primary rounded-b-lg" onMouseEnter={onHover} onMouseLeave={onHoverOut} onClick={() => { setSort("Release Date"); expandSort(); }}>Release Date</button>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default SortSearch