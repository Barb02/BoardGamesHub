import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown, IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { AnimatePresence } from "framer-motion";


const SortSearch = ( {currentSort, setSort, setOrder} ) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [button,setButton] = useState(<div>{currentSort}</div>)

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

    return (
        <div className="mr-4">
            <button id="main_button" className="flex w-[180px] rounded-xl p-4 pt-2 pb-2 justify-start bg-primary" onClick={expandSort}>
                {button}
                <span className="ml-auto self-end pl-2"><IoIosArrowDown size={23}/></span>
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
                        <div className="dropdown-content flex flex-col bg-primary absolute w-[180px] rounded-b-lg">
                            <motion.button initial={{}}className="py-2 bg-primary hover:opacity-80 hover:bg-gray-500" 
                                            onClick={(e) => { setSort("Name"); setOrder("asc"); 
                                                                expandSort(); setButton(<div>Name</div>); }}>Name
                            </motion.button>
                            <motion.button className="py-2 bg-primary hover:opacity-80 hover:bg-gray-500" 
                                            onClick={() => { setSort("Score"); setOrder("desc"); 
                                                                expandSort(); setButton(<div>Score</div>); }}>Score
                            </motion.button>
                            <motion.button className="flex justify-center place-items-center py-2 bg-primary rounded-b-lg hover:opacity-80 hover:bg-gray-500" 
                                            onClick={() => { setSort("Price"); setOrder("asc"); 
                                                                expandSort(); 
                                                                setButton(<div className="flex place-items-center justify-center">Price <IoMdArrowUp className="ml-1"/></div>); }}>
                                                <div>Price</div> <IoMdArrowUp className="ml-1"/>
                            </motion.button>
                            <motion.button className="flex place-items-center justify-center py-2 bg-primary rounded-b-lg hover:opacity-80 hover:bg-gray-500" 
                                            onClick={() => { setSort("Price"); setOrder("desc"); 
                                                                expandSort(); setButton(<div className="flex place-items-center justify-center">Price <IoMdArrowDown className="ml-1"/></div>); }}>
                                            <div>Price</div> <IoMdArrowDown className="ml-1"/>
                            </motion.button>
                            <motion.button className="py-2 bg-primary rounded-b-lg hover:opacity-80 hover:bg-gray-500" 
                                            onClick={() => { setSort("Release Date"); setOrder("desc"); 
                                                            expandSort(); setButton(<div>Release Date</div>); }}>Release Date
                            </motion.button>

                        </div>
                </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default SortSearch