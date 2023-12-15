import { useUserStore } from "../../stores/useUserStore";
import { AnimatePresence,motion } from "framer-motion";
import { useState,useEffect } from "react";
import { TbLogout } from "react-icons/tb";
import { MdEditSquare,MdSave,MdSearch,MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

function UserBar({deactivateUser}){
    const username = useUserStore((state) => state.username);
    const logout = useUserStore((state)=> state.logout);
    const [editMode,setEditMode] = useState(false);
    const [listOpen,setListOpen] = useState(false);
    const [filter,setFilter] = useState("");
    const [userCategorys,setUserCategorys] = useState([]);

    const addCat = (cat)=>{
        if (!userCategorys.includes(cat)){
            let copy =[...userCategorys]
            copy.push(cat)
            setUserCategorys(copy)
        }
    }

    const removeCat = (cat)=>{
            let copy =[...userCategorys]
            const index = copy.indexOf(cat);
            if (index > -1) { 
                copy.splice(index, 1);
            }
            setUserCategorys(copy)
    }

    const categorys = ["Fantasy","Adventure","Area Control","Card Game","Tower Defense","Collectible","Miniatures","4X",
                       "Worker Placement","Strategy","Family"]

      


    return(
            <motion.div 
                className=" bg-[#292929] w-[450px] h-full fixed right-0 z-10 p-5 flex flex-col gap-4"
                initial={{x:450}}
                animate={{x:0}}
                exit={{x:450}}
                transition={{ease:"easeInOut",duration:1}}
                onMouseLeave={deactivateUser}
            >
                <div className="text-text text-4xl shadow-divDistact rounded-lg p-1 text-center bg-black bg-opacity-10">{username}</div>
                <div className="h-[90%] shadow-divDistact rounded-lg bg-black bg-opacity-10 flex flex-col p-2 gap-2">
                    <div className="text-center text-text text-2xl">Categorias</div>
                    <div className="flex text-text justify-end gap-2 h-8">
                        { editMode &&
                        <div className="flex-grow pb-[300px] overflow-hidden z-20 pointer-events-none">
                            <div className="bg-primary rounded-lg px-3 py-1 flex place-items-center gap-1 z-40 pointer-events-auto">
                                <MdSearch/>
                                <input 
                                    className="text-black rounded-md bg-loginInput flex-grow z-40" 
                                    onFocus={()=>setListOpen(true)}
                                    onBlur={()=>setTimeout(function() {
                                        setListOpen(false)
                                        setFilter("")
                                    }, 40)}
                                    onChange={(e)=>setFilter(e.target.value)}
                                ></input>
                            </div>
                            <AnimatePresence>
                                {listOpen &&
                                    <motion.div className="rounded-lg overflow-hidden max-h-[200px] overflow-y-scroll z-20 pointer-events-auto"
                                        initial={{y:-200,opacity:0,scale:0}}
                                        animate={{y:0,opacity:1,scale:1}}
                                        exit={{y:-200,opacity:0,scale:0}}
                                        transition={{ease:"easeInOut"}}
                                    >
                                        {categorys.filter(str => str.toLowerCase().startsWith(filter.toLowerCase())).map((cat,index)=>(
                                            <div 
                                              key={index}
                                              className="bg-primary hover:bg-gray-500 flex place-items-center gap-2 border-t-[1px] py-[1px] px-2 cursor-default"
                                              onClick={()=>addCat(cat)}
                                            >
                                                <FaPlus className="text-sm"/>{cat}
                                            </div>
                                        ))}
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </div>
                        }
                        {editMode && <button className="bg-primary rounded-lg px-3 py-1 flex place-items-center gap-1"
                                             onClick={()=>{setEditMode(false)}}
                                     ><MdSave/>Save</button>}
                        {!editMode && <button className="bg-primary rounded-lg px-3 py-1 flex place-items-center gap-1"
                                        onClick={()=>{setEditMode(true)}}
                                      ><MdEditSquare/>Edit</button>}
                    </div>
                    <div className="bg-white bg-opacity-5 w-auto flex-grow rounded-lg p-3">
                        <div className="flex flex-wrap gap-2 text-text text-lg">
                            {userCategorys.map((cat,index)=>(
                                <div key={index} className="bg-primary rounded-lg px-3 flex place-items-center gap-1">
                                    {editMode && <MdClose
                                        onClick={()=>removeCat(cat)}
                                    />}
                                    {cat}
                                </div>
                            ))}
                        </div>  
                    </div>
                </div>
                <button 
                    onClick={()=>{logout()
                        deactivateUser()}} 
                    className="hover:w-[104%] hover:-translate-y-[1px] w-[100%] place-self-center bg-black bg-opacity-10 border-red-600 border-2 rounded-lg shadow-divDistact flex justify-center place-items-center text-red-600 gap-2 text-lg mt-auto"
                    >
                    <TbLogout /> 
                    <div>Logout</div>
                </button>
            </motion.div>
    )


}


export default UserBar;